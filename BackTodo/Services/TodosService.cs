using BackTodo.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BackTodo.Services;

public class TodosService
{
    private readonly IMongoCollection<Todo> _todosCollection;

    public TodosService(
        IOptions<TodoStoreDatabaseSettings> todoStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            todoStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            todoStoreDatabaseSettings.Value.DatabaseName);

        _todosCollection = mongoDatabase.GetCollection<Todo>(
            todoStoreDatabaseSettings.Value.TodosCollectionName);
    }

    /// <summary>
    /// Fonction GetAll() permettant de récupérer la liste des todos
    /// </summary>
    /// <returns>La liste des todos</returns>
    public async Task<List<Todo>> GetAll()
    {
        long count = await _todosCollection.CountDocumentsAsync(_ => true);

        if (count == 0)
        {
            throw new InvalidOperationException("La collection est vide.");
        }

        var todos = await _todosCollection.Find(_ => true).ToListAsync();

        return todos;
    }

    /// <summary>
    /// Fonction GetById() permettant de récupérer une todo en fonction de son id
    /// </summary>
    /// <param name="id">id unique de la todo</param>
    /// <returns>Une todo en fonction de son id</returns>
    public async Task<Todo?> GetById(string id) =>
        await _todosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    /// <summary>
    /// Fonction CreateAsync() permettant d'insérer une nouvelle todo
    /// </summary>
    /// <param name="newTodo">todo à ajouter</param>
    public async Task CreateAsync(Todo newTodo)
    {
        await _todosCollection.InsertOneAsync(newTodo);
    }

    /// <summary>
    /// Fonction UpdateAsync() permettant de modifier une todo
    /// </summary>
    /// <param name="id">id de la todo à modifier</param>
    /// <param name="updatedTodo">nouvelle valeur de la todo</param>
    public async Task UpdateAsync(string id, Todo updatedTodo) =>
        await _todosCollection.ReplaceOneAsync(x => x.Id == id, updatedTodo);

    /// <summary>
    /// Fonction RemoveAsync() permettant de supprimer une todo
    /// </summary>
    /// <param name="id">id de la todo à supprimer</param>
    public async Task RemoveAsync(string id) =>
        await _todosCollection.DeleteOneAsync(x => x.Id == id);

}