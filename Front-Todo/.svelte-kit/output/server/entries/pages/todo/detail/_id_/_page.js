async function load({ params }) {
  try {
    const { id } = params;
    const data = await fetch(`https://localhost:3000/todos/${id}`).then(
      (res) => res.json()
    );
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la todo par ID :", error);
    return null;
  }
}
export {
  load
};
