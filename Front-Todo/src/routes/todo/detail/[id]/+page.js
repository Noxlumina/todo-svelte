/**
 * fonction permettant de passer un paramètre depuis le parent à un enfant
 * @param {params} parametre récupérer du parent à l'enfant, actuellemnt on en extrait la valeur de l'id 
 * @returns 
 */
export async function load({ params }) {
    try {
      const { id } = params;
      const data = await fetch(`https://localhost:3000/todos/${id}`).then((res) =>
        res.json()
      );
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la todo par ID :", error);
      return null;
    }
  }
  