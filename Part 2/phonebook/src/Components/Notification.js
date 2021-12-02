import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const { messageText, type } = message;

  return <div className={type}>{messageText}</div>;
};

export default Notification;
