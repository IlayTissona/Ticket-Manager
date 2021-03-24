import React from "react";

function LabelsFilterBar({ filtered, labelClickHandler, unFilterHAndler }) {
  return (
    <div className="labels-filter-bar">
      <div className="filtered-labels">
        {filtered.length && "Show Only : "}
        {filtered.map((label) => {
          return (
            <button className="label" onClick={() => unFilterHAndler(label)}>
              {label}
            </button>
          );
        })}
      </div>
      <div className="option-labels">
        {filtered.map((label) => {
          return (
            <button className="label" onClick={() => unFilterHAndler(label)}>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LabelsFilterBar;
