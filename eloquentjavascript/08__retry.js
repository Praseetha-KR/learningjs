class MultiplicatorUnitFailure extends Error {
    constructor(message) {
        super(message);
    }
    get name() {
        return 'MultiplicatorUnitFailure';
    }
}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5) return a * b;
    else throw new MultiplicatorUnitFailure();
}

function reliableMutiply(a, b) {
    while (true) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) console.log(e.name);
            else throw e;
        }
    }
}

console.log(reliableMutiply(8, 8));
