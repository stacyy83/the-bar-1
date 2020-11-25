import React, { useContext, useState } from "react";
import SocketContext from "./SocketContext";
import { Link } from "react-router-dom";

const Home = () => {
  const socket = useContext(SocketContext);
  const [userName, setUserName] = useState("");

  const handNameChange = (event) => {
    setUserName(event.target.value);
  };
  //Emit the username to socket
  const handleSubmit = (event) => {
    // socket.emit("join", userName);
    socket.emit("join", { id: socket.id, name: userName });
  };

  return (
    <div className='home-container'>
      {/* Enter the name and submit it to socket */}
      <input
        type='text'
        placeholder='Your Name'
        value={userName}
        onChange={handNameChange}
        className='text-input-field'
      />
      <Link to='/newSketch'>
        <button onClick={handleSubmit}>Join</button>
      </Link>
    </div>
  );
};

export default Home;
