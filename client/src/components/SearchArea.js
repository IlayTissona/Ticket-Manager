import React from "react";

function SearchArea({ changeHandler }) {
  return (
    <div className="search-area">
      <input
        id="searchInput"
        type="text"
        onChange={(e) => changeHandler(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchArea;
