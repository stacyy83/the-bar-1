import React, { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import SocketContext from "../src/Components/SocketContext";
import P5Sketch from "../src/Components/P5Sketch";
import Home from "../src/Components/Home";
import { getData } from "../src/Components/PlayerData";
import { Player } from "../src/Components/Player";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

function App() {
  useEffect(() => {
    // listen to websocket
    socket.on("connect", () => {
      console.log(`socket ${socket.id} connected`);
    });
    // load all the existed player
    socket.on("login", (data) => {
      let myId = data.myId;
      data.players
        .filter((e) => e.id !== myId)
        .forEach((player) => {
          getData().players.push(
            new Player(
              player.id,
              player.x,
              player.y,
              player.name,
              player.destinationX,
              player.destinationY
            )
          );
        });
    });

    socket.on("join", (data) => {
      console.log(data);
      getData().players.push(
        new Player(
          data.id,
          data.x,
          data.x,
          data.name,
          data.destinationX,
          data.destinationY
        )
      );
    });

    socket.on("playerMoved", (data) => {
      // already get the data but won't display
      const index = getData().players.findIndex((e) => e.id === data.id);
      if (index > -1) {
        getData().players[index].destinationX = data.destinationX;
        getData().players[index].destinationY = data.destinationY;
      }
    });

    socket.on("quit", (id) => {
      const index = getData().players.findIndex((e) => e.id === id);

      if (index > -1) {
        getData().players.splice(index, 1);
      }
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
