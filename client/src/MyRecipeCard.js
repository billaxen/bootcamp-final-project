import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const MyRecipeCard = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch(`/api/get-added-recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data)
        console.log("data.data", data.data)
        if (data && data.data) {
          setRecipe(data.data);
        } else {
          console.error("Failed to fetch recipe data");
        }
      })
      .catch((error) => console.error(error));
  }, [recipeId]);

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      setError("Please sign in to add this recipe to your favorites");
      return;
    }
  
    const newFavorite = {
      userId: user.sub,
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
          setError(false);
        } else {
          console.error("Failed to add recipe to favorites:");
          setError("This recipe is already in your favorites");
        }
      })
      .catch((error) => console.error("Error adding recipe to favorites:", error));
  };
  
  

  if (!recipe) {
    return <div>Loading...</div>;
  }
  
  const instructionsArray = recipe.instructions.split(".");
  
  const filteredIngredients = recipe.ingredients
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient !== "");
  
  return (
    <Container>
      <h1>{recipe.name}</h1>
      <h2>{recipe.category}</h2>
      <RecipeImage src={`/images/${recipe.image}`}alt={recipe.name} />

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ul>
        <h2>Ingredients</h2>
        {filteredIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol>
        <h2>Instructions</h2>
        {instructionsArray.map((instruction, index) => (
          <li key={index}>{instruction.trim()}</li>
        ))}
      </ol>
    </Container>
  );
        }  


const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px 5px 0 0;
`;


const ErrorMessage = styled.div`
color: red;
`

const Container = styled.div`
max-width: 30%;
margin: 0 auto;
background: fea600`

export default MyRecipeCard;
