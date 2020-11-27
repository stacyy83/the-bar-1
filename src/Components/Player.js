class Player {
  //define player properties
  constructor(id, x, y, name) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
    // this.color = p5.color(p5.random(255), p5.random(255), p5.random(255));
  }

  display(p5) {
    p5.rect(this.x, this.y, 30, 30);
    p5.fill(255);
    p5.text(this.name, this.x, this.y - 50);
    p5.textSize(32);
  }
}

export { Player };
