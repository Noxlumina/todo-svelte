<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { addDays, format, parseISO } from "date-fns";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  // Initialisation de la date limite à vide
  let limitDate = "";

  /**
   * lors du chargement du composant on attribut à limit date la valuer actuel de la date limite
   */
  onMount(() => {
    let defaultDate = parseISO(data.LimitDate);
    limitDate = format(defaultDate, "yyyy-MM-dd");
  });

  // Initialisation des autres valeurs avec leur valeurs respectives initiales
  let name = data.Name;
  let description = data.Description;

  /**
   * fonction de mise à jour de la todo
   * @param todoId
   * @param updatedTodo
   */
  async function updateTodoById(todoId, updatedTodo) {
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
   * fonction de validation du formulaire de modification
   * @param event
   */
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const updatedTodoData = {
        name: name, 
        description: description, 
        limitDate: limitDate, 
        isDone: data.IsDone, 
      };

      await updateTodoById(data.Id, updatedTodoData);
      //redirection à la page todo
      goto(`/todo`);
      
    } catch (error) {
      // Handle any errors that may occur during the update
      console.error("Error while updating todo:", error);
    }
  }
</script>

<div class="title"><h1>Modifier la tâche</h1></div>

<form on:submit={handleSubmit}>
  <div>
    <label for="name">Nom :</label>
    <input type="text" id="name" bind:value={name} required />
  </div>

  <div>
    <label for="description">Description :</label>
    <textarea id="description" bind:value={description} required rows="4" />
  </div>

  <div>
    <label for="dateLimite">Date limite :</label>
    <input
      type="date"
      id="dateLimite"
      bind:value={limitDate}
      min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
      required
    />
  </div>

  <button type="submit">Modifier</button>
</form>

<style>
  .title {
    /* margin: auto;
    text-align: center;
    display: inline; */
  }
  /* Styles CSS personnalisés pour le formulaire */
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }

  label {
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
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
