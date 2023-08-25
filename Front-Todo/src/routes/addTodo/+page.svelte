<script>
  import { addDays, format } from "date-fns";
  import { goto } from "$app/navigation";
  import { darkMode } from "$lib/store";

  // Initialisation des variables à vide
  let name = "";
  let description = "";
  let limitDate = "";

  /**
   * fonction permettant d'ajouter une nouvelle todo
   * @param newTodo données de la nouvelle todo
   */
  let addTodo = async function (newTodo) {
    try {
      const response = await fetch("https://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la tâche");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
      throw error;
    }
  };

  /**
   * fonction permettant de valider le formulaire
   * @param event
   */
  function handleSubmit(event) {
    event.preventDefault();

    const newTodo = {
      name,
      description,
      limitDate,
      isDone: false,
    };
    addTodo(newTodo)
      .then((data) => {
        name = "";
        description = "";
        limitDate = "";

        // Redirection vers la page des todos
        goto(`/todo`);
      })
      .catch((error) => {
        // Gérer les erreurs si nécessaire
        console.error("Erreur lors de la soumission du formulaire :", error);
      });
  }
</script>

  <div class="title"><h1>Ajouter une nouvelle tâche</h1></div>

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

    <button type="submit">Ajouter</button>
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
