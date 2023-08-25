<script>
  import { beforeUpdate, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { format } from "date-fns";
  import { fr } from "date-fns/locale";
  import { darkMode } from "$lib/store";

  let loading = true; // Définir la variable de chargement à true par défaut
  //instanciation de la variable todos qui va recevoiir le liste des todos depuis le back
  export let todos = [];
  let notodo = false;

  /**
   * fonction qui formatte une date d'entrée pour avoir en sortie
   * une date du type le 27 juillet 2023
   * @param date date d'entrée au format suivant : 2019-12-04T00:00:00.000+00:00
   */
  function formattedDate(date) {
    let dateObj = new Date(date);
    return format(dateObj, "d MMMM yyyy", { locale: fr });
  }
  /**
   *fonction qui compare une date à la date du jour et qui retourne si elle est dépassée ou non
   * @param dateStr
   */
  function isLimitDateExpired(date) {
    const currentDate = new Date();
    const limitDate = new Date(date);
    return currentDate > limitDate;
  }

  /**
   * fonction de récupération de l'ensemble des todo à partir de notre api
   */
  let promise = async function fetchTodos() {
    console.log(loading);
    loading = true; // Définir le chargement à true pendant la récupération
    try {
      const response = await fetch("https://localhost:3000/todos");
      if (!response.ok) {
        console.log("erreur");
        throw new Error("La requête a échoué : " + response.status);
      }
      const data = await response.json();
      todos = data;
    } catch (error) {
      console.error("Erreur lors de la récupération des todos :", error);
    } finally {
      console.log(loading);
      loading = false; // Mettre à jour le chargement une fois que les données sont récupérées
    }
  };

  promise();

  /**
   * fonction qui permet de supprimer une todo en fonction de son id depuis notre api
   * @param todoId id de la todo à supprimer
   */
  export async function deleteTodoById(todoId) {
    try {
      const response = await fetch(`https://localhost:3000/todos/${todoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la tâche");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
      throw error;
    }
  }

  /**
   * fonction qui permet de mettre à jour une todo en fonction de son id depuis notre api
   * @param todoId id de la todo à mettre à jour
   * @param updatedTodo nouvelle valeur de la todo
   */
  export async function updateTodoById(todoId, updatedTodo) {
    try {
      const response = await fetch(`https://localhost:3000/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la tâche");
      }

      const updatedTodoData = await response;

      return updatedTodoData;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
      throw error;
    }
  }

  /**
   * fonction qui permet d'intéragir avec la fonction de mise à jour
   * @param todo donnée de la todo à mettre à jour
   */
  async function handleUpdate(todo) {
    try {
      const updatedTodoData = {
        name: todo.Name,
        description: todo.Description,
        limitDate: todo.LimitDate,
        isDone: !todo.IsDone,
      };

      await updateTodoById(todo.Id, updatedTodoData);

      //actualisation de la liste des todos avec les dernières données à jours
      promise();
    } catch (error) {
      console.error("Error while updating todo:", error);
    }
  }

  /**
   * fonction qui permet d'intéragir avec la fonction de suppression
   * @param todoId
   */
  async function handleDelete(todoId) {
    try {
      // Call the deleteTodoById function to delete the todo with the given ID
      await deleteTodoById(todoId);

      // After deletion, you can fetch the updated list of todos
      promise();
      if (todos.length === 1) {
        console.log("je raffraichis la page")
        location.reload();
      }
    } catch (error) {
      // Handle any errors that may occur during the deletion
      console.error("Error while deleting todo:", error);
    }
  }

  /**
   * fonction permettant d'être redirigé vers la page d'édition de la todo
   * @param todo
   */
  function handleDetailClick(todo) {
    // Redirigez vers la page de détail, page d'édition de la todo
    goto(`/todo/detail/${todo.Id}`);
  }

  onMount(() => {
    promise();
  });

  // varible reactive pour la valeur du filtre
  let filter = "";

  let filteredTodos;
  /*valeur permettant de trier les todo en fonction en de la valeur du filtre
   *et qui trie le résultat en fonction de la date limite
   */
  $: filteredTodos = todos
    .filter((todo) => {
      // Add the filter condition here
      return (
        todo.Name.toLowerCase().includes(filter.toLowerCase()) ||
        todo.Description.toLowerCase().includes(filter.toLowerCase()) ||
        todo.LimitDate.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => new Date(a.LimitDate) - new Date(b.LimitDate));
</script>

<div class="title"><h1>Mes todos</h1></div>

<!-- Add the filter input field -->
<div class="formgroup">
  <div class="label">
    <label for="filter-input">Filter:</label>
  </div>
  <div>
    <input
      id="filter-input"
      data-testid="filter"
      bind:value={filter}
      class="input-field"
      placeholder="Filter by name, description, or limit date"
    />
  </div>
</div>

{#if loading}
  <p>Chargement des todos...</p>
{:else if todos.length > 0}
  <div class="todo-list">
    {#each filteredTodos as todo}
      <div
        class="todo-card"
        class:isdone={todo.IsDone}
        class:notdone={!todo.IsDone && isLimitDateExpired(todo.LimitDate)}
      >
        <h2 class="todo-title">{todo.Name}</h2>
        <p>{todo.Description}</p>
        <p>à faire avant le {formattedDate(todo.LimitDate)}</p>
        {#if todo.IsDone}<button on:click={() => handleUpdate(todo)}
            >Undone</button
          >{:else}<button on:click={() => handleUpdate(todo)}>Done</button>{/if}
        <button on:click={() => handleDetailClick(todo)}>Voir le détail</button>
        <button on:click={() => handleDelete(todo.Id)}>Delete</button>
      </div>
    {/each}
  </div>{:else}
  <p>Aucune todo</p>
{/if}

<style>
  .title {
    /* margin: auto;
    text-align: center;
    display: inline; */
  }
  .todo-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 2%;
    align-content: center;
    padding-bottom: 50px;
  }
  .todo-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 250px;
  }

  .todo-card:hover {
    border: 7px solid #ccc;
  }

  .todo-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .isdone {
    background-color: green;
    color: whitesmoke;
  }

  .notdone {
    background-color: red;
    color: whitesmoke;
  }

  .formgroup {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .label {
    display: flex;
    margin: 0 1% 0 5%;
  }

  .input-field {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
</style>
