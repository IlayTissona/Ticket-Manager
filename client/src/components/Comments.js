import React, { useState } from "react";
import axios from "axios";

function Comments({ commentList, show, loaderFunctions, ticketId }) {
  const { setLoadState, finishLoading } = loaderFunctions;
  const handleFormSubmit = (e) => {
    setLoadState("pending");
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    axios
      .post("/api/tickets/new-comment/" + ticketId, data)
      .then((res) => {
        finishLoading("success");
        commentList.push(data);
      })
      .catch((e) => {
        finishLoading("Error: " + e);
      });
  };

  return (
    <div className="comment-bar" hidden={!show}>
      <span className="comments-counter">{commentList.length} Comments</span>
      <ul className="comments">
        {commentList?.map((comment) => {
          return (
            <li className="comment">
              <div className="comment-text">{comment.text}</div>
            </li>
          );
        })}
        {commentList.length ? (
          ""
        ) : (
          <li className="comment">
            <div className="comment-text">
              {"Be The First to leave a comment..."}
            </div>
          </li>
        )}
      </ul>
      <form className="new-comment-form" onSubmit={handleFormSubmit}>
        <input
          className="new-comment-text"
          name="text"
          type="text"
          placeholder="New Comment..."
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Comments;
