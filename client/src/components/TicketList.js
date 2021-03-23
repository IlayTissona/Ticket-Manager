import axios from "axios";
import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";

function TicketList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/tickets").then((res) => {
      setList(res.data);
      console.log(res);
    });
  }, []);

  return (
    <div className="tickets-component">
      <div className="search-area"></div>
      <ul className="ticket-list">
        {list
          .filter((ticket) => !ticket.hidden)
          .map((ticketObj) => {
            return <Ticket ticket={ticketObj} />;
          })}
      </ul>
    </div>
  );
}

export default TicketList;
