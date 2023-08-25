using BackTodo.Models;
using BackTodo.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<TodoStoreDatabaseSettings>(
    builder.Configuration.GetSection("TodoStoreDatabase"));

builder.Services.AddSingleton<TodosService>();


builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Activer le support CORS ici
app.UseCors(builder => builder.WithOrigins("http://localhost:5174").AllowAnyHeader().AllowAnyMethod());

app.UseDefaultFiles();
app.UseStaticFiles();

// Spécifier le port à utiliser par l'application
var port = 3000; // Choisissez le numéro de port selon vos besoins
app.Urls.Add("https://localhost:" + port);

app.UseHttpsRedirection();

app.UseAuthorization();



app.MapControllers();

app.Run();

