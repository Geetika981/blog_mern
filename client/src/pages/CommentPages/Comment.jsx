import React from "react";

const Comment = ({ item }) => {
  return (
    <div className="flex gap-6 m-4">
      <img className="w-14 h-14 ml-11 rounded-full" src={item.owner[0].profile} alt={item.owner[0].username} />
      <div className="flex flex-col">
        <h3>@{item.owner[0].username}</h3>
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default Comment;
