import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeCard = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();

  useEffect(() => {
    fetch(`/api/get-recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setRecipe(data.data);
        } else {
          console.error("Failed to fetch recipe data");
        }
      })
      .catch((error) => console.error(error));
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const instructionsArray = recipe.instructions.split(".");
  const filteredIngredients = recipe.ingredients.filter((ingredient) => ingredient.trim() !== '');

  return (
    <div>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <h2>{recipe.category}</h2>
      <ul>
        {filteredIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol>
        {instructionsArray.map((instruction, index) => (
          <li key={index}>{instruction.trim()}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeCard;
