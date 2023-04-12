import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

const AddRecipe = () => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleRecipeImageChange = (event) => {
    setRecipeImage(event.target.files[0]);
  };

  const handleRecipeIngredientsChange = (event) => {
    setRecipeIngredients(event.target.value);
  };

  const handleRecipeCategoryChange = (event) => {
    setRecipeCategory(event.target.value);
  };

  const handleRecipeInstructionsChange = (event) => {
    setRecipeInstructions(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = await getAccessTokenSilently();

    const formData = new FormData();
    formData.append("name", recipeName);
    formData.append("image", recipeImage);
    formData.append("ingredients", recipeIngredients);
    formData.append("category", recipeCategory);
    formData.append("instructions", recipeInstructions);
    formData.append("userId", user.sub);

    try {
      const response = await fetch("/api/add-recipe", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        resetForm();
      } else {
        // TODO: display an error message
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setRecipeName("");
    setRecipeImage(null);
    setRecipeIngredients("");
    setRecipeCategory("");
    setRecipeInstructions("");
  };

  if (!isAuthenticated) {
    return <div>Please log in to add a recipe.</div>;
  }

  return (
    <Wrapper>
      <Title>Add Recipe</Title>
      {showSuccessMessage && <SuccessMessage>Your recipe has been added!</SuccessMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Recipe Name:</Label>
          <Input type="text" value={recipeName} onChange={handleRecipeNameChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Recipe Image:</Label>
          <FileInput type="file" accept="image/*" onChange={handleRecipeImageChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Ingredients:</Label>
          <TextArea value={recipeIngredients} onChange={handleRecipeIngredientsChange
      } required />
      </FormGroup>
      <FormGroup>
        <Label>Category:</Label>
        <Input type="text" value={recipeCategory} onChange={handleRecipeCategoryChange} required />
      </FormGroup>
      <FormGroup>
        <Label>Directions:</Label>
        <TextArea value={recipeInstructions} onChange={handleRecipeInstructionsChange} required />
      </FormGroup>
      <SubmitButton type="submit">Add Recipe</SubmitButton>
    </Form>
  </Wrapper>
  );
};

const Wrapper = styled.div `
max-width: 600px; 
margin: 0 auto; 
padding: 1rem; 
text-align: center;`

const Form = styled.form `display: flex; 
flex-direction: column; 
align-items: center;`

const FormGroup = styled.div `display: flex; 
flex-direction: column; 
margin-bottom: 1rem; 
text-align: left; 
width: 100%;`

const Label = styled.label `
font-size: 1.2rem; 
margin-bottom: 0.5rem;`

const Input = styled.input `
padding: 0.5rem; 
font-size: 1rem; 
border-radius: 0.25rem; 
border: 1px solid #ccc; 
width: 100%;`

const TextArea = styled.textarea `
padding: 0.5rem; 
font-size: 1rem; 
border-radius: 0.25rem; 
border: 1px solid #ccc; 
width: 100%;`

const FileInput = styled.input `
padding: 0.5rem; 
font-size: 1rem; 
border-radius: 0.25rem; 
border: 1px solid #ccc; 
width: 100%;`

const SubmitButton = styled.button`
background-color: orange;
color: #fff;
font-size: 1.2rem;
padding: 0.5rem 1rem;
border: none;
border-radius: 0.25rem;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
background-color: #3367d6;
}

&:active {
background-color: #2a5ca8;
}
`;

const Title= styled.h1`
color: orange;`
const SuccessMessage = styled.div `
background-color: orange; 
color: white; 
font-size: 1.2rem; 
padding: 0.5rem 1rem; 
border-radius: 0.25rem; 
margin-bottom: 1rem;`

export default AddRecipe;