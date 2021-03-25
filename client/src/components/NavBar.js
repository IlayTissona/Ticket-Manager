import React from "react";
import { useState } from "react";

function NavBar({ clickHandler, addHandler }) {
  const [pickedButton, setPickedButton] = useState("all");

  return (
    <>
      <div id="nav-bar">
        {/* <h4 id="side-menu-title">MENU</h4> */}
        <button
          className={`menu-button${
            pickedButton === "all" ? " picked-menu-button" : ""
          }`}
          onClick={() => {
            setPickedButton("all");
            clickHandler();
          }}
        >
          All
        </button>
        <button
          className={`menu-button${
            pickedButton === "starred" ? " picked-menu-button" : ""
          }`}
          onClick={() => {
            setPickedButton("starred");
            clickHandler("starred");
          }}
        >
          Starred
        </button>
        <button
          className={`menu-button${
            pickedButton === "done" ? " picked-menu-button" : ""
          }`}
          onClick={() => {
            setPickedButton("done");
            clickHandler("done");
          }}
        >
          Done
        </button>
        <button
          className={`menu-button${
            pickedButton === "undone" ? " picked-menu-button" : ""
          }`}
          onClick={() => {
            setPickedButton("undone");
            clickHandler("undone");
          }}
        >
          Un-Done
        </button>
        <button
          className={`menu-button${
            pickedButton === "hidden" ? " picked-menu-button" : ""
          }`}
          onClick={() => {
            setPickedButton("hidden");
            clickHandler("hidden");
          }}
        >
          Hidden
        </button>
      </div>
    </>
  );
}

export default NavBar;
