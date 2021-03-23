import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchArea from "./SearchArea";
import Ticket from "./Ticket";

function TicketList(props) {
  const [list, setList] = useState([]);
  const [hiddenTickets, setHidden] = useState([]);

  const search = (value) => {
    axios
      .get(`/api/tickets${value !== "" ? "?searchText=" + value : ""}`)
      .then((res) => {
        setList(res.data);
      });
  };

  const hideTicket = (ticketId) => {
    const newHiddenList = hiddenTickets.concat([ticketId]);
    setHidden(newHiddenList);
  };

  const restoreHiddenTickets = () => {
    setHidden([]);
  };

  useEffect(() => {
    axios.get("/api/tickets").then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <>
      <h1 id="page-title">Ticket Manager</h1>
      <SearchArea
        changeHandler={search}
        restoreHandler={restoreHiddenTickets}
        list={list}
        hiddenList={hiddenTickets}
      />
      <ul className="ticket-list">
        {list
          .filter((ticket) => !hiddenTickets.includes(ticket.id))
          .map((ticketObj) => {
            return <Ticket ticket={ticketObj} hideHandler={hideTicket} />;
          })}
      </ul>
    </>
  );
}

export default TicketList;
