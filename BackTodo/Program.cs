using BackTodo.Models;
using BackTodo.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

// Création du générateur d'application Web
var builder = WebApplication.CreateBuilder(args);

// Ajout des services au conteneur d'injection de dépendances.
builder.Services.Configure<TodoStoreDatabaseSettings>(
    builder.Configuration.GetSection("TodoStoreDatabase"));

builder.Services.AddSingleton<TodosService>();

// Configuration des contrôleurs pour la gestion des requêtes HTTP
builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Ajout de la prise en charge de l'exploration de l'API et de Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Création de l'application Web
var app = builder.Build();

// Configuration du pipeline de requête HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Activation de Swagger pour la documentation de l'API
    app.UseSwaggerUI();
}

// Activation de la prise en charge de Cross-Origin Resource Sharing (CORS)
app.UseCors(builder => builder.WithOrigins("http://localhost:5174").AllowAnyHeader().AllowAnyMethod());

app.UseDefaultFiles(); // Utilisation des fichiers par défaut pour les répertoires
app.UseStaticFiles(); // Utilisation des fichiers statiques (ex: HTML, CSS, JS)

// Spécification des ports à utiliser par l'application
var httpsPort = 3000; 
var httpPort = 3001; 
app.Urls.Add("https://localhost:" + httpsPort);
app.Urls.Add("http://localhost:" + httpPort);

app.UseHttpsRedirection(); // Redirection automatique vers HTTPS pour les connexions

app.UseAuthorization(); // Activation de la gestion des autorisations

app.MapControllers(); // Mappage des contrôleurs pour le traitement des requêtes

app.Run(); // Lancement de l'application
