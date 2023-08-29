using BackTodo.Models;
using BackTodo.Services;
using Microsoft.AspNetCore.Mvc;

namespace backtodo.Controllers;

/// <summary>
/// Contrôleur responsable de la gestion des todos.
/// </summary>
/// <param name="controller">La route api du controller à le nom du controller dans notre cas todos.</param>
[ApiController]
[Route("[controller]")]
public class TodosController : ControllerBase
{
    private readonly TodosService _todosService;
    private readonly ILogger<TodosController> logger;


    public TodosController(TodosService todosService, ILogger<TodosController> logger)
    {
        _todosService = todosService;
        this.logger = logger;
    }

    /// <summary>
    /// Récupère la liste de toutes les todos.
    /// </summary>
    /// <returns>Une liste de todos.</returns>
    [HttpGet]
    public async Task<List<Todo>> Get() =>
        await _todosService.GetAll();

    /// <summary>
    /// Récupère les détails d'une todo en fonction de son identifiant.
    /// </summary>
    /// <param name="id">L'identifiant de la todo.</param>
    /// <returns>Les détails d'une todo.</returns>
    [HttpGet("{id:length(24)}")]
    [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Todo>> Get(string id)
    {
        var todo = await _todosService.GetById(id);

        if (todo is null)
        {
            logger.LogError("no todo with id : " + id);
            return NotFound();
        }
        logger.LogInformation("get information from todo with id : " + todo.Id);
        return todo;
    }

    /// <summary>
    /// Permet de crééer une nouvelle de todo.
    /// </summary>
    /// <param name="newTodo">Contenu de la nouvelle todo à insérer.</param>
    /// <returns>Détail de la todo qui vient d'être insérer</returns>
    [HttpPost]
    public async Task<IActionResult> Post(Todo newTodo)
    {
        await _todosService.CreateAsync(newTodo);

        return CreatedAtAction(nameof(Get), new { id = newTodo.Id }, newTodo);
    }

    /// <summary>
    /// Permet de modifier une todo déjà existante.
    /// </summary>
    /// <param name="id">Identifiant de la todo à modifier.</param>
    /// <param name="updatedTodo">Nouveau contenu de la todo.</param>
    /// <returns>NotFound si l'id ne correspond pas une todo existante ou NotContent si bien modifier</returns>
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Todo updatedTodo)
    {
        var todo = await _todosService.GetById(id);

        if (todo is null)
        {
            return NotFound();
        }

        updatedTodo.Id = todo.Id;

        await _todosService.UpdateAsync(id, updatedTodo);

        return NoContent();
    }

    /// <summary>
    /// Permet de supprimer une todo déjà existante.
    /// </summary>
    /// <param name="id">Identifiant de la todo à supprimer.</param>
    /// <returns>NotFound si l'id ne correspond pas une todo existante ou NotContent si bien supprimer</returns>
    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var todo = await _todosService.GetById(id);

        if (todo is null)
        {
            return NotFound();
        }

        await _todosService.RemoveAsync(id);

        return NoContent();
    }
}

