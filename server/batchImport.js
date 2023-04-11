
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const initializeRecipes = async (dbName) => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  const data = await response.json();
  const recipes = data.meals.map((meal) => {
    return {
      _id:meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      image: meal.strMealThumb,
      ingredients: [
        meal.strIngredient1,
        meal.strIngredient2,
        meal.strIngredient3,
        meal.strIngredient4,
        meal.strIngredient5,
        meal.strIngredient6,
        meal.strIngredient7,
        meal.strIngredient8,
        meal.strIngredient9,
        meal.strIngredient10,
        meal.strIngredient11,
        meal.strIngredient12,
        meal.strIngredient13,
        meal.strIngredient14,
        meal.strIngredient15,
        meal.strIngredient16,
        meal.strIngredient17,
        meal.strIngredient18,
        meal.strIngredient19,
        meal.strIngredient20,
      ],
      instructions: meal.strInstructions,
    };
  });

  await client.connect();
  const db = client.db(dbName);
  console.log("connected!");
  await db.collection("recipes").insertMany(recipes);
  client.close();
  console.log("disconnected!");
};

initializeRecipes("FlavorFinderDbBackUp");
