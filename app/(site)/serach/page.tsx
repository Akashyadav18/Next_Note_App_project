"use client";

import React, { useRef, useState } from "react";

const Search = () => {
  const [items, setItems] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filterItem = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value;
    setItems((prev) => [...prev, value as string]);
    inputRef.current!.value = "";
  };

  return (
    <div className="w-[60%] m-auto">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} placeholder="Add" />
        <button type="submit">Add</button>
      </form>
      <h3>Items</h3>
      {filterItem.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};

export default Search;
