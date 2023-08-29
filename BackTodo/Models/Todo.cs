using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackTodo.Models;

/// <summary>
/// Représente une tâche à accomplir dans le système.
/// </summary>
public class Todo
{
    /// <summary>
    /// Obtient ou définit l'identifiant unique de la tâche.
    /// </summary>
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    /// <summary>
    /// Obtient ou définit le nom de la tâche.
    /// </summary>
    [BsonElement("Name")]
    public required string Name { get; set; }

    /// <summary>
    /// Obtient ou définit la description de la tâche.
    /// </summary>
    public required string Description { get; set; }

    /// <summary>
    /// Obtient ou définit une valeur indiquant si la tâche a été réalisée ou non.
    /// </summary>
    public bool? IsDone { get; set; }

    /// <summary>
    /// Obtient ou définit la date limite de la tâche.
    /// </summary>
    public DateTime? LimitDate { get; set; }
}
