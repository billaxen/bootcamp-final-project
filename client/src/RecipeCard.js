import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const RecipeCard = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(false);

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

  const handleLikeClick = () => {
    const newFavorite = {
      _id: recipe._id,
      name: recipe.name,
      category: recipe.category,
      image: recipe.image,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    };

    fetch("/api/post-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFavorite),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("Recipe added to favorites");
          setIsLiked(true);
        } else {
          console.error("Failed to add recipe to favorites:");
          setError(true);
        }
      })
      .catch((error) => console.error("Error adding recipe to favorites:", error));
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const instructionsArray = recipe.instructions.split(".");

  const filteredIngredients = recipe.ingredients.filter((ingredient) => ingredient && ingredient.trim());

  return (
    <div>
      <h1>{recipe.name}</h1>
      <h2>{recipe.category}</h2>
      <img src={recipe.image} alt={recipe.name} />
      <LikeButton onClick={handleLikeClick} isLiked={isLiked}>
        {isLiked ? "Liked" : "Like"}
      </LikeButton>

      <ul>
        <h2>Ingredients</h2>
        {filteredIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.trim()}</li>
        ))}
      </ul>
      <ol>
        <h2>Instructions</h2>
        {instructionsArray.map((instruction, index) => (
          <li key={index}>{instruction.trim()}</li>
        ))}
      </ol>
    </div>
  );
};

const LikeButton = styled.button`
  background-color: ${(props) => (props.isLiked ? "red" : "green")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export default RecipeCard;
