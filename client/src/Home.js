import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import styled from "styled-components";
import React from "react";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import RecipeList from "./RecipeList";


const Home = () => {
  const { isLoading, error } = useAuth0();
  

  return (
    <div>
      <h1>Home</h1>
      <RecipeList/>


    </div>
  );
};


export default Home;
