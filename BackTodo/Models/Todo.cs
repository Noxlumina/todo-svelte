using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackTodo.Models;

public class Todo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    public required string Name { get; set; } 

    public required string Description { get; set; }

    public bool? IsDone { get; set; } 

    public DateTime?  LimitDate { get; set; }
}