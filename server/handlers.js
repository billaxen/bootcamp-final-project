// const { v4: uuidv4 } = require("uuid");
  const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { CONNECTION_STRING_URI } = process.env;
const client = new MongoClient(MONGO_URI, options);

const getRecipes = async (req, res) => {
  console.log("endpoint console.log test in handler.js");
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("FlavorFinderDb");
  try {
    await client.connect();   
    // Retrieve all the recipe data
    const recipes = await db.collection("recipes").find().toArray(); 
    const recipesList = recipes.map(recipe => ({
      _id: recipe._id,
      name: recipe.name,
      image: recipe.image,
      category: recipe.category,
    }));
    if (recipesList) {
    res.status(200).json({ status: 200, data: recipesList, message:"Success" });
    }else {
      return  res.status(404).json({ status: 404, data: null, message: "failed to retreive items data, please contact the system administrator or try again later",
    });
    }
    // Send the recipe data to the client-side
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

module.exports = getRecipes
