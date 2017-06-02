class Tiger {
    constructor() {
        this.energy = 100;
    }
    act(view) {
        const space = view.find(' ');
        if (this.energy > 200 && space)
            return { type: 'reproduce', direction: space };
        const plantEater = view.find('O');
        if (plantEater) return { type: 'eat', direction: plantEater };
        if (space) return { type: 'move', direction: space };
    }
}

module.exports = Tiger;
