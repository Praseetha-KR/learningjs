const { directions } = require('./view');
const { randomElement } = require('./utils');

class BouncingCritter {
    constructor() {
        this.direction = randomElement(Object.keys(directions));
    }

    act(view) {
        if (view.look(this.direction) !== ' ')
            this.direction = view.find(' ') || 's';
        return { type: 'move', direction: this.direction };
    }
}

module.exports = BouncingCritter;
