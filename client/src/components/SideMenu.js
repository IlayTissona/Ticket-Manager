import React from "react";

function SideMenu({ clickHandler }) {
  return (
    <div id="side-menu">
      <div id="side-menu-title">MENU</div>
      <button className="menu-button" onClick={() => clickHandler()}>
        All (No Hidden)
      </button>
      <button className="menu-button" onClick={() => clickHandler("starred")}>
        Starred
      </button>
      <button className="menu-button" onClick={() => clickHandler("done")}>
        Done
      </button>
      <button className="menu-button" onClick={() => clickHandler("undone")}>
        Un-Done
      </button>
      <button className="menu-button" onClick={() => clickHandler("hidden")}>
        Hidden
      </button>
    </div>
  );
}

export default SideMenu;
