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
          getData().players.push(new Player(player.id, 200, 200, player.name));
        });
      console.log(getData().players);
    });

    socket.on("join", (data) => {
      console.log(data);
      getData().players.push(new Player(data.id, 200, 200, data.name));
    });

    //when somebody clicks to move, update the destination (not the position)
    // socket.on("playerMoved",
    // function (p) {
    //     try {
    //         //console.log(p.id + " moves to: " + p.destinationX + " " + p.destinationY);

    //         //make sure the player exists
    //         if (players.hasOwnProperty(p.id)) {

    //             players[p.id].destinationX = p.destinationX;
    //             players[p.id].destinationY = p.destinationY;
    //         }
    //     } catch (e) {
    //         console.log("Error on playerMoved");
    //         console.error(e);
    //     }
    // });

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
