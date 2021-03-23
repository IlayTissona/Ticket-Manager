import axios from "axios";
import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";

function TicketList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("/api/tickets").then((res) => {
      console.log("RES DATA!!!!!!!!!!!!!RESDATA!!!!!!!!!!!!", res);
      setList(res.data);
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
