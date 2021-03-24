import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchArea from "./SearchArea";
import Ticket from "./Ticket";
import LabelsFilterBar from "./LabelsFilterBar";

function TicketList(props) {
  const [list, setList] = useState([]);
  const [hiddenTickets, setHidden] = useState([]);
  const [shownLabels, setLabels] = useState([]);

  const filterViewList = (ticketList) => {
    return ticketList
      .filter((ticket) => !hiddenTickets.includes(ticket.id))
      .filter((ticket) => {
        return !shownLabels.length ? true : ticket.labels;
      })
      .filter((ticket) => {
        if (!shownLabels.length) {
          return true;
        }
        return ticket.labels.some((label) => shownLabels.includes(label));
      });
  };

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

  const filterLabel = (labelName) => {
    if (shownLabels.includes(labelName)) return;
    const newLabelList = shownLabels.concat([labelName]);
    setLabels(newLabelList);
  };

  const unFilterLabel = (labelName) => {
    if (!shownLabels.includes(labelName)) return;
    const newLabelList = shownLabels.filter((label) => label !== labelName);
    setLabels(newLabelList);
  };

  return (
    <>
      <h1 id="page-title">Ticket Manager</h1>
      <SearchArea
        changeHandler={search}
        restoreHandler={restoreHiddenTickets}
        list={list}
        hiddenList={hiddenTickets}
      />
      <LabelsFilterBar
        filtered={shownLabels}
        labelClickHandler={filterLabel}
        unFilterHandler={unFilterLabel}
      />
      <div className="ticket-list">
        {filterViewList(list).map((ticketObj) => {
          return (
            <Ticket
              ticket={ticketObj}
              hideHandler={hideTicket}
              labelClickHandler={filterLabel}
            />
          );
        })}
      </div>
    </>
  );
}

export default TicketList;
