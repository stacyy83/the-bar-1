import React, { useEffect } from "react";
import * as p5 from "p5";
import "p5/lib/addons/p5.play";
import Message from "./Message";

const P5Load = () => {
  const Sketch = (p5) => {
    let sprite_sheet;
    let explode_animation;
    p5.preload = () => {
      sprite_sheet = p5.loadSpriteSheet("spritesheet.png", 150, 150, 11);
      explode_animation = p5.loadAnimation(sprite_sheet);
    };
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.draw = () => {
      p5.background(0);
      p5.ellipse(p5.width / 2, p5.height / 2, 10, 10);
      p5.animation(explode_animation, 100, 130);
    };
  };

  useEffect(() => {
    new p5(Sketch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Message />
    </>
  );
};

export { P5Load };
