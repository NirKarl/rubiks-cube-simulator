function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    cam = createCamera();
    camDist = 600;
    mX = 0;
    mY = 0;
    mAlpha = 0;
    mBeta = 0;
    mPressed = false;
    camAlpha = 62;
    camBeta = 31;
    camX = camDist*sin(camAlpha)*cos(camBeta);
    camY = camDist*sin(camBeta);
    camZ = camDist*cos(camAlpha)*cos(camBeta);
    cam.setPosition(-camX, -camY, camZ);
    cube = new Cube(globalColors, darkGrey);
    rotationSteps = 0;
    frameRate(60)
    dir = false
}

function draw() {
    ambientLight(200);
    background(backgorund3D);

    // cam.setPosition(-camX, -camY, camZ);
    // cam.lookAt(0,0,0);
    up = (camBeta%360>90 && camBeta%360<270?-1:1);
    cam.camera(-camX, -camY, camZ, 0, 0, 0, 0, up, 0);


    rectMode(CENTER);

    // drawAxes();

    push();;
    cube.show();
    pop();

    cubeAnimatedRotation();
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

// ---------- 90 deg jumps -----------
// function keyPressed(){
//     if (keyCode === 70){
//         cube.rotate('x', -1, (key==='Shift' && keyIsPressed), 90);
//     } else if (keyCode === 66){
//         cube.rotate('x', 1, (key==='Shift' && keyIsPressed), 90);
//     } else if (keyCode === 84){
//         cube.rotate('y', -1, (key==='Shift' && keyIsPressed), 90);
//     } else if (keyCode === 68){
//         cube.rotate('y', 1, (key==='Shift' && keyIsPressed), 90);
//     } else if (keyCode === 82){
//         cube.rotate('z', 1, (key==='Shift' && keyIsPressed), 90);
//     } else if (keyCode === 76){
//         cube.rotate('z', -1, (key==='Shift' && keyIsPressed), 90);
//     }
// }

// ---------- Animated -----------
function keyPressed(){
    if(key==='Shift'){
        dir = true
    }
    if(!cubeAnimationIsActive()){
        if (keyCode === 70){
            initCubeAnimation('x', -1, dir, 90);
        } else if (keyCode === 66){
            initCubeAnimation('x', 1, dir, 90);
        } else if (keyCode === 84){
            initCubeAnimation('y', -1, dir, 90);
        } else if (keyCode === 68){
            initCubeAnimation('y', 1, dir, 90);
        } else if (keyCode === 82){
            initCubeAnimation('z', 1, dir, 90);
        } else if (keyCode === 76){
            initCubeAnimation('z', -1, dir, 90);
        } else if (keyCode === 88){
            cube.dump();
        }
    }
}

function keyReleased(){
    if(key==='Shift'){
        dir = false
    }
}

// function mousePressed(){
//     // ['left', 'down', 'right', 'top']
//     button = mouseButton;
//     if (button===LEFT){
//         // face = c1.checkFace([mouseX, mouseY]);
//         // if (face !== null){
//         console.log('clicked');
//         // cube.rotate_top((key==='Shift' && keyIsPressed));
//         // cube.rotate_right((key==='Shift' && keyIsPressed));
//         // cube.rotate_front((key==='Shift' && keyIsPressed));
//         cube.rotate('z', 1, (key==='Shift' && keyIsPressed));
//     // }
//     }
// }

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

let cubeAnimatedRotationState = 0;
let rotationAxis = 'x'
let rotationLayer = 1
let rotationDir = true
let degPerFrame = 2


function initCubeAnimation(axis, layer, cw){
    cubeAnimatedRotationState = 10;
    degPerFrame = 90/cubeAnimatedRotationState
    rotationAxis = axis
    rotationLayer = layer
    rotationDir = cw
}

function cubeAnimatedRotation(){
    if(cubeAnimatedRotationState == 0){
        return;
    }
    cube.rotate(rotationAxis, rotationLayer, rotationDir, degPerFrame);
    cubeAnimatedRotationState--;
    if(cubeAnimatedRotationState == 0){
        cube.round();
        console.log("round has gone rounder");
    }
}

function cubeAnimationIsActive(){
    return cubeAnimatedRotationState > 0;
}
