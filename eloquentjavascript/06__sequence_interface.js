function logFive(seq) {
    let count = 0, elem;
    while(count < 5) {
        elem = seq.next;
        if (!elem) return;
        console.log(elem);
        count ++;
    }
}

class Sequence {
    constructor() {
        this.arr = [...arguments];
    }
    get next() {
        return this.arr.shift();
    }
}

class ArraySeq extends Sequence {
    constructor(arr) {
        super(...arr);
    }
}

class RangeSeq extends Sequence {
    constructor(start, end, step = 1) {
        const numOfElems = Math.ceil(Math.abs((end - start)) / step);
        const mult = start < end ? 1 : -1;

        super(...Array.from(
            Array(numOfElems),
            (_, i) => start + ((mult * i) * step)
        ));
    }
}

logFive(new Sequence('J', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't'));
logFive(new ArraySeq([1, 2]));
logFive(new RangeSeq(100, 1000));
