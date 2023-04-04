import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import styled from "styled-components";
import React from "react";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

// import Profile from "./Profile";
// import {useAuth0} from "@auth0/auth0-react"

const ProfilePage = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  return (
    <div>
      <h1>Home</h1>
      <Column>
      <h1>Profile Page</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
     
      <Profile/>
      <LoginButton/>
      <LogoutButton/>
        </>
      )}
      </Column>

    </div>
  );
};

const Column = styled.div`
 display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


export default ProfilePage;
