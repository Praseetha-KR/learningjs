const Vector = require('./vector');
const { charFromElement, randomElement } = require('./utils');

const directions = {
    n: new Vector(0, -1),
    ne: new Vector(1, -1),
    e: new Vector(1, 0),
    se: new Vector(1, 1),
    s: new Vector(0, 1),
    sw: new Vector(1, -1),
    w: new Vector(-1, 0),
    nw: new Vector(-1, -1)
};

class View {
    constructor(world, vector) {
        this.world = world;
        this.vector = vector;
    }
    look(dir) {
        const target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target))
            return charFromElement(this.world.grid.get(target));
        return '#';
    }
    findAll(ch) {
        let found = [];
        for (let dir in directions) {
            if (this.look(dir) === ch) found.push(dir);
        }
        return found;
    }
    find(ch) {
        const found = this.findAll(ch);
        if (found.length === 0) return null;
        return randomElement(found);
    }
}

module.exports.directions = directions;
module.exports.View = View;
