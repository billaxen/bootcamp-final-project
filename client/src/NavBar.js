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
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/favorites">Favorites</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/add-recipe">Add Recipe</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/my-recipes">My Recipes</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile">Profile</NavLink>
        </NavItem>
      </Categories>
      <AuthButtons>
        {isAuthenticated && (
          <>
            <UserImage src={user.picture} alt={user.name} />
            <UserName>{user.name}</UserName>
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
  /* justify-content: flex-start; */
  list-style: none;
  padding: 0;
  margin-right: 10px;
`;

const NavItem = styled.li`
  margin-right: 1.5rem;
  font-size: 1.2rem;

  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: white;
    transform: scaleX(1);

  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 1rem;
  font-size: 1rem;
  color: #333;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 2px solid white;
`;

export default NavBar;
