import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchArea from "./SearchArea";
import Ticket from "./Ticket";

function TicketList(props) {
  const [list, setList] = useState([]);

  const search = (value) => {
    axios
      .get(`/api/tickets${value === "" ? "?searchText=" + value : ""}`)
      .then((res) => {
        setList(res.data);
      });
  };

  const hideTicket = (ticketId) => {
    const newList = list.slice();
    const ticketToHide = newList.findIndex((val) => val._id === ticketId);
    newList[ticketToHide].hidden = true;
    setList(newList);
  };

  useEffect(() => {
    axios.get("/api/tickets").then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <>
      <SearchArea changeHandler={search} list={list} />
      <ul className="ticket-list">
        {list
          .filter((ticket) => !ticket.hidden)
          .map((ticketObj) => {
            return <Ticket ticket={ticketObj} hideHandler={hideTicket} />;
          })}
      </ul>
    </>
  );
}

export default TicketList;
