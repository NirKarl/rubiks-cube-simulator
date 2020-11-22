const yzAngle = 120;
const xyAngle = 120;

function posSideOfLine(mpos, poses){
    console.log(mpos)
    let pos1 = poses[0];
    let pos2 = poses[1];
    if((pos1[0] - pos2[0]) === 0){
        if (pos1[0] < mpos[0]){
            // console.log(pos1[0], mpos[0]);
            return 1;
        } else if(pos1[0] === mpos[0]){
            return 0;
        }
        return -1
    }
    let m = (pos1[1] - pos2[1]) / (pos1[0] - pos2[0]);
    let b = pos1[1] - (m * pos1[0]);
    let y = m * mpos[0] + b;
    // console.log("m:", m, "b:", b, "y:", y, "mpos:", mpos);
    if (y > mpos[1]){
        return 1;
    } else if( y === mpos[1]){
        return 0;
    }
    return -1
}

function projectYZPlane(point, length){
    let x = point[0];
    let y = point[1];
    let points = [];
    let point2 = [(x + length*cos(90-yzAngle)), (y + length*sin(90-yzAngle))];
    console.log(point2[0]-x, point2[1]-y);
    let point3 = [point2[0], point2[1] + length];
    let point4 = [point[0], point[1] + length];
    points = [point, point2, point3, point4];
    return points
}

function projectXYPlane(point, length){
    let x = point[0];
    let y = point[1];
    let points = [];
    let point2 = [(x - length*cos(90-xyAngle)), (y + length*sin(90-xyAngle))];
    let point3 = [point2[0], point2[1] + length];
    let point4 = [point[0], point[1] + length];
    points = [point, point2, point3, point4];
    return points
}

function projectXZPlane(point, length){
    let x = point[0];
    let y = point[1];
    let points = [];
    let point2 = [(x + length*cos(90-yzAngle)), (y + length*sin(90-yzAngle))];
    let point3 = [(point2[0] - length*sin(xyAngle)), (point2[1] + length*cos(xyAngle))];
    let point4 = [(x - length*sin(xyAngle)), (y + length*cos(xyAngle))];
    points = [point, point2, point3, point4];
    return points
}

class ProjectedTile{
    constructor(color, plane, point){
        this.color = color
        if(plane === "YZ"){
            this.verticies = projectYZPlane(point, globalTileSize);
        } else if(plane === "XY"){
            this.verticies = projectXYPlane(point, globalTileSize);
        } else if(plane === "XZ"){
            this.verticies = projectXZPlane(point, globalTileSize);
        }
    }

    draw(){
        fill(this.color);
        strokeWeight(3);
        stroke(black);
        strokeCap(ROUND);
        strokeJoin(ROUND);
        push();
        rectMode(CENTER);
        beginShape();
        vertex(this.verticies[0][0], this.verticies[0][1]);
        vertex(this.verticies[1][0], this.verticies[1][1]);
        vertex(this.verticies[2][0], this.verticies[2][1]);
        vertex(this.verticies[3][0], this.verticies[3][1]);
        endShape(CLOSE);
        pop();
    }

    isInRect(mpos){
        let pair1 = 1;
        let pair2 = 1;
        for (let i = 0; i < this.verticies.length; i++) {
            let side = posSideOfLine(mpos, [this.verticies[i], this.verticies[(i+1)%this.verticies.length]]);
            if(i%2 === 0){
                pair1 *= side
            } else{
                pair2 *= side
            }
            // console.log(i, side);
            // console.log(mpos, [this.verticies[i], this.verticies[(i+1)%this.verticies.length]]);
        }
        console.log(mpos, this.verticies)
        let finelSide = pair1 < 0 && pair2 < 0;
        console.log("finel side", finelSide);
        return finelSide;
    }
}

class YZFace{
    constructor(color, pos){
        this.tiles = [];
        let prevPos = pos;
        for(let i = 0; i < 3; i++){
            this.tiles.push([])
            for(let j = 0; j < 3; j++){
                this.tiles[i].push(new ProjectedTile(color, "YZ", [prevPos[0], prevPos[1] + j*globalTileSize]))
            }
            prevPos = this.tiles[i][0].verticies[1];
        }
    }

    draw(){
        for(let i = 0; i < 3; i++){
            this.tiles.push([])
            for(let j = 0; j < 3; j++){
                this.tiles[i][j].draw()
            }
        }
    }
}

class XYFace{
    constructor(color, pos){
        this.tiles = [];
        let prevPos = pos;
        for(let i = 0; i < 3; i++){
            this.tiles.push([])
            for(let j = 0; j < 3; j++){
                this.tiles[i].push(new ProjectedTile(color, "XY", [prevPos[0], prevPos[1] + j*globalTileSize]))
            }
            prevPos = this.tiles[i][0].verticies[1];
        }
    }

    draw(){
        for(let i = 0; i < 3; i++){
            this.tiles.push([])
            for(let j = 0; j < 3; j++){
                this.tiles[i][j].draw()
            }
        }
    }
}

class XZFace{
    constructor(color, pos){
        this.tiles = [];
        let prevPos = pos;
        for(let i = 0; i < 3; i++){
            this.tiles.push([])
            for(let j = 0; j < 3; j++){
                this.tiles[i].push(new ProjectedTile(color, "XZ", [prevPos[0] - j*globalTileSize*sin(xyAngle), prevPos[1] + j*globalTileSize*cos(xyAngle)]))
            }
            prevPos = this.tiles[i][0].verticies[1];
        }
    }

    draw(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                this.tiles[i][j].draw()
            }
        }
    }
}

class Projected3D{
    constructor(state){
        let origin = [windowWidth/2, windowHeight/2 - windowHeight/5];
        let offset = 7*globalTileSize;
        this.faces = [
            new YZFace(softRed, origin),
            new XYFace(softGreen, origin),
            new XZFace(white, origin),
            new YZFace(softOrange, [origin[0] - offset*sin(xyAngle), origin[1] + offset*cos(xyAngle)]),
            new XYFace(softBlue, [origin[0] + offset*sin(yzAngle), origin[1] + offset*cos(yzAngle)]),
            new XZFace(softYellow, [origin[0], origin[1] + offset])
        ];
    }

    draw(){
        for(let i = 0; i < 6; i++){
                this.faces[i].draw()
            }
    }
}
