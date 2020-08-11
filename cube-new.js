// ********** COLORS **************
const blue = [0, 0, 200];
const red = [200, 0, 0];
const green = [0, 200, 0];
const yellow = [255, 255, 0];
const orange = [255, 80, 25];
const white = [200, 200, 200];
const darkGrey = [55, 55, 55];
const purple = [200, 55, 200];
const grey = [85, 85, 85];
const black = [0, 0, 0];
const brown = [101, 67, 33];
const teal = [1, 128, 129];
const cyan = [1, 255, 255];
const turquise = [0, 225, 205];
const lightBlue = [0 , 96, 255];
const yale = [14, 77, 146];
const fuchsia = [79, 17, 57];
const globalColors = [orange, red, white, yellow, blue, green];
// const globalColors = [teal, lightBlue, turquise, blue, cyan, yale];


// ***************** GLOBAL CUBE SIZES *******************
const globalSpacing = 3;
const globalQbSize = 60;
let angle = 1

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    cam = createCamera();
    camDist = 600;
    cam.setPosition(0, 0, camDist);
    // c1 = new Cube(globalColors, darkGrey, globalQbSize, globalSpacing);
    r = (width/2) / tan(30/2);
    // console.log(r);
    camX = 0;
    camY = 0;
    camZ = 600;
    mX = 0;
    mY = 0;
    mAlpha = 0;
    mBeta = 0;
    mPressed = false;
    camAlpha = -17.2;
    camBeta = -11.5;
    let v1 = new Vector(3, [1, 0, 0]);
    f = new Face(v1, red)
    qb1 = new Qb(new Matrix(3,3,[[0,0,0],[0,0,0],[0,0,0]]), globalColors);
    cube = new Cube(globalColors, darkGrey);

}

function draw() {
    ambientLight(200);
    background(100);

    cam.setPosition(-camX, -camY, camZ);
    cam.lookAt(0,0,0);
    rotateX(-17.2);
    rotateY(-11.5);

    rectMode(CENTER);

    // c1.drawCube();
    drawAxes();
    // f.show();
    push();;
    cube.show();
    // qb1.show();
    pop();

}

function drawAxes(){

    let len = 200;

    // ----------- X Axis RED -----------
    push();
    stroke(red);
    line(-len, 0, 0, len, 0, 0);
    translate(len, 0, 0);
    rotateZ(-90);
    noStroke();
    fill(red)
    cone(3, 10);
    pop();

    // ----------- Y Axis GREEN -----------
    push();
    stroke(green);
    line(0, -len, 0, 0, len, 0);
    translate(0, len, 0);
    noStroke();
    fill(green)
    cone(3, 10);
    pop();

    // ----------- Z Axis BLUE -----------
    push();
    stroke(blue);
    line(0, 0, -len, 0, 0, len);
    translate(0, 0, len);
    rotateX(90);
    noStroke();
    fill(blue)
    cone(3, 10);
    pop();
}


function mousePressed(){
    // ['left', 'down', 'right', 'top']
    button = mouseButton;
    if (button===LEFT){
        // face = c1.checkFace([mouseX, mouseY]);
        // if (face !== null){
        console.log('clicked');
        cube.rotate_top();
        // c1.rotateFace('top', (key==='Shift' && keyIsPressed));
        // ROTATE_TOP_CW.apply(c1);
    // }
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged(){
    button = mouseButton;
    if (button===CENTER){
        if (mPressed === false){
            mX = mouseX;
            my = mouseY;
            mAlpha = camAlpha;
            mBeta = camBeta;
            mPressed = true;
        } else{
            camAlpha = mAlpha + (mouseX - mX)*(360/windowWidth)
            camBeta = mBeta + (mouseY - mY)*(180/windowHeight)
            camX = camDist*sin(camAlpha)*cos(camBeta);
            camY = camDist*sin(camBeta);
            camZ = camDist*cos(camAlpha)*cos(camBeta);
        }
    }
}

function mouseReleased(){
    mPressed = false;
}

function mouseMoved(){
    mX = mouseX;
    mY = mouseY;
}

var size = 60;

class Face{

    constructor(normal, clr){
        this.normal = normal;
        this.color = clr;
    }

    show(){
        push();
        translate((this.normal.x/2)*globalQbSize, (this.normal.y/2)*globalQbSize, (this.normal.z/2)*globalQbSize);
        rotateY(90*this.normal.x);
        rotateX(90*this.normal.y);
        scale(size);
        fill(this.color);
        rectMode(CENTER);
        square(0, 0, 1);
        pop();
    }
}

class Qb{

    constructor(mat, colors=globalColors){
        this.mat = mat;
        // console.log(this.mat);
        this.faces = [
            new Face(new Vector(1, [-1, 0, 0]), colors[0]),
            new Face(new Vector(1, [1, 0, 0]), colors[1]),
            new Face(new Vector(1, [0, -1, 0]), colors[2]),
            new Face(new Vector(1, [0, 1, 0]), colors[3]),
            new Face(new Vector(1, [0, 0, -1]), colors[4]),
            new Face(new Vector(1, [0, 0, 1]), colors[5])
        ];

        this.rotatey = false;
    }

    get xyz(){
        let x = 0;
        let y = 0;
        let z = 0;
        for (let i = 0; i < 3; i++) {
            x += this.mat.matrix[0][i];
            y += this.mat.matrix[1][i];
            z += this.mat.matrix[2][i];
        }
        return [x, y, z]
    }

    show(){
        for (let i = 0; i < this.faces.length; i++) {
            push();
            let trans = this.xyz;
            translate(trans[0], trans[1], trans[2]);
            this.faces[i].show();
            pop();
        }
    }
}

class Cube{
    constructor(colors=globalColors, shadowClr=darkGrey){
        this.qbs = [];
        let dist = globalQbSize + globalSpacing;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    let tempColors = [];
                    tempColors.push(x == -1 ? colors[0] : shadowClr);
                    tempColors.push(x == 1 ? colors[1] : shadowClr);
                    tempColors.push(y == -1 ? colors[2] : shadowClr);
                    tempColors.push(y == 1 ? colors[3] : shadowClr);
                    tempColors.push(z == -1 ? colors[4] : shadowClr);
                    tempColors.push(z == 1 ? colors[5] : shadowClr);
                    let tempMat = new Matrix(3, 3, [[x*dist,0,0],[0,y*dist,0],[0,0,z*dist]]);
                    this.qbs.push(new Qb(tempMat, tempColors));
                }
            }
        }
    }

    show(){
        for (let i = 0; i < this.qbs.length; i++) {
            this.qbs[i].show();
        }
    }

    rotate_top(){
        for (let i = 0; i < this.qbs.length; i++) {
            if(this.qbs[i].mat.matrix[1][1] < 0){
                this.qbs[i].mat.matrix = this.qbs[i].mat.mult(Ry().matrix);
            }
        }
    }
}
