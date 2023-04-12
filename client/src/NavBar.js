import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Wrapper>
      <Categories>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/add-recipe">Add Recipe</Link>
        </li>
        <li>
          <Link to="/my-recipes">My Recipes</Link>
        </li>
      </Categories>
      <AuthButtons>
        {isAuthenticated && (
          <>
            <UserName>Welcome {user.name}</UserName>
            <LogoutButton />
          </>
        )}
        {!isAuthenticated && <LoginButton />}
      </AuthButtons>
    </Wrapper>
  );
};


const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fea600;
  padding: 0.5rem;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Categories = styled.ul`
  display: flex;
  justify-content: flex-start;
  list-style: none;

  li {
    margin-right: 1.5rem;

    &:last-child {
      margin-right: 0;
    }

    a {
      color: #333;
      text-decoration: none;
      font-size: 1.2rem;
      transition: color 0.3s ease;

      &:hover {
        color: white;
      }
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 1rem;
`;

export default NavBar;
