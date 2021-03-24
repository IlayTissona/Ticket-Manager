import axios from "axios";
import React from "react";
import { useState } from "react";

function SideMenu({ clickHandler, addHandler }) {
  const [formHidden, setFormHidden] = useState(true);

  const handleFormSubmit = (e) => {
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
        console.log(res.data);
        addHandler(res.data);
      })
      .catch((e) => {
        addHandler(e);
      });
  };

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
      <button className="menu-button" onClick={() => setFormHidden(false)}>
        Add Ticket
      </button>
      <form id="add-new-form" hidden={formHidden} onSubmit={handleFormSubmit}>
        <span className="exitButton" onClick={() => setFormHidden(true)}>
          X
        </span>
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
        />
        <label htmlFor="content">Labels : </label>
        <input
          className="labelsInput"
          name="labels"
          id="labels"
          autoComplete="off"
          placeholder="Seperated by commas (label1, label2)"
        />
        <input
          className="submit-button"
          name="submit"
          id="submit"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default SideMenu;
