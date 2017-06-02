const { View } = require('./view');
const World = require('./world');
const { elementFromChar } = require('./utils');

let actionTypes = {
    grow(critter) {
        critter.energy += 0.5;
        return true;
    },
    move(critter, vector, action) {
        const dest = this.checkDestination(action, vector);
        if (dest === null
            || critter.energy <= 1
            || this.grid.get(dest) !== null
        ) return false;
        critter.energy -= 1;
        this.grid.set(vector, null);
        this.grid.set(dest, critter);
        return true;
    },
    eat(critter, vector, action) {
        const dest = this.checkDestination(action, vector);
        const atDest = dest !== null && this.grid.get(dest);
        if (!atDest || atDest.energy === null) return false;
        critter.energy += atDest.energy;
        this.grid.set(dest, null);
        return true;
    },
    reproduce(critter, vector, action) {
        const baby = elementFromChar(this.legend, critter.originalChar);
        const dest = this.checkDestination(action, vector);
        if (dest === null
            || critter.energy <= 2 * baby.energy
            || this.grid.get(dest) !== null
        ) return false;
        this.grid.set(dest, baby);
        return true;
    }
};

class LifeLikeWorld extends World {
    constructor(map, legend) {
        super(map, legend);
    }

    letAct(critter, vector) {
        const action = critter.act(new View(this, vector));
        const handled = action
            && action.type in actionTypes
            && actionTypes[action.type].call(this, critter, vector, action);
        if (!handled) {
            critter.energy -= 0.2;
            if (critter.energy <= 0) this.grid.set(vector, null)
        }
    }
}

module.exports = LifeLikeWorld;
