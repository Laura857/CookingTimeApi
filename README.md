# CookingTimeApi
> Projet de 4 jours A5
> 
> Découverte de NodeJS 

NodejsProject est un projet qui permet de gérer des recettes. 
Une fois connecté, l'utilisateur à la possibilité d'ajouter des recettes (titre, description, ingrédients, image). Il peut aussi gérer son profil en modifiant ses données personnelles et son mot de passe, ainsi que se déconnecter.


# Stacks
- Node.Js
- MongoDB

# Fonctionnalités développés
- Authentification (inscription, déconnexion, appel d'api possible uniquement via token)
- CRUD (get, put, delete, post pour la gestion des recettes)
- Web Socket (pour notifiés l'utilisateur lors de l'ajout d'une recette)
- Utilisation de Three.Js (un carré qui tourne lors de l'ajout d'une recette)

# Lancer l'application en local
Cloner le repository

```
git clone git@github.com:Laura857/CookingTimeApi.git
```

Lancer les commandes suivantes:
```
npm install
node server
```
Le server se lance et l'application est accessible depuis:  http://localhost:3000/#/
  
# Les différents web service :
- Authentification
    - Inscription
    ```
    curl --location --request POST 'localhost:3001/user/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": "unmotdepasse",
        "pseudo": "myPseudo"
    }'
    ```
    - Connexion
    ```
    curl --location --request POST 'localhost:3001/user/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": "unmotdepasse"
    }'
    ```
- Utilisateur
    - Retrouver les informations personnelles d'un utilisateur 
    ```
    curl --location --request GET 'localhost:3001/user/615c62d6e50bc47a8b00c573'
    ```
    - Modifier les informations personnelles d'un utilisateur
    ```
    curl --location --request PUT 'localhost:3001/user/615c62d6e50bc47a8b00c573' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjJkNmU1MGJjNDdhOGIwMGM1NzMiLCJpYXQiOjE2MzM1MjU5OTYsImV4cCI6MTYzMzY5ODc5Nn0.uqfZMHxPx4loLYPZT5eSBH0LS-gwf9z6kC9Q0Q8PuFY' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "_id": "615c62d6e50bc47a8b00c573",
        "email": "je@gmail.com",
        "password": "$2a$10$24X89UiVUS71N7vN4BkdBeJ6/Y/X6F9DND7BuZdsRrkA7QmRy7Uv.",
        "pseudo": "Jessy",
        "__v": 0
    }'
    ```
    
 - Recettes
    - Créer une recette
    ```
    curl --location --request POST 'localhost:3000/cookingRecipe' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjJkNmU1MGJjNDdhOGIwMGM1NzMiLCJpYXQiOjE2MzM3MjE4MzMsImV4cCI6MTYzMzg5NDYzM30.vun7AadG120svhY2alOnpFGabdWp7niF4sJeiyBKBNs' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "name",
        "ingredients": "listeIngredients",
        "instruction": "etapes",
        "urlImage": "https://imageDinternet"
    }'
    ```
    - Modifier une recette
    ```
    curl --location --request PUT 'localhost:3000/cookingRecipe/61616c8cf6f5a12490edb39d' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjJkNmU1MGJjNDdhOGIwMGM1NzMiLCJpYXQiOjE2MzM3MjE4MzMsImV4cCI6MTYzMzg5NDYzM30.vun7AadG120svhY2alOnpFGabdWp7niF4sJeiyBKBNs' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Tarte",
        "ingredients": "Pomme",
        "instruction": "Peler",
        "urlImage": "https://static.750g.com/images/600-600/9823eb627203c878f3e36d72f8ce6d1c/tarte-aux-pommes.jpg"
    }'
    ```
    - Supprimer une recette
    ```
    curl --location --request DELETE 'localhost:3000/cookingRecipe/615c99808cb0b3cf7e8054a1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjJkNmU1MGJjNDdhOGIwMGM1NzMiLCJpYXQiOjE2MzM1MjU5OTYsImV4cCI6MTYzMzY5ODc5Nn0.uqfZMHxPx4loLYPZT5eSBH0LS-gwf9z6kC9Q0Q8PuFY'
    ```
    - Retourner les informations d'une recette
    ```
    curl --location --request GET 'localhost:3000/cookingRecipe/615c999a8cb0b3cf7e8054a8'
    ```
    - Retourner les informations de toutes les recettes
    ```
    curl --location --request GET 'localhost:3000/cookingRecipe'
    ```
    - Chercher une recette
    ```
    curl --location --request POST 'http://localhost:3000/cookingRecipe/search' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Burger"
    }'
    ```
# Environnements
[CookingTimeApi Local](http://localhost:3000)

[CookingTimeApi Qual](https://dashboard.heroku.com/apps/cooking-time-api)
