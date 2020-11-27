import React, { useContext } from "react";
import Sketch from "react-p5";
// import SocketContext from "./SocketContext";
import { getData } from "./PlayerData";
import { Player } from "./Player";

const P5Sketch = (props) => {
  // const socket = useContext(SocketContext);
  const players = getData().players;
  let me;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
    const myName = getData().me.name;
    const myID = getData().me.id;
    me = new Player(myID, 200, 200, myName);
    console.log(me);

    // const names = players.map((player) => {
    //   return player.name;
    // });
  };

  const draw = (p5) => {
    displayPlayers(p5);

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  const displayPlayers = (p5) => {
    p5.background(0);
    p5.fill(255);
    me.display(p5);
    players.forEach((player) => {
      player.display(p5);
    });
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default P5Sketch;
