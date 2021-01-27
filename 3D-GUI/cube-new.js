const angle = 1

class Face{

    constructor(normal, clr){
        this.normal = normal;
        this.color = clr;
        let halfQbSize = globalQbSize/2;
        if(normal.x !== 0){
            this.verticies = [new Vector3D([0, halfQbSize, halfQbSize]),
                              new Vector3D([0, -halfQbSize, halfQbSize]),
                              new Vector3D([0, -halfQbSize, -halfQbSize]),
                              new Vector3D([0, halfQbSize, -halfQbSize])];
        } else if(normal.y !== 0){
            this.verticies = [new Vector3D([halfQbSize, 0, halfQbSize]),
                              new Vector3D([halfQbSize, 0, -halfQbSize]),
                              new Vector3D([-halfQbSize, 0, -halfQbSize]),
                              new Vector3D([-halfQbSize, 0, halfQbSize])];
        } else if(normal.z !== 0){
            this.verticies = [new Vector3D([halfQbSize, halfQbSize, 0]),
                              new Vector3D([halfQbSize, -halfQbSize, 0]),
                              new Vector3D([-halfQbSize, -halfQbSize, 0]),
                              new Vector3D([-halfQbSize, halfQbSize, 0])];
        }

    }

    rotate(rotationMatrix){
        for (var i = 0; i < this.verticies.length; i++) {
            this.verticies[i].mult(rotationMatrix);
        }
        this.normal.mult(rotationMatrix)
    }

    show(){
        push();
        translate((this.normal.x/2)*globalQbSize, (this.normal.y/2)*globalQbSize, (this.normal.z/2)*globalQbSize);
        // scale(size);
        fill(this.color);
        rectMode(CENTER);
        beginShape();
        vertex(this.verticies[0].x, this.verticies[0].y, this.verticies[0].z);
        vertex(this.verticies[1].x, this.verticies[1].y, this.verticies[1].z);
        vertex(this.verticies[2].x, this.verticies[2].y, this.verticies[2].z);
        vertex(this.verticies[3].x, this.verticies[3].y, this.verticies[3].z);
        endShape(CLOSE);
        // square(0, 0, 1);
        pop();
    }
}

class Qb{

    constructor(vec, colors=globalColors){
        this.vec = vec;
        // console.log(this.mat);
        this.faces = [
            new Face(new Vector3D([-1, 0, 0]), colors[0]),
            new Face(new Vector3D([1, 0, 0]), colors[1]),
            new Face(new Vector3D([0, -1, 0]), colors[2]),
            new Face(new Vector3D([0, 1, 0]), colors[3]),
            new Face(new Vector3D([0, 0, -1]), colors[4]),
            new Face(new Vector3D([0, 0, 1]), colors[5])
        ];
    }

    rotate(rotationMat, toLog=false){
        for (let i = 0; i < this.faces.length; i++) {
            if(i==3 && toLog){
                console.table(this.faces[i].normal.vector);
            }
            this.faces[i].rotate(rotationMat);
        }
    }

    show(){
        for (let i = 0; i < this.faces.length; i++) {
            push();
            translate(this.vec.x, this.vec.y, this.vec.z);
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
                    tempColors.push(x == -1 ? colors[1] : shadowClr);
                    tempColors.push(x == 1 ? colors[3] : shadowClr);
                    tempColors.push(y == -1 ? colors[0] : shadowClr);
                    tempColors.push(y == 1 ? colors[5] : shadowClr);
                    tempColors.push(z == -1 ? colors[4] : shadowClr);
                    tempColors.push(z == 1 ? colors[2] : shadowClr);
                    let tempVec = new Vector3D([x*dist ,y*dist, z*dist]);
                    this.qbs.push(new Qb(tempVec, tempColors));
                }
            }
        }
    }

    show(){
        for (let i = 0; i < this.qbs.length; i++) {
            this.qbs[i].show();
        }
    }

    rotate(axis, pole, ccw=false, angle=5){
        let rotationMat;
        let searchCordIndex;
        pole > 0 ? ccw = !ccw : null;
        if(axis === 'x'){
            rotationMat = Rx(angle, ccw);
            searchCordIndex = 0;
        } else if(axis === 'y'){
            rotationMat = Ry(angle, ccw);
            searchCordIndex = 1;
        } else if(axis === 'z') {
            rotationMat = Rz(angle, ccw);
            searchCordIndex = 2;
            // printMatrix(rotationMat);
        }
        for (let i = 0; i < this.qbs.length; i++) {
            if(this.qbs[i].vec.vector[searchCordIndex] * pole > 0){
                this.qbs[i].rotate(rotationMat);
                this.qbs[i].vec.mult(rotationMat);
            }
        }
    }

    dump(){
        for (let i = 0; i < this.qbs.length; i++) {
            console.log(i, this.qbs[i].vec.vector[0], this.qbs[i].vec.vector[1], this.qbs[i].vec.vector[2]);
        }
    }

    round(){
        for(let i = 0; i < this.qbs.length; i++){
            this.qbs[i].vec.round();
        }
    }
}

function printMatrix(mat){
    console.log("MATRIX:");
    mat.matrix.forEach(row => {
           rowStr = "";
           row.forEach(cell => {
                rowStr += ` ${Math.round(cell)}`
                }
           );
           console.log(rowStr);
        }
    );
}
