import "./App.css";
import TicketList from "./components/TicketList";
import Footer from "./components/Footer";
import { useState } from "react";
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import NewTicketForm from "./components/NewTicketForm";

const showAll = {
  starred: false,
  done: false,
  undone: false,
  hidden: false,
  newId: false,
};

function App() {
  const [showFilters, setFilters] = useState(showAll);
  const [loadState, setLoadState] = useState("");

  const finishLoading = (state) => {
    setLoadState(state);
    setTimeout(() => {
      setLoadState(null);
    }, 1500);
  };

  const filterView = (filterParam, newId) => {
    const newShowState = Object.assign({}, showAll);
    if (filterParam) newShowState[filterParam] = true;
    if (filterParam === "newId") newShowState[filterParam] = newId;
    setFilters(newShowState);
  };

  const addTicket = (data) => {
    if (data.saved) {
      filterView("newId", data.saved.id);
    }
  };

  return (
    <div className="App">
      <h1 id="page-title">Ticket Manager</h1>
      <TicketList
        filters={showFilters}
        finishLoading={finishLoading}
        setLoadState={setLoadState}
      />
      <NavBar clickHandler={filterView} addHandler={addTicket} />
      <NewTicketForm
        addHandler={addTicket}
        finishLoading={finishLoading}
        setLoadState={setLoadState}
      />
      <Footer />
      <Loader loadState={loadState} />
    </div>
  );
}

export default App;
