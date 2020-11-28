import React, { useContext } from "react";
import Sketch from "react-p5";
import SocketContext from "./SocketContext";
import { getData } from "./PlayerData";
import { Player } from "./Player";

const P5Sketch = (props) => {
  const socket = useContext(SocketContext);
  const players = getData().players;
  let me;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
    //initiate myself
    const { name, x, y, destinationX, destinationY } = getData().me;
    me = new Player(name, x, y, name, destinationX, destinationY);
    console.log(me);
  };

  const draw = (p5) => {
    displayPlayers(p5);

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
  };

  const mousePressed = (p5) => {
    //need to change this to a better way
    me.destinationX = p5.mouseX;
    me.destinationY = p5.mouseY;
    socket.emit("move", {
      destinationX: me.destinationX,
      destinationY: me.destinationY,
    });
    return false;
  };

  const displayPlayers = (p5) => {
    p5.background(0);
    p5.fill(255);
    // move(me, p5);
    console.log(players);
    me.move(p5);
    me.display(p5);
    players.forEach((player) => {
      player.move(p5);
      player.display(p5);
    });
  };

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
};

export default P5Sketch;
