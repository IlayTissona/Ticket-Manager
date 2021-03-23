import React from "react";

function SearchArea({ changeHandler, list }) {
  return (
    <div className="search-area">
      showing{" "}
      {list.reduce((prev, val) => {
        if (!val.hidden) return prev + 1;
        return prev;
      }, 0)}{" "}
      results. (<span id="hideTicketsCounter"></span>
      {list.reduce((prev, val) => {
        if (val.hidden) return prev + 1;
        return prev;
      }, 0)}
      <span /> hidden)
      <input
        id="searchInput"
        type="text"
        onChange={(e) => changeHandler(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchArea;
