import React from "react";
import Ticket from "./Ticket";

function TicketList(props) {
  return (
    <div className="tickets-component">
      <div className="search-area"></div>
      <ul className="ticket-list">
        <Ticket />
      </ul>
    </div>
  );
}

export default TicketList;
