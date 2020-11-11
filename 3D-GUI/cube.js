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
const globalSpacing = 3;
const globalQbSize = 60;
let angle = 1

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    cam = createCamera();
    camDist = 600;
    cam.setPosition(0, 0, camDist);
    c1 = new Cube(globalColors, darkGrey, globalQbSize, globalSpacing);
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
    // fill(black);
    // noStroke();
    // box(185);
    // drawAxes();
}


function mousePressed(){
    // ['left', 'down', 'right', 'top']
    button = mouseButton;
    if (button===LEFT){
        // face = c1.checkFace([mouseX, mouseY]);
        // if (face !== null){
        console.log('clicked');
        // c1.rotateFace('right', (key==='Shift' && keyIsPressed));
        // c1.rotateFace('top', (key==='Shift' && keyIsPressed));
        // c1.rotateFace('right', true);
        // c1.rotateFace('top', true);
        // c1.rotateFace('right', false);
        // c1.rotateFace('top', false);
        ROTATE_TOP_CW.apply(c1);
        // c1.rotateFace('back', (key==='Shift' && keyIsPressed));
        // c1.rotateFace('front', (key==='Shift' && keyIsPressed));
        // c1.rotateFace('left', (key==='Shift' && keyIsPressed));
        // c1.rotateFace('right', (key==='Shift' && keyIsPressed));
        // c1.rotateFace('down', (key==='Shift' && keyIsPressed));
        // c1.rotateFace('top', (key==='Shift' && keyIsPressed));
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

class CubeSide{

    constructor(colors, orientation){
        this.orientation = orientation
        this.rows = [[], [], []];
        var colorIndex = 0;
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                this.rows[i][j] = colors[colorIndex];
                colorIndex++;
            }
        }
    }

    getFace(){
        return this.rows;
    }

    getRow(index){
        return this.rows[index];
    }

    /**
     * [getQb description]
     * @param  {[int]} index [0 - 8]
     * @return {[type]}       [description]
     */
    getQb(index){
        console.log(index, floor(index/3), index%3);
        return this.rows[floor(index/3)][index%3];
    }

    /**
     * [setQb description]
     * @param {int} index [0 - 8]
     * @param {[type]} color [description]
     */
    setQb(index, color){
        this.rows[floor(index/3)][index%3] = color;
    }

    setRow(index, row, update=true){
        this.rows[index] = row;
    }

    getCol(index){
        return [this.rows[0][index], this.rows[1][index], this.rows[2][index]];
    }

    setCol(index, col){
        for(var i = 0; i < 3; i++){
            this.rows[i][index] = col[i]
        }
    }

    getOrientation(){
        return this.orientation;
    }
}

class Cube{
    constructor(colors, defualtColor, qbSize, spacing){
        this.colors = colors;
        this.defualtColor = defualtColor;
        this.qbSize = qbSize;
        this.spacing = spacing;
        this.size = this.qbSize + this.spacing;
        this.facesOrder = ["top", "right", "front", "down", "left", "back"];
        this.faces = {};

        var tempOrientations = [[90, 0, 0], [0, 90, 0], [0, 0, 0]];
        for(var i = 0; i < this.facesOrder.length; i++){
            var tempColors = [];
            for(var j = 0; j < 9; j++){
                tempColors.push(colors[i])
            }
            this.faces[this.facesOrder[i]] = new CubeSide(tempColors, tempOrientations[i%3]);
        }

        // this.faces['right'].setRow(0, [teal, blue, blue]);
        // this.faces['front'].setRow(0, [red, red, brown]);
        // this.faces['top'].setRow(2, [white, white, grey]);
        // this.faces['left'].setRow(0, [fuchsia, green, green]);
    }

    drawPlane(color, face, row, col){
        push();
        // ambientMaterial(color);
        var orientation = this.faces[face].getOrientation();
        rotateX(orientation[0]);
        rotateY(orientation[1]);
        rotateZ(orientation[2]);
        if(face == 'top' || face == 'right' || face == 'front'){
            translate((col-1)*this.size, (row-1)*this.size, this.size+(this.qbSize)/2);
        } else {
            translate((col-1)*this.size, (row-1)*this.size, -(this.size+(this.qbSize)/2));
        }
        beginShape();
        var s = this.qbSize/2;
        fill(color);
        // stroke(darkGrey);
        // strokeWeight(3);
        vertex(s, s, 0);
        vertex(s, -s, 0);
        vertex(-s, -s, 0);
        vertex(-s, s, 0);
        endShape(CLOSE);
        pop();
    }

    drawCube(){
        push();
        for(var i = 0; i < this.facesOrder.length; i++){
            for(var row = 0; row < 3; row++){
                for(var col = 0; col < 3; col++){
                    if(this.facesOrder[i] == 'down' || this.facesOrder[i] == 'left' || this.facesOrder[i] == 'back'){
                        this.drawPlane(this.faces[this.facesOrder[i]].getFace()[row][2-col], this.facesOrder[i], row, col);
                    } else{
                        this.drawPlane(this.faces[this.facesOrder[i]].getFace()[row][col], this.facesOrder[i], row, col);
                    }

                }
            }
        }
        beginShape();
        fill(darkGrey);
        vertex(186/2, 186/2, 186/2-this.qbSize);
        vertex(186/2, -186/2, 186/2-this.qbSize);
        vertex(-186/2, -186/2, 186/2-this.qbSize);
        vertex(-186/2, 186/2, 186/2-this.qbSize);
        endShape(CLOSE);
        beginShape();
        fill(darkGrey);
        vertex(186/2, 186/2, 186/2-this.qbSize-this.spacing);
        vertex(186/2, -186/2, 186/2-this.qbSize-this.spacing);
        vertex(-186/2, -186/2, 186/2-this.qbSize-this.spacing);
        vertex(-186/2, 186/2, 186/2-this.qbSize-this.spacing);
        endShape(CLOSE);
        pop();
    }

    selfRotateFace(face, ccw){
        var tempRow0 = this.faces[face].getRow(0);
        var tempRow2 = this.faces[face].getRow(2);
        var tempCol0 = this.faces[face].getCol(0);
        var tempCol2 = this.faces[face].getCol(2);
        if(!ccw){
            this.faces[face].setRow(0, tempCol0.reverse());
            this.faces[face].setCol(0, tempRow2);
            this.faces[face].setRow(2, tempCol2.reverse());
            this.faces[face].setCol(2, tempRow0);
        }
    }

    rotateFace(face, ccw){
        if(face == 'top' && !ccw){
            var temp = this.faces['front'].getRow(0);
            this.faces['front'].setRow(0, this.faces['right'].getRow(0));
            this.faces['right'].setRow(0, this.faces['back'].getRow(0));
            this.faces['back'].setRow(0, this.faces['left'].getRow(0));
            this.faces['left'].setRow(0, temp);
            this.selfRotateFace(face, ccw);

        }

    }

    /**
     * [getQb description]
     * @param  {[int]} index [0 - 53]
     * @return {[type]}       [description]
     */
    getQb(index){
        // console.log(index, floor(index/9), index%9)
        return this.faces[this.facesOrder[floor(index/9)]].getQb(index%9);
    }

    /**
     * [setQb description]
     * @param {int} index [0 - 53]
     * @param {[type]} color [description]
     */
    setQb(index, color){
        this.faces[this.facesOrder[floor(index/9)]].setQb(index%9, color);
    }
}

class Tranformation{

    constructor(locations){
        this.locs = locations;
        console.log(this.locs);
    }

    // this.facesOrder = ["top", "right", "front", "down", "left", "back"];
    apply(cube){
        var tempCube = new Array(54);
        for(var i = 0; i < this.locs.length; i++){
            tempCube[i] = cube.getQb(i);
        }

        console.log(tempCube);

        for(var i = 0; i < this.locs.length; i++){
            cube.setQb(i, tempCube[this.locs[i]]);
        }

    }

    multiply(transformation){
        var result = new Array(54);
        for(var i = 0; i < this.locs.length; i++){
            result[i] = transformation[this.locs[i]];
        }
    }
}

const ROTATE_TOP_CW = new Tranformation([ 6,  3,  0,  7,  4,  1,  8,  5,  2,
                                         45, 46, 47, 12, 13, 14, 15, 16, 17,
                                          9, 10, 11, 21, 22, 23, 24, 25, 26,
                                         27, 28, 29, 30, 31, 32, 33, 34, 35,
                                         18, 19, 20, 39, 40, 41, 42, 43, 44,
                                         36, 37, 38, 48, 49, 50, 51, 52, 53]);

const ROTATE_X_CW = new Tranformation([
                                  ]);
