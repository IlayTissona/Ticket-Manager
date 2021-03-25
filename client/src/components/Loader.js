import React from "react";

function Loader({ loadState }) {
  let className;
  switch (loadState) {
    case "pending":
      className = loadState;
      break;
    case "success":
      className = loadState;
      break;
    default:
      className = "error";
  }
  return (
    <div id="loader" hidden={!loadState} className={className}>
      {loadState === "pending"
        ? "Loading ..."
        : loadState === "success"
        ? "Updated Successfully"
        : "Could not update, " + loadState}
    </div>
  );
}

export default Loader;
