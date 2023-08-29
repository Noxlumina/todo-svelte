namespace BackTodo.Models;

/// <summary>
/// Représente les paramètres nécessaires pour la connexion à la base de données des tâches.
/// </summary>
public class TodoStoreDatabaseSettings
{
    /// <summary>
    /// Obtient ou définit la chaîne de connexion à la base de données.
    /// </summary>
    public string ConnectionString { get; set; } = null!;

    /// <summary>
    /// Obtient ou définit le nom de la base de données.
    /// </summary>
    public string DatabaseName { get; set; } = null!;

    /// <summary>
    /// Obtient ou définit le nom de la collection de tâches dans la base de données.
    /// </summary>
    public string TodosCollectionName { get; set; } = null!;
}
