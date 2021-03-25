import React, { useState } from "react";

function Comments({ commentList, show }) {
  const [commentsHidden, setCommentsHidden] = useState(true);
  return (
    <div className="comment-bar" hidden={!show}>
      <ul className="comments">
        {commentList.map((comment) => {
          return (
            <li className="comment">
              <div className="comment-text">{comment.text}</div>
              <button className="like-button">
                {comment.likes}
                {/* add IMG!!!!!!!!!!!!!!!!!! */}
              </button>
            </li>
          );
        })}
      </ul>
      <form className="new-comment-form">
        <input className="new-comment-text" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Comments;
