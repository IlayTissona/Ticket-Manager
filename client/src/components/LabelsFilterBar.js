import React, { useEffect, useState } from "react";
import axios from "axios";

function LabelsFilterBar({ filtered, labelClickHandler, unFilterHandler }) {
  const [existingLabels, setExistingLabels] = useState([]);

  useEffect(() => {
    axios.get("/api/tickets/allLabels").then((labels) => {
      setExistingLabels(labels.data);
      console.log(labels);
    });
  }, []);

  return (
    <div className="labels-filter-bar">
      <div className="filtered-labels">
        {"Show Only : "}
        {filtered.map((label) => {
          return (
            <button className="label" onClick={() => unFilterHandler(label)}>
              {label}
            </button>
          );
        })}
      </div>
      <div className="option-labels">
        {existingLabels
          .filter((label) => !filtered.includes(label))
          .map((label) => {
            return (
              <button
                className="label"
                onClick={() => labelClickHandler(label)}
              >
                {label}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default LabelsFilterBar;
