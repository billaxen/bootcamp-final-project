// const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const multer = require("multer");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { CONNECTION_STRING_URI } = process.env;
const client = new MongoClient(MONGO_URI, options);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });



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
      return  res.status(404).json({ status: 404, data: null, message: "failed to retreive receipes data, please contact the system administrator or try again later",
    });
    }
    // Send the recipe data to the client-side
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

const getRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("FlavorFinderDb");
  const { recipeId } = req.params;
  try {
    await client.connect();
    const recipe = await db.collection("recipes").findOne({ _id:recipeId });

    if (recipe) {
      res.status(200).json({ status: 200, data: recipe, message: "Success" });
    } else {
      res.status(404).json({ status: 404, data: null, message: "Recipe not found" });
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

const addRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("FlavorFinderDb");
  try {
    await client.connect();
    const collection = db.collection("addedRecipes");
    const result = await collection.insertOne({
      name: req.body.name,
      image: req.file.filename,
      ingredients: req.body.ingredients,
      category: req.body.category,
      instructions: req.body.instructions,
      userId: req.body.userId,
    });
    if (result.insertedCount === 1) {
      res.status(200).json({ status: 200, message: "Recipe added successfully" });
    } else {
      res.status(500).json({ status: 500, message: "Failed to add recipe" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error" });
  } finally {
    client.close();
  }
};

const postFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("FlavorFinderDb");
  const newFavorite = req.body

  try {
    await client.connect();
    const findResult = await db.collection("favorites").findOne({ _id: parseInt(newFavorite._id) });
    if (findResult) {
      return res.status(400).json({ status: 400, data: findResult, message: "This recipe is already in your favorites" });
    }
    const result = await db.collection("favorites").insertOne({ ...newFavorite});
    if (result.acknowledged && result.insertedId) {
      return res.status(200).json({ status: 200, data: result, message: "Recipe added to favorites" });
    } else {
      return res.status(500).json({ status: 500, data: null, message: "Failed to add recipe to favorites" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: "Server error" });
  } finally {
    client.close();
  }
};

const checkFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("FlavorFinderDb");
  const { recipeId } = req.params;
  try {
    await client.connect();
    console.log("Connected to MongoDB to check favorite recipe");
    const favorite = await db.collection("favorites").findOne({ _id: parseInt(recipeId, 10) });
    console.log("Favorite recipe found in the database:", favorite);

    if (favorite) {
      console.log("Recipe is already in favorites");
      res.status(200).json({ status: 200, message: "Recipe is in favorites" });
    } else {
      console.log("Recipe is not yet in favorites");
      res.status(404).json({ status: 404, message: "Recipe not in favorites" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error" });
  } finally {
    client.close();
    console.log("Closed MongoDB connection");
  }
};

const deleteFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("FlavorFinderDb");
  const { favoriteId } = req.params;
  const { userId } = req.body;
  
  try {
    await client.connect();
    console.log("Connected to MongoDB to delete favorite recipe");
    const result = await db.collection("favorites").deleteOne({ _id: parseInt(favoriteId), userId: userId });
    console.log("Favorite recipe deleted from the database:", result);

    if (result.deletedCount === 1) {
      console.log("Recipe removed from favorites");
      res.status(200).json({ status: 200, message: "Recipe removed from favorites" });
    } else {
      console.log("Recipe not found in favorites");
      res.status(404).json({ status: 404, message: "Recipe not found in favorites" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Server error" });
  } finally {
    client.close();
    console.log("Closed MongoDB connection");
  }
};




const getFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("FlavorFinderDb");

  try {
    await client.connect();
    const collection = client.db("FlavorFinderDb").collection("favorites");
    const favorites = await collection.find().toArray();

    res.status(200).json({ status: 200, data: favorites, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Server error" });
  } finally {
    await client.close();
  }
};



module.exports = {
  getRecipes,
  getRecipe,
  upload,
  addRecipe,
  postFavorite,
  getFavorites,
  checkFavorite,
  deleteFavorite

};
