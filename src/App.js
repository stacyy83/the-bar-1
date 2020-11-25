import React, { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import SocketContext from "../src/Components/SocketContext";
import P5Sketch from "../src/Components/P5Sketch";
import Home from "../src/Components/Home";
import { getData } from "../src/Components/PlayerData";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`socket ${socket.id} connected`);
    });

    socket.on("join", (data) => {
      console.log(data);
      getData().players.push(data);
    });
  }, []);
  return (
    <Router>
      <SocketContext.Provider value={socket}>
        <div className='App'>
          <p>Hello World</p>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/newSketch'>
              <P5Sketch />
            </Route>
          </Switch>
        </div>
      </SocketContext.Provider>
    </Router>
  );
}

export default App;
