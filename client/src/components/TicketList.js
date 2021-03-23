import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchArea from "./SearchArea";
import Ticket from "./Ticket";

function TicketList(props) {
  const [list, setList] = useState([]);

  const search = (value) => {
    axios
      .get(`/api/tickets${value ? "?searchText=" + value : ""}`)
      .then((res) => {
        setList(res.data);
      });
  };

  useEffect(() => {
    axios.get("/api/tickets").then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <>
      <SearchArea changeHandler={search} />
      <ul className="ticket-list">
        {list
          .filter((ticket) => !ticket.hidden)
          .map((ticketObj) => {
            return <Ticket ticket={ticketObj} />;
          })}
      </ul>
    </>
  );
}

export default TicketList;
