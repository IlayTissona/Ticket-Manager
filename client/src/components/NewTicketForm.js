import React, { useState } from "react";
import axios from "axios";
import addFileIcon from "./icons/add-file.svg";
import hideIcon from "./icons/hide-icon.svg";

function NewTicketForm({ addHandler, setLoadState, finishLoading }) {
  const [formHidden, setFormHidden] = useState(true);

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
        setFormHidden(true);
      })
      .catch((e) => {
        finishLoading("Error: " + e);
        addHandler(e);
        setFormHidden(true);
      });
  };
  return (
    <>
      <button id="hide-form-button" onClick={() => setFormHidden(!formHidden)}>
        <img
          alt={formHidden ? "Add Ticket" : "Hide"}
          src={formHidden ? addFileIcon : hideIcon}
          id="hide-form-img"
        />
      </button>
      <form
        id="new-ticket-form"
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
    </>
  );
}

export default NewTicketForm;
