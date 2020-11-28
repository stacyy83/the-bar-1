import React, { useContext, useState } from "react";
import SocketContext from "./SocketContext";
import { Link } from "react-router-dom";
import { getData } from "./PlayerData";

const Home = () => {
  const socket = useContext(SocketContext);
  const [userName, setUserName] = useState("");

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  //Emit the username to socket
  const handleSubmit = (event) => {
    let me = getData().me;
    me.name = userName;
    me.id = socket.id;
    me.x = 200;
    me.y = 200;
    me.destinationX = me.x;
    me.destinationY = me.y;
    me.room = "frontDoor";
    socket.emit("join", {
      id: me.id,
      name: me.name,
      x: me.x,
      y: me.y,
      destinationX: me.destinationX,
      destinationY: me.destinationY,
      room: me.room,
    });
  };

  return (
    <div className='home-container'>
      {/* Enter the name and submit it to socket */}
      <input
        type='text'
        placeholder='Your Name'
        value={userName}
        onChange={handleNameChange}
        className='text-input-field'
      />
      <Link to='/newSketch'>
        <button onClick={handleSubmit}>Join</button>
      </Link>
    </div>
  );
};

export default Home;
