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
const globalColors = [white, blue, red, yellow, green, orange];
// const globalColors = [teal, lightBlue, turquise, blue, cyan, yale];


// ***************** GLOBAL CUBE SIZES *******************
const space = 3;
const sideSize = 60;
let angle = 1;
const fr = 30;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    cam = createCamera();
    camDist = 600;
    cam.setPosition(0, 0, camDist);
    c1 = new Rubik_Cube();
    r = (width/2) / tan(30/2);
    console.log(r);
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
    frameRate(fr);
}

function draw() {
    ambientLight(200);
    background(100);

    cam.setPosition(-camX, -camY, camZ);
    cam.lookAt(0,0,0);
    rotateX(-17.2);
    rotateY(-11.5);

    rectMode(CENTER);
    c1.drawCube();
    // drawAxes();
}

function drawAxes(){
    push();
    stroke(255, 0, 0);
    line(-500, 0, 0, 500, 0, 0);
    pop();
    push();
    stroke(0, 255, 0);
    line(0, -500, 0, 0, 500, 0);
    pop();
    push();
    stroke(0, 0, 255);
    line(0, 0, -500, 0, 0, 500);
    pop();
}

function mousePressed(){
    // ['left', 'down', 'right', 'top']
    button = mouseButton;
    if (button===LEFT){
        face = c1.checkFace([mouseX, mouseY]);
        if (face !== null){
            c1.rotateFace(face, (key==='Shift' && keyIsPressed));
            // c1.rotateFace('back', (key==='Shift' && keyIsPressed));
            // c1.rotateFace('front', (key==='Shift' && keyIsPressed));
            // c1.rotateFace('left', (key==='Shift' && keyIsPressed));
            // c1.rotateFace('right', (key==='Shift' && keyIsPressed));
            // c1.rotateFace('down', (key==='Shift' && keyIsPressed));
            // c1.rotateFace('top', (key==='Shift' && keyIsPressed));
        }
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

class Cube{

    constructor(size = 60, sides = [], colors = [], defualtColor = darkGrey){
        this.size = size;
        this.sides = {
            'top': defualtColor,
            'down': defualtColor,
            'front': defualtColor,
            'back': defualtColor,
            'right': defualtColor,
            'left': defualtColor
        };

        for (var i = 0; i < sides.length; i++){
            this.sides[sides[i]] = colors[i];
        }

        this.angleX = 0;
        this.angleY = 0;
        this.angleZ = 0;
    }

    drawPlane(color=darkGrey, x=0, y=0, z=0, angleX=0, angleY=0, angleZ=0){
        push();
        ambientMaterial(color);
        rotateX(angleX)
        rotateY(angleY)
        rotateZ(angleZ)
        translate(x, y, z);
        beginShape();
        var s = this.size/2;
        fill(color);
        stroke(darkGrey);
        strokeWeight(3);
        vertex(s, s, 0);
        vertex(s, -s, 0);
        vertex(-s, -s, 0);
        vertex(-s, s, 0);
        endShape(CLOSE);
        // plane(this.size, this.size);
        pop();
    }

    draw(x, y, z){
        push();
        translate(x, y, z);
        rotateX(this.angleX);
        rotateY(this.angleY);
        rotateZ(this.angleZ);
        this.drawPlane(this.sides['front'], 0, 0, this.size/2); // front
        this.drawPlane(this.sides['right'], 0, 0, this.size/2, 0, 90); // right
        this.drawPlane(this.sides['top'], 0, 0, this.size/2, 90, 0); // top
        this.drawPlane(this.sides['back'], 0, 0, -this.size/2); // back
        this.drawPlane(this.sides['left'], 0, 0, -this.size/2, 0, 90); // left
        this.drawPlane(this.sides['down'], 0, 0, -this.size/2, 90, 0); // down
        pop();
    }
}

class Rubik_Cube{

    constructor(size = 60, spacing = 3, colors = globalColors, defualtColor = darkGrey){
        this.colorsBySide = {
            'top': colors[0],
            'down': colors[1],
            'front': colors[2],
            'back': colors[3],
            'right': colors[4],
            'left': colors[5],
            'defualt': defualtColor
        };
        this.faces = {
            'top': [],
            'down': [],
            'front': [],
            'back': [],
            'right': [],
            'left': []
        };

        this.turnByFace = {
            'top': ['left', 'back', 'right', 'front'],
            'down': ['left', 'front', 'right', 'back'],
            'front': ['left', 'down', 'right', 'top'],
            'back': ['left', 'top', 'right', 'down'],
            'right': ['back', 'down', 'front', 'top'],
            'left': ['back', 'top', 'front', 'down']
        }

        this.cubes = [];
        var FBOptions = ['front', 'defualt', 'back'];
        var RLOptions = ['right', 'defualt', 'left'];
        var TDOptions = ['down', 'defualt', 'top'];
        for (var fb of FBOptions){
            for (var td of TDOptions){
                for (var rl of RLOptions){
                    let c = new Cube(size, [td, rl, fb], [this.colorsBySide[td], this.colorsBySide[rl], this.colorsBySide[fb]], defualtColor)
                    this.cubes.push(c);
                    if (fb !== 'defualt'){
                        this.faces[fb].push(c);
                    }
                    if (td !== 'defualt'){
                        this.faces[td].push(c);
                    }
                    if (rl !== 'defualt'){
                        this.faces[rl].push(c);
                    }
                }
            }
        }
        this.poses = [];
        var options = [(size + spacing), 0, -(size+spacing)]
        for (var z = 0; z < 3; z++){
            for (var y = 0; y < 3; y++){
                for (var x = 0; x < 3; x++){
                    this.poses.push([options[x], options[y], options[z]]);
                }
            }
        }
    }

    drawCube(face, otherFaces, cw=true){
        for (var i = 0; i < this.cubes.length; i++) {
            this.cubes[i].draw(this.poses[i][0], this.poses[i][1], this.poses[i][2])
        }
    }

    rotateFace(face, cw=true){
        push();
        console.log(face);
        let otherFaces;
        if (face === 'front' || face === 'back'){
            otherFaces = ['left', 'down', 'right', 'top'];
            if (face === 'front'){
                cw = !cw;
            }
        } else if (face === 'right' || face === 'left'){
            otherFaces = ['top', 'front', 'down', 'back'];
            if (face === 'right'){
                cw = !cw;
            }
        } else if (face === 'top' || face === 'down'){
            otherFaces = ['left', 'front', 'right', 'back'];
            if (face === 'top'){
                cw = !cw;
            }
        }

        let temp = {
            'front': [],
            'back': [],
            'right': [],
            'left': [],
            'top': [],
            'down': []
        }

        for (var i = 0;  i < this.faces[face].length; i++){
            if (i < 3){
                temp[otherFaces[0]].push(this.faces[face][i].sides[otherFaces[1]]);
            } else if (i >= 6 && i < 9){
                temp[otherFaces[2]].push(this.faces[face][i].sides[otherFaces[3]]);
            }
            if (i % 3 === 2){
                temp[otherFaces[3]].push(this.faces[face][i].sides[otherFaces[0]]);
            } else if (i % 3 === 0){
                temp[otherFaces[1]].push(this.faces[face][i].sides[otherFaces[2]]);
            }
        }
        for (var i = 0;  i < this.faces[face].length; i++){
            if (i % 3 === 2){
                let j = 0;
                this.faces[face][i].sides[otherFaces[0]] = temp[cw === true ? otherFaces[0] : otherFaces[2]][j];
                j++;
            } else if (i % 3 === 0){
                let j = 0;
                this.faces[face][i].sides[otherFaces[2]] = temp[cw === true ? otherFaces[2] : otherFaces[0]][j];
                j++;
            }
            if (i < 3){
                let j = 0;
                this.faces[face][i].sides[otherFaces[1]] = temp[cw === true ? otherFaces[1] : otherFaces[3]][j];
                j++;
            } else if (i >= 6 && i < 9){
                let j = 0;
                this.faces[face][i].sides[otherFaces[3]] = temp[cw === true ? otherFaces[3] : otherFaces[1]][j];
                j++;
            }
        }
        pop();
    }

    checkFace(mPos){
        const facePoints = {
            'front': [this.poses[0], this.poses[2], this.poses[8], this.poses[6]],
            'back': [this.poses[0], this.poses[6], this.poses[24], this.poses[18]],
            'right': [this.poses[0], this.poses[2], this.poses[20], this.poses[18]],
            'left': [this.poses[18], this.poses[20], this.poses[26], this.poses[24]],
            'top': [this.poses[2], this.poses[8], this.poses[26], this.poses[20]],
            'down': [this.poses[6], this.poses[8], this.poses[26], this.poses[24]]
        }
        for (let [key, value] of Object.entries(facePoints)) {
            // // let rotation_vec = rotate_vector([-camX, -camY, camZ], camBeta);
            // // let vec = new Matrix(1, 1, rotation_vec)
            // let vec = new Matrix(1, 1, [[-camX], [-camY], [camZ]])
            // let points = [];
            // for (var i = 0; i < 4; i++){
            //     let temp = translate_point(value[i], vec)
            //     points.push(value)
            // }
            if (is_in_face(value, mPos)){
                console.log(key);
                return key;
            }
        }
        return null
    }
}
