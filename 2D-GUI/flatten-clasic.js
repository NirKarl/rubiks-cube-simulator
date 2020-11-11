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
const globalTileSize = 60;
let angle = 1

function setup() {
    createCanvas(windowWidth, windowHeight);
    tile1 = new Tile([50, 50], white);
}

function draw() {
    background(100);
    tile1.drawTile();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Tile{
    constructor(position, color, size=globalTileSize){
        this.size = size;
        this.pos = position;
        this.color = color;
    }

    drawTile(){
        fill(this.color);
        rect(this.pos[0], this.pos[1], this.size, this.size);
    }
}

class Face{
    constructor(colors, position, spacing = globalSpacing){
        this.pos = position;
        this.spacing = spacing;
        this.tiles = new Array(3, 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                pos = [this.pos[0] + i * globalTileSize + (i%3) * this.spacing, this.pos[1] + j * globalTileSize + (j%3) * this.spacing];
                this.tiles[i] = new Tile(colors[i * (j%3)]) //wrong color assingment
            }
        }
    }

    drawFace(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.tiles[i*(j%3)]
            }
        }
    }
}

class Flatten{

}
