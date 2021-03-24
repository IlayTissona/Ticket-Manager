import React from "react";

function Ticket({ ticket, hideHandler, labelClickHandler }) {
  return (
    <div className="ticket">
      <span className="hideTicketButton" onClick={() => hideHandler(ticket.id)}>
        [X]
      </span>
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
