# Projet de Gestion de Todos

Ce projet a été réalisé en utilisant les technologies suivantes : ASP.NET 7.0, SvelteKit et MongoDB. Il s'agit d'une application de gestion de todos qui permet de créer, afficher, mettre à jour et supprimer des tâches à faire.

## Prérequis

- [.NET 7.0 SDK](https://dotnet.microsoft.com/download/dotnet/7.0) - Assurez-vous d'installer le SDK .NET 7.0 pour compiler et exécuter l'application ASP.NET.
- [Node.js](https://nodejs.org/) - Nécessaire pour exécuter SvelteKit.
- [MongoDB](https://www.mongodb.com/try/download/community) - Installez MongoDB pour la gestion de la base de données.

## Installation et exécution

1. Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/Noxlumina/todo-svelte.git
```


2. Accédez au répertoire du projet :

```bash
cd todo-svelte
```

3. Lancer la base de donnée

Installer MongoDb depuis le lien plus haut
ou depuis le docker-compose.yaml avec la cmd :

```bash
docker-compose up```

4. Lancer le backend

```bash
cd BackTodo
dotnet run
```

5. Lancer le frontend

```bash
cd ..
cd Front-Todo
npm install
npm run dev
```
