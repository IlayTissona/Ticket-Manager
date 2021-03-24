import React from "react";

function Loader({ loadState }) {
  return (
    <div
      id="loader"
      hidden={!loadState}
      className={loadState === "success" ? "success" : "error"}
    >
      {loadState === "pending"
        ? "Loading ..."
        : loadState === "success"
        ? "Updated Successfully"
        : "Could not update, " + loadState}
    </div>
  );
}

export default Loader;
