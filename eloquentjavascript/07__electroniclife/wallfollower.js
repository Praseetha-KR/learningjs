const { directions } = require('./view');

function dirPlus(dir, n) {
    const directionNames = Object.keys(directions);
    const index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

class WallFollower {
    constructor() {
        this.dir = 's';
    }

    act(view) {
        let start = this.dir;
        if (view.look(dirPlus(this.dir, -3)) !== ' ')
            start = this.dir = dirPlus(this.dir, -2);
        while (view.look(this.dir) !== ' ') {
            this.dir = dirPlus(this.dir, 1);
            if (this.dir !== start) break;
        }
        return { type: 'move', direction: this.dir };
    }
}

module.exports = WallFollower;
