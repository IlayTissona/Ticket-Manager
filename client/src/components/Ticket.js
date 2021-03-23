import React from "react";

function Ticket({ ticket, hideHandler }) {
  return (
    <li className="ticket">
      <button
        className="hideTicketButton"
        onClick={() => hideHandler(ticket.id)}
      >
        hide
      </button>
      <h4 className="ticket-title">{ticket.title}</h4>
      <div className="ticket-content">{ticket.content}</div>
      {ticket.labels?.map((label) => (
        <button className="label">{label}</button>
      ))}
    </li>
  );
}

export default Ticket;
