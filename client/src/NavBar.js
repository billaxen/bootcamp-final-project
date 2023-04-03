import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
  return (
    <Wrapper>
      <Categories>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my-recipes">My Recipes</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/create-recipe">Create Recipe</Link>
        </li>
      </Categories>
    </Wrapper>
  );
};

const Wrapper = styled.div`
height: 40px;
background-color: orange;
`


const Categories = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
`

export default NavBar;
