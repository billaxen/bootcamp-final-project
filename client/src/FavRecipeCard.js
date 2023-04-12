import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const FavRecipeCard = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(false);
  const { user, isAuthenticated } = useAuth0();

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
    if (!isAuthenticated) {
      setError("Please Log in to add this recipe to your favorites");
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

  const filteredIngredients = recipe.ingredients.filter((ingredient) => ingredient && ingredient.trim());

  return (
    <Container>
        
         <Name>
      <h1>{recipe.name}</h1>
      <h2>{recipe.category}</h2>
      </Name>
      <Card>
      <RecipeImage src={recipe.image} alt={recipe.name} />
     
{/*       
      <LikeButton onClick={handleLikeClick} isLiked={isLiked}>
        {isLiked ? "Liked" : "Like"}
      </LikeButton> */}
      <Details>
      <ul>
        <h2>Ingredients</h2>
        {filteredIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.trim()}</li>
        ))}
      </ul>
      <ol>
        <h2>Directions</h2>
        {instructionsArray.map((instruction, index) => (
          <li key={index}>{instruction.trim()}</li>
        ))}
      </ol>
      </Details>
      </Card>
    </Container>
  );
  
        }

const Container= styled.div`
display: flex;
flex-direction: column;
max-width: 50%;
margin: 10px auto;
padding: 10px;

 `

 const Card = styled.div`
 padding: 10px;
 border-radius: 15px;
 background: white;
 border: 5px solid orange;
`

const LikeButton = styled.button`
  background-color: ${(props) => (props.isLiked ? "red" : "green")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  max-width: 100px;
`;

const Details = styled.div`
margin-top: 10px;
border-radius: 10px;
`

const Name =  styled.div`
text-align: center;
`

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export default FavRecipeCard;
