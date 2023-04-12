import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const response = await fetch("/api/get-favorites");
        const data = await response.json();
        const userFavorites = data.data.filter((favorite) => favorite.userId === user.sub);
        setFavoriteData(userFavorites);
      };
    
      fetchData();
    } else {
      setFavoriteData([]);
    }
  }, [isAuthenticated, user]);
  

  const handleRecipeClick = (recipeId) => {
    navigate(`/favrecipe/${recipeId}`);
  };

  const handleRemoveClick = async (recipeId, userId) => {
    console.log("handleRemoveClick")
    const response = await fetch(`/api/delete-favorite/${recipeId}/${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const updatedFavorites = favoriteData.filter(
        (favorite) => favorite._id !== recipeId
      );
      setFavoriteData(updatedFavorites);
    } else {
      console.log("Failed to remove recipe from favorites");
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to see your favorite recipes</div>;
  }

  return (
    <div>
      <h1>Favorites</h1>
      {isAuthenticated && (
        <RecipeListContainer>
          {favoriteData.map((recipe) => (
            <RecipeListItem key={recipe._id}>
              <RemoveButton onClick={() => handleRemoveClick(recipe._id, user.sub)}>
                X
              </RemoveButton>
              <RecipeImage src={recipe.image} alt={recipe.name} onClick={() => handleRecipeClick(recipe._id)} />
              <RecipeName onClick={() => handleRecipeClick(recipe._id)}>{recipe.name}</RecipeName>
              <RecipeCategory>{recipe.category}</RecipeCategory>
            </RecipeListItem>
          ))}
        </RecipeListContainer>
      )}
    </div>
  );
};

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
`;

const RecipeName = styled.h2`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const RecipeCategory = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 0.5rem;
`;

const RecipeListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-left: 1%;
  margin-right: 1%;
`;

const RecipeListItem = styled.li`
  background-color: #f2f2f2;
  border-radius: 5px;
  text-align: center;
  font-size: 1.5rem;
  position: relative;
`;

const RemoveButton = styled.button`

  position: absolute;
  top: 0;
  right: 0;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px 0 0 0;
  font-size: 0.8rem;
  padding: 0;
  padding: 5px;
`

export default Favorites