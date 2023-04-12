import React, { useState } from "react";
import styled from "styled-components";
import RecipeList from "./RecipeList";



const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container>
      
      <Wrapper>
        <LogoWrapper>
        <Logo src="/images/Logo3.png" alt="logo" />
      <SearchInput
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
   
        </LogoWrapper>
     
      <RecipeList searchQuery={searchQuery} />
    </Wrapper>
    </Container>
    
  );
};

const Container= styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;


const Wrapper = styled.div`
  margin-top: 2%;
  padding: 1rem;
`;

const SearchInput = styled.input`
max-width: 600px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
margin: 0 auto;
`



export default Home;
