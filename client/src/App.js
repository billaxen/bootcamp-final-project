import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import MyRecipes from "./MyRecipes";
import Favorites from "./Favorites";
import AddRecipe from "./AddRecipe";
import EditRecipe from "./EditRecipe";
import Footer from "./Footer";
import ProfilePage from "./ProfilePage";
import RecipeList from "./RecipeList";
import RecipeCard from "./RecipeCard";
import FavRecipeCard from "./FavRecipeCard";



const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/recipe-list" element={<RecipeList />} />
          <Route path="/recipe/:recipeId" element={<RecipeCard />} />
          <Route path="/favrecipe/:recipeId" element={<FavRecipeCard />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
