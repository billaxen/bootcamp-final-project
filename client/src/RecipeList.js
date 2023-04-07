import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeDetails";

const RecipeList = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState([]);
  

  useEffect(() => {
    fetch("/api/get-recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data.data);
      })
      .catch((error) => console.error(error));
  }, []);


  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const filteredRecipes = recipeData.filter(
    (recipe) =>
      recipe.name &&
      searchQuery &&
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div>
      <h1>Recipes</h1>
      <RecipeListContainer>
        {filteredRecipes.map((recipe) => (
          <RecipeListItem
            key={recipe._id}
            onClick={() => handleRecipeClick(recipe._id)}
          >
            <RecipeImage src={recipe.image} alt={recipe.name} />
            <RecipeName>{recipe.name}</RecipeName>
            <RecipeCategory>{recipe.category}</RecipeCategory>
          </RecipeListItem>
        ))}
      </RecipeListContainer>
    </div>
  );
};

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px 5px 0 0;
`;

const RecipeName = styled.h2`
  font-size: 1.2rem;
  margin: 0.5rem 0;
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
`;

const RecipeListItem = styled.li`
  background-color: #f2f2f2;
  border-radius: 5px;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
`;

export default RecipeList;
