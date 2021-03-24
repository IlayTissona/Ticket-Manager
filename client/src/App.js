import "./App.css";
import TicketList from "./components/TicketList";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";
import { useState } from "react";

const showAll = {
  starred: false,
  done: false,
  undone: false,
  hidden: false,
  newId: false,
};

function App() {
  const [showFilters, setFilters] = useState(showAll);

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
      <SideMenu clickHandler={filterView} addHandler={addTicket} />
      <TicketList filters={showFilters} />
      <Footer />
    </div>
  );
}

export default App;
