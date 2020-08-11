// **************** AXIS ROTATION MATRICES *****************
function Rx(ang=90, ccw=true) {
    if (ccw !== true) {
        ang *= -1;
    }
    return new Matrix3D([[1, 0, 0], [0, cos(ang), -sin(ang)], [0, sin(ang), cos(ang)]]);
}

function Ry(ang=90, ccw=true) {
    if (ccw !== true) {
        ang *= -1;
    }
    return new Matrix3D([[cos(ang), 0, sin(ang)], [0, 1, 0], [-sin(ang), 0, cos(ang)]]);
}

function Rz(ang=90, ccw=true) {
    if (ccw !== true) {
        ang *= -1;
    }
    return new Matrix3D([[cos(ang), -sin(ang), 0], [sin(ang), cos(ang), 0], [0, 0, 1]]);
}


class Vector3D{

    constructor(xyz=null) {
        this._vector;
        if(xyz !== null) {
            this._vector = xyz;
        } else {
            this._vector = [0, 0, 0]
        }
    }

    get vector() {
        return this._vector;
    }

    set vector(newVec) {
        this._vector = newVec;
    }

    get x(){
        return this._vector[0];
    }

    get y(){
        return this._vector[1];
    }

    get z(){
        return this._vector[2];
    }

    add(other, apply=true) {
        let result = new Array(3);
        for (let i = 0; i < result.length; i++) {
            result[i] = this._vector[i][0] + other.vector[i][0];
        }

        if(!apply) {
            return result;
        }
        this._vector = result;
    }

    mult(other, apply=true) {
        let result;
        if(other instanceof(Vector3D)) {
            result = 0;
            for (let i = 0; i < result.length; i++) {
                result += this._vector[i] * other.vector[i];
            }
            apply = false;
        } else if(!isNaN(other)) {
            result = new Array(3);
            for (let i = 0; i < result.length; i++) {
                result[i] = this._vector[i] * other;
            }
        } else if(other instanceof(Matrix3D)){
            result = new Array(3);
            for (let i = 0; i < 3; i++) {
                result[i] = 0;
                for (let j = 0; j < 3; j++) {
                    result[i] += Math.round((this._vector[j] * other.matrix[i][j]));
                }
            }
        }

        if(!apply) {
            return result;
        }
        this._vector = result;
    }
}

class Matrix3D{

    constructor(matrix=null){
        if(matrix === null){
            this._matrix = new Array(3)
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    this._matrix[i][j].push(0);
                }
            }
        } else {
            this._matrix = matrix;
        }
    }

    get matrix(){
        return this._matrix;
    }

    set matrix(newMat){
        this._matrix = newMat;
    }

    get det(){
        let a = this._matrix[0][0] * (this._matrix[1][1] * this._matrix[2][2] - this._matrix[1][2] * this._matrix[2][1]);
        let b = this._matrix[0][1] * (this._matrix[1][0] * this._matrix[2][2] - this._matrix[1][2] * this._matrix[2][0]);
        let c = this._matrix[0][2] * (this._matrix[1][0] * this._matrix[2][1] - this._matrix[1][1] * this._matrix[2][0]);
        det = a - b + c;
        return det;
    }

    add(other, apply=true) {
        for (let i = 0; i < 3; i++) {
            result.push([]);
            for (let j = 0; j < 3; j++) {
                result[i].push(this._matrix[i][j] + other.matrix[i][j]);
            }
        }

        if(!apply) {
            return result;
        }
        this._matrix = result;
    }

    mult(other, apply=true){
        let result = []
        if(other instanceof(Matrix3D)){
            for (let i = 0; i < 3; i++){
                result.push([])
                for (let j = 0; j < other.matrix[0].length; j++){
                    result[i].push(0);
                    for (let k = 0; k < 3; k++){
                        result[i][j] += Math.round((this._matrix[i][k] * other.matrix[k][j]));
                    }
                }
            }
        } else if(!isNaN(other)) {
            for (let i = 0; i < 3; i++) {
                result.push([]);
                for (let j = 0; j < 3; j++) {
                    result[i].push(this._matrix[i][j] * other);
                }
            }
        }

        if(!apply) {
        return result;
        }
        this._matrix = result;
    }
}
