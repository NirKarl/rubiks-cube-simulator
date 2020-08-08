// **************** AXIS ROTATION MATRICES *****************
function Rx(ang, ccw=true){
    if (ccw !== true){
        ang *= -1;
    }
    return new Matrix(3, 3, [[1, 0, 0], [0, cos(ang), -sin(ang)], [0, sin(ang), cos(ang)]]);
}

function Ry(ang, ccw=true){
    if (ccw !== true){
        ang *= -1;
    }
    return new Matrix(3, 3, [[cos(ang), 0, sin(ang)], [0, 1, 0], [-sin(ang), 0, cos(ang)]]);
}

function Rz(ang, ccw=true){
    if (ccw !== true){
        ang *= -1;
    }
    return new Matrix(3, 3, [[cos(ang), -sin(ang), 0], [sin(ang), cos(ang), 0], [0, 0, 1]]);
}


class Vector{
    constructor(size, vector=null){
        this.matrix = [];
        if (vector === null){
            this.size = size;
            this._vector = [];
            for (var i = 0; i < size; i++){
                this._vector.push(null);
            }
        } else{
            this.size = vector.length;
            this._vector = vector;
            for (var i = 0; i < size; i++){
                this.matrix.push([this._vector[i]]);
            }
        }

        this.x = this._vector[0];
        this.y = this._vector[1];
        this.z = this._vector[2];
    }

    get vector(){
        return this._vector;
    }

    set vector(newVec){
        this.vector = newVec;
        this.size = this._vector.length;
        for (var i = 0; i < size; i++){
                matrix.push([this._vector[i]]);
            }
    }

    // get matrix(){
    //     return this.matrix;
    // }

    scale(scalar){
        let scale_vec = [];
        for (var i = 0; i < this.szie; i++){
            scale_vec.push(this._matrix[i][j] * scalar);
        }
        return scale_mat;
    }

    add(other){
        console.log('add');
        if (other.length !== this.size){
            return null;
        } else {
            let add_mat = []; // WTF???
            for (var i = 0; i < this.rows; i++){
                add_mat.push([]);
                for (var j = 0; j < this.cols; j++){
                    add_mat[i].push(this._matrix[i][j] + other[i][j]);
                }
            }
            return add_mat;
        }
    }
}

class Matrix{
    constructor(rows=3, cols=3, matrix=null){
        if (matrix === null){
            this.rows = rows;
            this.cols = cols;
            this._matrix = []
            for (var i = 0; i < rows; i++){
                this._matrix.push([]);
                for (var j = 0; j < cols; j++){
                    this._matrix[i].push(null);
                }
        }
        } else {
            this._matrix = matrix;
            this.rows = matrix.length;
            this.cols = matrix[0].length;
        }
        this._det;
        this.matChange = true;
    }

    get matrix(){
        return this._matrix;
    }

    set matrix(newMat){
        this._matrix = newMat;
        this.rows = this._matrix.length;
        this.cols = this._matrix[0].length;
        if (this.rows === 1){
            for (var i = 0; i < this.cols; i++){
                this.vector.push(this._matrix[0][i]);
            }
        }
        this.matChange = true;
    }

    det2(matrix){
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    scale(scalar){
        let scale_mat = [];
        for (var i = 0; i < this.rows; i++){
            scale_mat.push([]);
            for (var j = 0; j < this.cols; j++){
                scale_mat[i].push(this._matrix[i][j] * scalar);
            }
        }
        return scale_mat;
    }

    get det(){
        if (this.matChange){
            let temp;
            if (this.rows !== this.cols){
                temp = null;
            } else if (this.rows === 2){
                temp = this.det2(this._matrix);
            } else if (this.rows === 3){
                let a = this._matrix[0][0] * (this._matrix[1][1] * this._matrix[2][2] - this._matrix[1][2] * this._matrix[2][1]);
                let b = this._matrix[0][1] * (this._matrix[1][0] * this._matrix[2][2] - this._matrix[1][2] * this._matrix[2][0]);
                let c = this._matrix[0][2] * (this._matrix[1][0] * this._matrix[2][1] - this._matrix[1][1] * this._matrix[2][0]);
                temp = a - b + c;
            }
            this._det = temp;
            this.matChange = false;
        }
        return this._det;
    }

    mult(other){
        console.log('mult');
        if (other.length !== this.cols){
            console.log(other.length, this.cols);
            return null;
        } else {
            let mult_mat = []
            for (var i = 0; i < this.rows; i++){
                mult_mat.push([])
                for (var j = 0; j < other[0].length; j++){
                    mult_mat[i].push(0);
                    for (var k = 0; k < this.cols; k++){
                        mult_mat[i][j] += (this._matrix[i][k] * other[k][j]);
                    }
                    mult_mat[i][j] = Math.abs(mult_mat[i][j]) <= 0.0000000001 ? 0 : mult_mat[i][j]
                }
            }
            return mult_mat;
        }
    }

    add(other){
        console.log('add');
        if (other.length !== this.rows || other[0].length !== this.cols){
            return null;
        } else {
            let add_mat = [];
            for (var i = 0; i < this.rows; i++){
                add_mat.push([]);
                for (var j = 0; j < this.cols; j++){
                    add_mat[i].push(this._matrix[i][j] + other[i][j]);
                }
            }
            return add_mat;
        }
    }

    inverse(){
        if (this.det !== 0 && this.det !== null){
            let AdjMat = [];
            for (var i = 0; i < this.rows; i++){
                AdjMat.push([]);
                for (var j = 0; j < this.cols; j++){
                    AdjMat[i].push(null);
                }
            }
            for (var i = 0; i < this.rows; i++){
                for (var j = 0; j < this.cols; j++){
                    let smallMat = [[], []];
                    let x = 0;
                    let swithX = false;
                    for (var k = 0; k < this.rows; k++){
                        for (var l = 0; l < this.cols; l++){
                            if (k !== i && l !== j){
                                smallMat[x].push(this._matrix[k][l]);
                                swithX = true;
                            }
                        }
                        if (swithX){
                            x = 1; // WTF???
                        }
                    }
                    AdjMat[j][i] = ((this.det2(smallMat) * ((i+j)%2 === 0 ? 1 : -1)) / this.det);
                }
            }
            return AdjMat;
        }
        return null
    }
}

function rotate_vector(vector, yAngle){
    const a = vector[0];
    const b = vector[1];
    const c = vector[2];
    let vec = new Matrix(1, 3, [[a], [b], [c]]);
    const xAngle = 90 - Math.atan2(b, c);
    const xRotation = Rx(xAngle, false);
    vec = xRotation.mult(vec.matrix);
    const bTag = sqrt(vector[1]**2 + vector[2]**2)
    const xyVec = (a, bTag, 0);
    const zAngle = 90 - Math.atan2(bTag, a);
    const zRotation = Rz(zAngle);
    vec = zRotation.mult(vec);
    return vec
}

function translate_point(point, vector){
    retVec = vector.mult([[point[0], point[1], 0]])
    return retVec;
}

function find_line_equ(pointA, pointB){
    let a;
    let b;
    let c;
    if (pointA[0] === pointB[0]){
        a = 1;
        b = 0;
        c = -pointA[0];
    } else{
        a = ((pointA[1]-pointB[1])/(pointA[0] - pointB[0]));
        b = -1;
        c = (pointA[1] - a*pointA[0]);
    }
    return {
        a: a,
        b: b,
        c: c
    };
}

function is_in_triangle(points, mPos){
    for (let i = 0; i < 3; i++){
        let equ = find_line_equ(points[i%3], points[(i+1)%3]);
        let a = equ.a;
        let b = equ.b;
        let c = equ.c;
        let refPointSide = (a*points[(i+2)%3][0] + b*points[(i+2)%3][1] + c) > 0;
        let mouseSide = (a*mPos[0] + b*mPos[1] + c) > 0;
        if (mouseSide != refPointSide){
            return false;
        }
    }
    return true;
}

function is_in_face(points, mPos){
    let xAvg = 0;
    let yAvg = 0;
    for (var i = 0; i < points.length; i++){
        xAvg += points[i][0];
        yAvg += points[i][1];
    }
    let test = 0;
    xAvg /= points.length;
    yAvg /= points.length;
    let centerPoint = [xAvg, yAvg];
    for (var i = 0; i < points.length; i ++){
        if ((is_in_triangle([points[i], points[(i+1)%points.length], centerPoint], mPos))){
            return true;
        }
    }
    return false;
}

mat1 = new Matrix(2, 2, [[2, 2], [2, 2]]);
console.log(mat1.det);
console.table(mat1.matrix);
