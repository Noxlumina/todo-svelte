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


    public async Task<Todo?> GetById(string id) =>
        await _todosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Todo newTodo)
    {
        

        await _todosCollection.InsertOneAsync(newTodo);
    }

    public async Task UpdateAsync(string id, Todo updatedTodo) =>
        await _todosCollection.ReplaceOneAsync(x => x.Id == id, updatedTodo);

    public async Task RemoveAsync(string id) =>
        await _todosCollection.DeleteOneAsync(x => x.Id == id);

}