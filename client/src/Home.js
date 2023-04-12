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
      <SearchInput
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <RecipeList searchQuery={searchQuery} />
    </Wrapper>
    </Container>
    
  );
};

const Container= styled.div`
`

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

export default Home;
