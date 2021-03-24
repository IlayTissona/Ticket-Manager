import React from "react";
import hideIcon from "./icons/hide-icon.svg";
import doneIcon from "./icons/done-icon.svg";
import starEmpty from "./icons/star-empty.svg";
import starFull from "./icons/star-full.svg";

function Ticket({
  ticket,
  hideHandler,
  labelClickHandler,
  doneHandler,
  starHandler,
}) {
  return (
    <div className="ticket">
      <img
        alt="[X]"
        src={hideIcon}
        className="hideTicketButton"
        onClick={() => hideHandler(ticket.id)}
      />
      <img
        alt="[V]"
        src={doneIcon}
        className={`markAsDone${ticket.done ? " done" : ""}`}
        onClick={() => doneHandler(ticket.id)}
      />
      <img
        alt="⁕"
        src={ticket.starred ? starFull : starEmpty}
        className="star-button"
        onClick={() => starHandler(ticket.id)}
      />
      <h4 className="ticket-title">{ticket.title}</h4>
      <div className="ticket-content">{ticket.content}</div>
      <div className="ticket-metadata">
        <p className="user-Email">{ticket.userEmail}</p>
        <p className="creation-date">
          {new Date(ticket.creationTime).toDateString()}
        </p>
        <div className="labels">
          {ticket.labels?.map((label) => (
            <button
              className="label"
              onClick={() => {
                labelClickHandler(label);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
