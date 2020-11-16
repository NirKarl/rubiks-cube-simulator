function setup() {
    angleMode(DEGREES);
    createCanvas(windowWidth, windowHeight);
    face = new Face(white, [500, 500]);
    flatten = new Flatten(5);
    projection = new Projected3D(5);
}

function draw() {
    background(backgorund2D);
    // face.draw();
    // flatten.draw();
    projection.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  flatten.updatePos();
}
