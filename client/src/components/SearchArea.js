import React from "react";

function SearchArea({ changeHandler, restoreHandler, list, hiddenList }) {
  return (
    <div className="search-area">
      <span className="counters">
        showing {list.length - hiddenList.length} results. (
        <span id="hideTicketsCounter">{hiddenList.length}</span> hidden)
        <button id="restoreHideTickets" onClick={restoreHandler}>
          Restore
        </button>
      </span>

      <input
        id="searchInput"
        type="text"
        onChange={(e) => changeHandler(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchArea;
