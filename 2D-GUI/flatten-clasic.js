// let frameWidth = document.getElementById('flatten').offsetWidth;
// let frameHeight = document.getElementById('flatten').offsetHeight;

class Tile{
    constructor(color, position, size=globalTileSize){
        this.size = size;
        this.pos = position;
        this.color = color;
    }

    drawTile(){
        fill(this.color);
        strokeWeight(globalSpacing);
        stroke(black);
        strokeCap(ROUND);
        strokeJoin(ROUND)
        rect(this.pos[0], this.pos[1], this.size, this.size);
    }
}

class Face{
    constructor(colors, pos){
        this.pos = pos;
        let tempColors = colors
        if(colors.length != 9){
            tempColors = [];
            for(let i = 0; i < 9; i++){
                tempColors.push(colors);
            }
        }

        this.tiles = []
        for( let row = 0; row < 3; row++ ){
            this.tiles.push([])
            for( let col = 0; col < 3; col++ ){
                let x = this.pos[0] + (row * (globalTileSize + globalSpacing));
                let y = this.pos[1] + (col * (globalTileSize + globalSpacing));
                let tile = new Tile(tempColors[row + ((col % 3) * 3)], [x, y])
                this.tiles[row].push(tile);
            }
        }
    }

    updatePos(newPos){
        this.pos = newPos;
        for( let row = 0; row < 3; row++ ){
            for( let col = 0; col < 3; col++ ){
                let x = this.pos[0] + (row * (globalTileSize + globalSpacing));
                let y = this.pos[1] + (col * (globalTileSize + globalSpacing));
                this.tiles[row][col].pos = [x, y];
            }
        }
    }

    draw(){
        for( let row = 0; row < 3; row++ ){
            for( let col = 0; col < 3; col++ ){
                this.tiles[row][col].drawTile();
            }
        }
    }
}

class Flatten{
    constructor(state){
        // this.pos = [frameWidth/2 - (4*globalFaceSize)/2, frameHeight/2 - (3*globalFaceSize)/2 - frameHeight/5];
        this.pos = [frameWidth/5, frameHeight/5];
        this.faces = []
        for(let i = 0; i < 6; i++){
            let x;
            let y;
            if(i==0){
                x = this.pos[0] + globalFaceSize;
                y = this.pos[1];
            } else if(i == 5){
                x = this.pos[0] + globalFaceSize;
                y = this.pos[1] + ((globalFaceSize) * 2);
            } else {
                x = this.pos[0] + (i-1)*(globalFaceSize);
                y = this.pos[1] + globalFaceSize;
            }
            this.faces.push(new Face(globalColors[i], [x, y]))
        }
    }

    updatePos(){
        // this.pos = [frameWidth/2 - (4*globalFaceSize)/2, frameHeight/2 - (3*globalFaceSize)/2 - frameHeight/5];
        this.pos = [frameWidth/2, frameHeight/2];
        for(let i = 0; i < 6; i++){
            let x;
            let y;
            if(i==0){
                x = this.pos[0] + globalFaceSize;
                y = this.pos[1];
            } else if(i == 5){
                x = this.pos[0] + globalFaceSize;
                y = this.pos[1] + (globalFaceSize * 2);
            } else {
                x = this.pos[0] + (i-1)*globalFaceSize;
                y = this.pos[1] + globalFaceSize;
            }
            this.faces[i].updatePos([x, y])
        }
    }

    draw(){
        for (var i = 0; i < this.faces.length; i++) {
            this.faces[i].draw()
        }
    }
}
