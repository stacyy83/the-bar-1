import React, { useContext } from "react";
import P5Wrapper from "react-p5-wrapper";
import * as p5 from "p5";
import "p5/lib/addons/p5.play";
import SocketContext from "./SocketContext";
import { getData } from "./PlayerData";
import { Player } from "./Player";
import Message from "./Message";

const P5Wrap = () => {
  const socket = useContext(SocketContext);
  const players = getData().players;
  // put the p5 sketch in the sketch function
  const sketch = (p5) => {
    let me;

    let sprite_sheet;
    let explode_animation;
    p5.preload = () => {
      sprite_sheet = p5.loadSpriteSheet("spritesheet.png", 150, 150, 11);
      explode_animation = p5.loadAnimation(sprite_sheet);
    };

    p5.setup = () => {
      // use parent to render the canvas in this ref
      // (without that p5 will render the canvas outside of your component)
      p5.createCanvas(600, 600);
      console.log(sprite_sheet);
      //initiate myself
      const { name, x, y, destinationX, destinationY, message } = getData().me;
      me = new Player(name, x, y, name, destinationX, destinationY, message);
      console.log(me);
    };

    p5.draw = () => {
      p5.background(0);
      p5.fill(255);
      // animate the sprite sheet
      p5.animation(explode_animation, 100, 130);
      displayMe(p5);
      displayPlayers(p5);

      // NOTE: Do not use setState in the draw function or in functions that are executed
      // in the draw function...
      // please use normal variables or class properties for these purposes
    };

    p5.mousePressed = () => {
      //need to change this to a better way
      // make sure it won't click outside of canvas
      if (
        p5.mouseX > 0 &&
        p5.mouseX < p5.width &&
        p5.mouseY > 0 &&
        p5.mouseY < p5.height
      ) {
        me.destinationX = p5.mouseX;
        me.destinationY = p5.mouseY;
        socket.emit("move", {
          destinationX: me.destinationX,
          destinationY: me.destinationY,
        });
      }

      return false;
    };

    const displayMe = (p5) => {
      me.move(p5);
      me.display(p5);
      me.displayName(p5);
      me.displayMessage(p5);
    };

    const displayPlayers = (p5) => {
      players.forEach((player) => {
        player.move(p5);
        player.display(p5);
        player.displayName(p5);
        player.displayOtherMessage(p5);
      });
    };
  };

  return (
    <div className='sketch-container'>
      {/* Wrap p5 sketch with P5Wrapper */}
      <P5Wrapper sketch={sketch} />
      <Message />
    </div>
  );
};

export default P5Wrap;
