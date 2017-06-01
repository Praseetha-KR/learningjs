const Grid = require('./grid');
const Vector = require('./vector');
const { View, directions } = require('./view');
const { elementFromChar, charFromElement } = require('./utils');

class World {
    constructor(map, legend) {
        let grid = new Grid(map[0].length, map.length);
        this.grid = grid;
        this.legend = legend;

        map.forEach((line, y) => {
            for (let x = 0; x < line.length; x++) {
                grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
            }

        });
    }
    toString() {
        let output = '';
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                let elem = this.grid.get(new Vector(x, y));
                output += charFromElement(elem);
            }
            output += '\n';
        }
        return output;
    }
    turn() {
        let acted = [];
        this.grid.forEach((critter, vector) => {
            if (critter.act && acted.indexOf(critter) == -1) {
                acted.push(critter);
                this.letAct(critter, vector);
            }
        }, this);
    }
    letAct(critter, vector) {
        const action = critter.act(new View(this, vector));
        if (action && action.type === 'move') {
            const dest = this.checkDestination(action, vector);
            if (dest && this.grid.get(dest) === null) {
                this.grid.set(vector, null);
                this.grid.set(dest, critter);
            }
        }
    }
    checkDestination(action, vector) {
        if (directions.hasOwnProperty(action.direction)) {
            const dest = vector.plus(directions[action.direction]);
            if (this.grid.isInside(dest)) return dest;
        }
    }
}

module.exports = World;
