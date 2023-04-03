import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Recipe from "./Recipe";
import MyRecipes from "./MyRecipes";
import Favorites from "./Favorites";
import CreateRecipe from "./CreateRecipe";
import EditRecipe from "./EditRecipe";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
