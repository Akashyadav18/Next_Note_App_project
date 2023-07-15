import React, { useState } from "react";

const Search = ({ users, setFilteredUsers }: any) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const filteredUsers = users.filter((user: any) =>
      user.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  return (
    <div className="w-[60%] m-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
