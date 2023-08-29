# Backend pour la gestion de Todos

Ce projet contient le code source pour une API de gestion de todos, développée en C# avec ASP.NET Core. L'API permet de créer, lire, mettre à jour et supprimer des todos.

## Prérequis

- [.NET Core SDK](https://dotnet.microsoft.com/download) - Installez le SDK .NET Core pour compiler et exécuter l'application.

## Installation et exécution

1. Clonez ce dépôt vers votre machine locale :

```bash
git clone https://github.com/Noxlumina/todo-svelte.git
```

2. Accédez au répertoire du projet :

```bash
cd BackTodo
```

3. Exécutez l'application en utilisant la commande suivante :

```bash
dotnet run
```

L'application sera accessible à l'adresse https://localhost:3000 (par défaut).

## Endpoints API

GET /todos : Récupère la liste de toutes les todos.

GET /todos/{id} : Récupère les détails d'une todo en fonction de son identifiant.

POST /todos : Crée une nouvelle todo.

PUT /todos/{id} : Met à jour une todo existante.

DELETE /todos/{id} : Supprime une todo existante.

## Documentation API (Swagger)

L'API est documentée à l'aide de Swagger, ce qui vous permet de visualiser et de tester facilement les endpoints.
Pour accéder à la documentation Swagger, exécutez l'application et ouvrez l'URL suivante dans votre navigateur :

http://localhost:3000/swagger

## Configuration de la base de données

La configuration de la base de données MongoDB est définie dans le fichier appsettings.json.
Assurez-vous de configurer correctement la chaîne de connexion et les informations de la base de données.

