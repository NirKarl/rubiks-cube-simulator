class Vector{
    constructor(point){
        this.vector = point;
    }

    scale(scalar){
        let retVec = []
        for (var i = 0, i < this.vector.length){
            retVec.push(this.vector[i]*scalar);
        }
        return now Vector(retVec);
    }

    add(other){
        if (this.length != other.length){
            console.log('vectors shuold be of the same order');
            return null;
        }
        let ret = []
        for (var i = 0, i < this.vector.length){
            ret.push(this.vector[i] + other.vector[i]);
        }
        retVec = now Vector(ret)
        return retVec;
    }

    sub(other){
        if (this.length != other.length){
            console.log('vectors shuold be of the same order');
            return null;
        }
        let ret = []
        negative = other.scale(-1);
        for (var i = 0, i < this.vector.length){
            ret.push(this.vector[i] + negative[i]);
        }
        retVec = now Vector(ret)
        return retVec;
    }

    len(){
        len = 0
        for (var i = 0, i < this.vector.length){
            len += this.vector[i]**2;
        }
        return len
    }

    dot(other){
        if (this.length != other.length){
            console.log('vectors shuold be of the same order');
            return null;
        }
        dot = 0
        for (var i = 0, i < this.vector.length){
            dot += this.vector[i] * other[i];
        }
        return dot;
    }

    project(plane, normal, point){
        projVec = normal.scale(this.vector.dot(normal) / normal.len());
        retVec = this.vector.sub(projVec);
        return retVec;
    }

}
