import React, { useEffect, useState, useContext } from "react";
import { getData } from "./PlayerData";
import SocketContext from "./SocketContext";

const Message = () => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    let me = getData().me;
    me.message = message;
    socket.emit("sendMessage", { message: me.message });
    console.log(me.message);
  };

  return (
    <div className='message-container'>
      <input
        type='text'
        placeholder='Say something'
        value={message}
        onChange={handleMessageChange}
        className='text-input-field'
      />
      <button onClick={handleSubmit}>Talk</button>
    </div>
  );
};

export default Message;
