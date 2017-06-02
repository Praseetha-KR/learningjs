class SmartPlantEater {
    constructor() {
        this.energy = 20;
    }
    act(view) {
        const space = view.find(' ');
        if (this.energy > 60 && space)
            return { type: 'reproduce', direction: space }
        if (this.energy < 50) {
            const plant = view.find('*');
            if (plant) return { type: 'eat', direction: plant }
        }
        if (space) return { type: 'move', direction: space }
    }
}

module.exports = SmartPlantEater;
