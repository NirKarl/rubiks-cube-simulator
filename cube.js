class qb{
    constructor(size){
        this.size = size;
    }

    drawPlane(color, position, orientation){
        push();
        ambientMaterial(color);
        rotateX(orientation[0]);
        rotateY(orientation[1]);
        rotateZ(orientation[2]);
        translate(position[0], position[1], position[2]);
        plane(this.size, this.size);
        pop();
    }

    drawQb(defualtColor, colors, position, cubePosition){
        push();
        translate(position[0], position[1], position[2]);
        rotateX(orientation[0]);
        rotateY(orientation[1]);
        rotateZ(orientation[2]);
        noStroke();
        colorIndex = 0
        for(var i = 0; i < 6; i++){
            this.drawPlane(this.sides['front'], 0, 0, this.size/2); // front
            this.drawPlane(this.sides['right'], 0, 0, this.size/2, 0, 90); // right
            this.drawPlane(this.sides['top'], 0, 0, this.size/2, 90, 0); // top
            this.drawPlane(this.sides['back'], 0, 0, -this.size/2); // back
            this.drawPlane(this.sides['left'], 0, 0, -this.size/2, 0, 90); // left
            this.drawPlane(this.sides['down'], 0, 0, -this.size/2, 90, 0); // down
        }
        pop();
    }
}

class cubeSide{
    constructor(colors){
        this.rows = {[], [], []};
        this.cols = {[], [], []};
        colorIndex = 0;
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                rows[i][j] = color[colorIndex];
                cols[j][i] = color[colorIndex];
            }
        }
    }

    getFace(){
        return this.rows;
    }

    getRow(index){
        return this.rows[index];
    }

    getCol(index){
        return this.cols[index];
    }
}

class cube{
    constructor(colors, defualtColor, qbSize, spacing){
        this.colors = colors;
        this.defualtColor = defualtColor;
        this.qbSize = qbSize;
        this.spacing = spacing;
        this.sides = [];
        for(var i = 0; i < 6; i++){
            var side = new cubeSide(colors[i]);
            this.sides.push()
        }
    }

    drawPlane(color, position, orientation){
        push();
        ambientMaterial(color);
        rotateX(orientation[0]);
        rotateY(orientation[1]);
        rotateZ(orientation[2]);
        translate(position[0], position[1], position[2]);
        plane(this.size, this.size);
        pop();
    }

    drawCube(){
        push();
        for(var x = -1; x <= 1; x++){
            for(var y = -1; y <= 1; y++){
                for(var z = -1; z <= 1; z++){
                    if(x == -1){

                    }
                }
            }
        }
    }
}
