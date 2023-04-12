import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MyRecipes = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/added-recipes?userId=${user.sub}`);
        const data = await response.json();
        setRecipes(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, [user, isDeleted]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/myrecipe/${recipeId}`);
  };

  const handleDeleteClick = async (recipeId, e) => {
    e.stopPropagation();
    const response = await fetch(`/api/delete-recipe/${recipeId}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setIsDeleted(!isDeleted);
    }
  };
 
  if (!isAuthenticated) {
    return <div>Please log in to add a recipe.</div>;
  }

  return (
    <Wrapper>
        <Title>My recipes</Title>
        <Container>

      {recipes.map((recipe) => (
        <RecipeContainer key={recipe._id} onClick={() => handleRecipeClick(recipe._id)}>
          <RecipeImage src={`/images/${recipe.image}`} alt={recipe.name} />
          <h2>{recipe.name}</h2>
          <p>{recipe.category}</p>
          <ButtonContainer>
            <DeleteButton onClick={(e) => handleDeleteClick(recipe._id, e)}>Delete</DeleteButton>
          </ButtonContainer>
        </RecipeContainer>
      ))}
    </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #fedc9c;
  }
`;

const RecipeImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
/* position: absolute; */
  padding: 0.2rem;
  border: none;
  border-radius: 5px;
  background-color: lightgray;
  color: #fff;
  font-weight: bold;

`;

const Title =  styled.h1`
color: orange;'
`

const Wrapper = styled.div`
text-align: center
`


export default MyRecipes;
