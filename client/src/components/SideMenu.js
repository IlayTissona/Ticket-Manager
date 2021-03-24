import axios from "axios";
import React from "react";
import { useState } from "react";
import Loader from "./Loader";

function SideMenu({ clickHandler, addHandler }) {
  const [formHidden, setFormHidden] = useState(true);
  const [pickedButton, setPickedButton] = useState("all");
  const [loadState, setLoadState] = useState("");

  const finishLoading = (state) => {
    setLoadState(state);
    setTimeout(() => {
      setLoadState(null);
    }, 1500);
  };

  const handleFormSubmit = (e) => {
    setLoadState("pending");
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = { labels: [] };
    for (let [key, value] of formData.entries()) {
      if (key === "labels") {
        data[key] = data[key].concat(value.replace(", ", ",").split(","));
        data[key] = data[key].map(
          (label) => label.charAt(0).toUpperCase() + label.substring(1)
        );
      } else {
        data[key] = value;
      }
    }

    axios
      .post("/api/tickets/new", data)
      .then((res) => {
        finishLoading("success");
        addHandler(res.data);
      })
      .catch((e) => {
        finishLoading("Error: " + e);
        addHandler(e);
      });
  };

  return (
    <>
      <div id="side-menu">
        <h4 id="side-menu-title">MENU</h4>
        <button
          className={`menu-button${
            pickedButton === "all" ? " picked-menu-button" : ""
          }`}
          onClick={() => {
            setPickedButton("all");
            clickHandler();
          }}
        >
          All (No Hidden)
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
        <button
          className="menu-button"
          onClick={() => setFormHidden(!formHidden)}
        >
          {formHidden ? "Add Ticket" : "Hide"}
        </button>
        <form
          id="add-new-form"
          hidden={formHidden}
          style={{ display: formHidden ? "none" : "flex" }}
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="userEmail">Email : </label>
          <input
            className="newTicketInput"
            type="email"
            name="userEmail"
            id="userEmail"
            autoComplete="off"
          />
          <label htmlFor="title">Title : </label>
          <input
            className="newTicketInput"
            name="title"
            id="title"
            autoComplete="off"
            required
          />
          <label htmlFor="content">Content : </label>
          <input
            className="newTicketInput"
            name="content"
            id="content"
            autoComplete="off"
            required
          />
          <label htmlFor="labels">Labels : </label>
          <input
            className="labelsInput"
            name="labels"
            id="labels"
            autoComplete="off"
            placeholder="Seperated by commas (label1, label2)"
          />
          <input
            className="menu-button"
            name="submit"
            id="submit"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      <Loader loadState={loadState} />
    </>
  );
}

export default SideMenu;
