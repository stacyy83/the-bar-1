import React, { useContext } from "react";
import Sketch from "react-p5";
import SocketContext from "./SocketContext";
import { getData } from "./PlayerData";

const P5Sketch = (props) => {
  const socket = useContext(SocketContext);

  let x = 50;
  let y = 50;

  let myName = "";

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    p5.fill(255);
    p5.textSize(32);
    p5.text(myName, 100, 100);
    // console.log(getData().players);
    // const players = getData().players;
    // const names = players.map((player) => {
    //   return player.name;
    // });
    // console.log(names);
    // names.forEach((name) => {
    //   p5.text(name, 100, 200);
    // });

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    x++;
  };

  return <Sketch setup={setup} draw={draw} />;
};

// class Player

export default P5Sketch;
