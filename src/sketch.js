let a = 0;

let sponge = [];

class Box {
  constructor(x, y, z, r) {
    this.pos = createVector(x, y, z);
    this.r = r;
  }

  generate() {
    let boxes = [];
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
          let sum = abs(x) + abs(y) + abs(z); 
          let newR = this.r / 3;
          if (sum > 1) {
            let b = new Box(this.pos.x + x * newR, 
                            this.pos.y + y * newR, 
                            this.pos.z + z * newR, 
                            newR);
            boxes.push(b);
          }
        }
      }
    }
    return boxes;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(this.r);
    pop();
  }
}

function setup() {
  createCanvas(400, 400, WEBGL);
  normalMaterial();

  let b = new Box(0, 0, 0, 200);
  sponge.push(b);
}

function mousePressed() {
  let next = [];
  for (let i = 0; i < sponge.length; i++) {
    let newBoxes = sponge[i].generate();
    next = next.concat(newBoxes);
  }
  sponge = next;
}

function draw() {
  background(51);
  // stroke(255);
  // noFill();

  rotateX(a);
  rotateY(a * 0.2);
  rotateZ(a * 0.4);

  for (let i = 0; i < sponge.length; i++) {
    sponge[i].show();
  }

  a+= 0.01;
}
