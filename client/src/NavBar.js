import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import ProfilePage from "./ProfilePage";

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();

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
        <li>
          <Link to="/profile">Profile</Link>
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

const Wrapper = styled.div`
  height: 8%;
  background-color: orange;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const AuthButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const UserName = styled.p`
  margin-right: 1rem;
  color: black;
  
`;

export default NavBar;
