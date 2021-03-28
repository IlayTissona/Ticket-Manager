import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchArea from "./SearchArea";
import Ticket from "./Ticket";
import LabelsFilterBar from "./LabelsFilterBar";

function TicketList({ filters, finishLoading, setLoadState }) {
  const [list, setList] = useState([]);
  const [hiddenTickets, setHidden] = useState([]);
  const [shownLabels, setLabels] = useState([]);

  const filterViewList = (ticketList) => {
    let upFilteredTicketList = ticketList;

    if (filters["newId"]) {
      const newTicket = ticketList.find(
        (ticket) => ticket.id === filters["newId"].id
      );
      if (!newTicket) {
        search(""); // will fetch the new list
      } else {
        const listIds = ticketList.map((ticket) => ticket.id);
        const newTicketObj = upFilteredTicketList.find(
          (ticket) => ticket.id === newTicket.id
        );
        upFilteredTicketList = list.filter(
          (ticket) =>
            listIds.includes(ticket.id) && ticket.id !== newTicketObj.id
        );
        upFilteredTicketList.unshift(newTicketObj);
      }
    }

    const filterType = Object.entries(filters).find((entry) => entry[1]);
    if (filterType) {
      switch (filterType[0]) {
        case "done": {
          upFilteredTicketList = upFilteredTicketList
            .filter((ticket) => ticket.done)
            .filter((ticket) => !hiddenTickets.includes(ticket.id));
          break;
        }
        case "undone": {
          upFilteredTicketList = upFilteredTicketList
            .filter((ticket) => !ticket.done)
            .filter((ticket) => !hiddenTickets.includes(ticket.id));
          break;
        }
        case "starred": {
          upFilteredTicketList = upFilteredTicketList
            .filter((ticket) => ticket.starred)
            .filter((ticket) => !hiddenTickets.includes(ticket.id));
          break;
        }
        case "hidden": {
          upFilteredTicketList = upFilteredTicketList.filter((ticket) =>
            hiddenTickets.includes(ticket.id)
          );
          break;
        }
        default: {
          upFilteredTicketList = upFilteredTicketList.filter(
            (ticket) => !hiddenTickets.includes(ticket.id)
          );
        }
      }
    } else {
      upFilteredTicketList = upFilteredTicketList.filter(
        (ticket) => !hiddenTickets.includes(ticket.id)
      );
    }

    return upFilteredTicketList
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
      })
      .catch((e) => finishLoading("Error: Can't Search"));
  };

  const hideTicket = (ticketId) => {
    let newHiddenList;
    if (hiddenTickets.includes(ticketId)) {
      newHiddenList = hiddenTickets.filter((id) => id !== ticketId);
    } else {
      newHiddenList = hiddenTickets.concat([ticketId]);
    }
    setHidden(newHiddenList);
  };

  const doneTicket = (ticketId) => {
    const ticketToChange = list.find((ticket) => ticket.id === ticketId);
    setLoadState("pending");
    axios
      .patch(
        `/api/tickets/${ticketId}/${ticketToChange.done ? "undone" : "done"}`
      )
      .then((patchRes) => {
        if (patchRes.data.updated) {
          ticketToChange.done = !ticketToChange.done;
          const newList = list.slice();
          setList(newList);
          finishLoading("success");
        } else {
          finishLoading(`Error : ${patchRes.data.message}`);
        }
      })
      .catch((e) => {
        finishLoading(e);
      });
  };
  const starTicket = (ticketId) => {
    const ticketToChange = list.find((ticket) => ticket.id === ticketId);
    setLoadState("pending");
    axios
      .patch(
        `/api/tickets/${ticketId}/${ticketToChange.starred ? "unstar" : "star"}`
      )
      .then((patchRes) => {
        if (patchRes.data.updated) {
          ticketToChange.starred = !ticketToChange.starred;
          const newList = list.slice();
          setList(newList);
          finishLoading("success");
        } else {
          finishLoading(`Error : ${patchRes.data.message}`);
        }
      })
      .catch((e) => {
        finishLoading(e);
      });
  };

  const restoreHiddenTickets = () => {
    setHidden([]);
  };

  useEffect(() => {
    setLoadState("pending");
    axios
      .get("/api/tickets")
      .then((res) => {
        setList(res.data);
        finishLoading("success");
      })
      .catch((e) => {
        finishLoading(e);
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
      <SearchArea
        changeHandler={search}
        restoreHandler={restoreHiddenTickets}
        list={filterViewList(list)}
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
              isNew={filters.newId && ticketObj.id === filters.newId.id}
              ticket={ticketObj}
              hideHandler={hideTicket}
              doneHandler={doneTicket}
              labelClickHandler={filterLabel}
              starHandler={starTicket}
              loaderFunctions={{ finishLoading, setLoadState }}
            />
          );
        })}
      </div>
    </>
  );
}

export default TicketList;
