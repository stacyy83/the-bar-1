function move(p, p5) {
  let prevX, prevY;
  if (p.x != null && p.y != null) {
    prevX = p.x;
    prevY = p.y;

    //position and destination are different, move
    if (p.x !== p.destinationX || p.y !== p.destinationY) {
      //a series of vector operations to move toward a point at a linear speed

      // create vectors for position and dest.
      let destination = p5.createVector(p.destinationX, p.destinationY);

      let position = p5.createVector(p.x, p.y);

      // Calculate the distance between your destination and position
      let distance = destination.dist(position);

      // this is where you actually calculate the direction
      // of your target towards your rect. subtraction dx-px, dy-py.
      //   let delta = destination.sub(p.pos);
      destination.sub(position);

      // then you're going to normalize that value
      // (normalize sets the length of the vector to 1)
      destination.normalize();

      // then you can multiply that vector by the desired speed
      let increment = destination.mult((p.speed * p5.deltaTime) / 10);

      /*
      IMPORTANT
      deltaTime The system variable deltaTime contains the time difference between 
      the beginning of the previous frame and the beginning of the current frame in milliseconds.
      the speed is not based on the client framerate which can be variable but on the actual time that passes
      between frames.
      */
      console.log(increment);
      position.add(increment);
      //   console.log(p.pos);
      p.x = position.x;
      p.y = position.y;
    }
  }
}

export { move };
