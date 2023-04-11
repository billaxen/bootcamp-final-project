import React, { useState } from "react";
import RecipeList from "./RecipeList";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <RecipeList searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
