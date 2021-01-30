function setup() {
    angleMode(DEGREES);
    let height = document.getElementById('flatten').offsetHeight;
    let width = document.getElementById('flatten').offsetWidth;
    let cnv = createCanvas(width, height);
    cnv.parent('flatten');
    // face = new Face(white, [500, 500]);
    // projectedTile1 = new ProjectedTile(red, "XY", [500, 500]);
    // projectedTile2 = new ProjectedTile(white, "XY", [400, 400]);
    // projectedTile3 = new ProjectedTile(white, "XZ", [400, 400]);
    // projectedTile4 = new ProjectedTile(white, "YZ", [400, 400]);
    flatten = new Flatten(5);
    projection = new Projected3D(5);
    height = document.getElementById('flatten').offsetHeight;
    width = document.getElementById('flatten').offsetWidth;
    resizeCanvas(width, height);
}

function draw() {
    background(backgorund2D);
    // face.draw();
    // flatten.draw();
    // projectedTile1.draw();
    // projectedTile2.draw();
    // projectedTile3.draw();
    // projectedTile4.draw();
    projection.draw();
}

function windowResized() {
    let height = document.getElementById('flatten').offsetHeight;
    let width = document.getElementById('flatten').offsetWidth;
    resizeCanvas(width, height);
    flatten.updatePos();
}

function mousePressed() {
    // console.log("working");
    for (let faceIndex = 0; faceIndex < projection.faces.length; faceIndex++) {
        console.log(projection.faces[faceIndex]);
        for (let tilesRowIndex = 0; tilesRowIndex < projection.faces[faceIndex].tiles.length; tilesRowIndex++) {
            for (let tileIndex = 0; tileIndex < projection.faces[faceIndex].tiles[tilesRowIndex].length; tileIndex++) {
                console.log(projection.faces[faceIndex].tiles[tilesRowIndex][tileIndex].color);
                if(projection.faces[faceIndex].tiles[tilesRowIndex][tileIndex].isInRect([mouseX, mouseY])){
                    console.log("equal");
                    projection.faces[faceIndex].tiles[tilesRowIndex][tileIndex].color = grey;
                }
            }
        }
    }
    // let rect1 = projectedTile1.isInRect([mouseX, mouseY]);
    // let rect2 = projectedTile2.isInRect([mouseX, mouseY]);
    // let rect3 = projectedTile3.isInRect([mouseX, mouseY]);
    // let rect4 = projectedTile4.isInRect([mouseX, mouseY]);
    // if(rect1){
    //     projectedTile1.color = blue;
    // }
    // if(rect2){
    //     projectedTile2.color = blue;
    // }
    // if(rect3){
    //     projectedTile3.color = blue;
    // }
    // if(rect4){
    //     projectedTile4.color = blue;
    // }
}

