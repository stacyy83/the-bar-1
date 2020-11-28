class Player {
  //define player properties
  constructor(id, x, y, name, destinationX, destinationY) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.speed = 50;
    // this.color = p5.color(p5.random(255), p5.random(255), p5.random(255));
  }

  //movement reference: https://github.com/molleindustria/likelike-online/blob/master/public/client.js
  //line 1196
  move(p5) {
    let prevX, prevY;
    if (this.x != null && this.y != null) {
      prevX = this.x;
      prevY = this.y;

      //position and destination are different, move
      if (this.x !== this.destinationX || this.y !== this.destinationY) {
        //a series of vector operations to move toward a point at a linear speed

        // create vectors for position and dest.
        let destination = p5.createVector(this.destinationX, this.destinationY);
        let position = p5.createVector(this.x, this.y);

        // Calculate the distance between your destination and position
        let distance = destination.dist(position);

        // this is where you actually calculate the direction
        // of your target towards your rect. subtraction dx-px, dy-py.
        let delta = destination.sub(position);

        // then you're going to normalize that value
        // (normalize sets the length of the vector to 1)
        delta.normalize();

        // then you can multiply that vector by the desired speed
        let increment = delta.mult((this.speed * p5.deltaTime) / 1000);

        /*
      IMPORTANT
      deltaTime The system variable deltaTime contains the time difference between 
      the beginning of the previous frame and the beginning of the current frame in milliseconds.
      the speed is not based on the client framerate which can be variable but on the actual time that passes
      between frames.
      */

        position.add(increment);
        //update x and y value
        this.x = p5.round(position.x);
        this.y = p5.round(position.y);
      }
    }
  }

  display(p5) {
    p5.rect(this.x, this.y, 30, 30);
    p5.fill(255);
    p5.text(this.name, this.x - 20, this.y - 20);
    p5.textSize(32);
  }
}

export { Player };
