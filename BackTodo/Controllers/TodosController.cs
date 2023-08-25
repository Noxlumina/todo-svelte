using BackTodo.Models;
using BackTodo.Services;
using Microsoft.AspNetCore.Mvc;

namespace backtodo.Controllers;

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


    [HttpGet]
    public async Task<List<Todo>> Get() =>
        await _todosService.GetAll();
        

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

    [HttpPost]
    public async Task<IActionResult> Post(Todo newTodo)
    {
        await _todosService.CreateAsync(newTodo);

        return CreatedAtAction(nameof(Get), new { id = newTodo.Id }, newTodo);
    }

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

