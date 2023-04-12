# bootcamp-final-project
FlavorFinder
FlavorFinder is a web application that allows users to search and view recipes, as well as add their own recipes to the database. Users can also save recipes to their favorites list and view their added recipes.

Table of Contents
Installation
Usage
Technologies Used
Contributing
License
Installation
To use the application, follow these steps:

Clone the repository to your local machine.
Run npm install to install the dependencies.
Create a .env file in the root directory with the following content:
javascript
Copy code
MONGO_URI=<your MongoDB URI>
Run npm run init to initialize the database with sample recipes (optional).
Run npm run dev to start the development server.
Usage
Once the server is running, you can access the following endpoints:

/api/get-recipes: Retrieves all recipes from the database.
/api/get-recipe/:recipeId: Retrieves a specific recipe by ID.
/api/get-added-recipe/:recipeId: Retrieves a user-added recipe by ID.
/api/get-favorites: Retrieves all favorites for a user.
/api/check-favorite/:recipeId: Checks if a recipe is already in a user's favorites list.
/api/add-recipe: Adds a recipe to the database.
/api/post-favorite: Adds a recipe to a user's favorites list.
/api/added-recipes: Retrieves all recipes added by a user.
/api/delete-favorite/:recipeId/:userId: Deletes a recipe from a user's favorites list.
/api/delete-recipe/:recipeId: Deletes a user-added recipe from the database.
The application also includes a basic front-end UI for searching and viewing recipes.

Technologies Used
The following technologies were used to create this application:

Node.js
Express
MongoDB
Multer