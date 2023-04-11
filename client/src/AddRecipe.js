import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AddRecipe = () => {
  const { isAuthenticated } = useAuth0();
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");

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

  const { user } = useAuth0();
  
  const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append("name", recipeName);
  formData.append("image", recipeImage);
  formData.append("ingredients", recipeIngredients);
  formData.append("category", recipeCategory);
  formData.append("instructions", recipeInstructions);
  
  // add user ID to form data
  formData.append("userId", user.sub);
  
  try {
    const response = await fetch("/api/add-recipe", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      // TODO: display a success message and clear the form
    } else {
      // TODO: display an error message
    }
  } catch (error) {
    console.error(error);
  }
};

  if (!isAuthenticated) {
    return <div>Please log in to add a recipe.</div>;
  }

  return (
    <div>
      <h1>Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Recipe Name:
            <input type="text" value={recipeName} onChange={handleRecipeNameChange} required />
          </label>
        </div>
        <div>
          <label>
            Recipe Image:
            <input type="file" accept="image/*" onChange={handleRecipeImageChange} required />
          </label>
        </div>
        <div>
      <label>
        Ingredients:
        <textarea value={recipeIngredients} onChange={handleRecipeIngredientsChange} required />
      </label>
    </div>
    <div>
      <label>
        Category:
        <input type="text" value={recipeCategory} onChange={handleRecipeCategoryChange} required />
      </label>
    </div>
    <div>
      <label>
        Instructions:
        <textarea value={recipeInstructions} onChange={handleRecipeInstructionsChange} required />
      </label>
    </div>
    <button type="submit">Add Recipe</button>
  </form>
</div>
);
};

export default AddRecipe;