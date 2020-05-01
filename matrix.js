class Matrix{
    constructor(rows, cols){
        this.rows = rows
        this.cols = cols
        this._matrix = []
        for (var i = 0; i < rows; i++){
            this._matrix.push([]);
            for (var j = 0; j < cols; j++){
                this._matrix[i].push(null);
            }
        }
        this.detVal;
        this.matChange = true;
    }

    get matrix(){
        return this._matrix;
    }

    set matrix(newMat){
        this._matrix = newMat;
        this.rows = this._matrix.length;
        this.cols = this._matrix[0].length;
        this.matChange = true;
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
            this.detVal = temp;
            this.matChange = false;
        }
        return this.detVal;

    }

    scale(scalar){
        let scale_mat = []
        for (var i = 0; i < this.rows; i++){
            scale_mat.push([]);
            for (var j = 0; j < this.cols; j++){
                scale_mat[i].push(this._matrix[i][j] * scalar);
            }
        }
        return scale_mat
    }

    add(other){
        if (other.rows !== this.rows || other.cols !== this.cols){
            return null;
        } else {
            let add_mat = []
            for (var i = 0; i < this.rows; i++){
                add_mat.push([])
                for (var j = 0; j < this.cols; j++){
                    add_mat[i].push(this._matrix[i][j] + other.matrix[i][j]);
                }
            }
            return add_mat;
        }
    }

    mult(other){
        if (other.rows !== this.cols){
            return null
        } else {
            let mult_mat = []
            for (var i = 0; i < this.rows; i++){
                mult_mat.push([])
                for (var j = 0; j < other.cols; j++){
                    mult_mat[i].push(0);
                    for (var k = 0; k < this.cols; k++){
                        mult_mat[i][j] += (this._matrix[i][k] * other.matrix[k][j]);
                    }
                }
            }
            return mult_mat;
        }
    }

    inverse(){
        let AdjMat = [];
        for (var i = 0; i < this.rows; i++){
            AdjMat.push([]);
            for (var j = 0; j < this.cols; j++){
                AdjMat[i].push(null);
            }
        } 
        for (var i = 0; i < this.rows; i++){
            for (var j = 0; j < this.cols; j++){
                let smallMat = [[], []]
                for (var k = 0; k < this.rows; k++){
                    for (var l = 0; l < this.cols; l++){
                        if (k !== i && l !== j){
                            smallMat[0].push(this._matrix[k][l]);
                        }
                    }
                }
                AdjMat[j][i] = this.det2(smallMat) * ((i+j)%2 === 0 ? 1 : -1);
            }
        }
        return AdjMat;
    }

    det2(matrix){
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    }
}

mat1 = new Matrix(3, 3);
mat1.matrix = [
    [6, 1, 1],
    [4, -2, 5],
    [2, 8, 7]
];

mat2 = new Matrix(3, 3);
mat2.matrix = [
    [0, 2, 0],
    [4, 2, 1],
    [0, 1, 3]
];

mat3 = new Matrix(3, 2);
mat3.matrix = [
    [3, 4],
    [7, 2],
    [5, 9]
];

mat4 = new Matrix(2, 3);
mat4.matrix = [
    [3, 1, 5],
    [6, 9, 7]
];

console.log(mat2.inverse());