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
};

function App() {
  const [showFilters, setFilters] = useState(showAll);
  const [loadState, setLoadState] = useState(false);
  const [loadFinished, setLoadFinished] = useState(false);

  const showLoader = () => {};

  const filterView = (filterParam) => {
    const newShowState = Object.assign({}, showAll);
    if (filterParam) newShowState[filterParam] = true;
    setFilters(newShowState);
  };

  return (
    <div className="App">
      <SideMenu clickHandler={filterView} />
      <TicketList filters={showFilters} />
      <Footer loadState={loadState} loadFinish={loadFinished} />
    </div>
  );
}

export default App;
