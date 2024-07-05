import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    const res = await fetch(
      `http://localhost:4000/api/v1/comments/blog-comments/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.success === false) {
      return;
    }
    setComments(data.data);
    console.log(data.data);
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <ul>
      {comments.length === 0 && (
        <h1 className="mx-auto ml-28 text-2xl">No Comments Yet....</h1>
      )}
      {comments &&
        comments.map((item, index) => (
          <li className="" key={index}>
            <Comment item={item} />
          </li>
        ))}
    </ul>
  );
};

export default Comments;
