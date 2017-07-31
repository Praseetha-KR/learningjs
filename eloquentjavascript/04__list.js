function prepend(value, list) {
    return {
        value,
        rest: list
    };
}

function arrayToList(arr) {
    return arr
        .reverse()
        .map(value => prepend(value, null))
        .reduce((acc, curr) => {
            curr.rest = acc;
            return curr;
        }, null);
}

function listToArray(list) {
    let arr = [];

    function ltoa(l) {
        if (!l) return;
        arr.push(l.value);
        return ltoa(l.rest);
    }
    ltoa(list);

    return arr;
}

function nth(n, list) {
    node = list;
    for (let i = 2; i <= n; i++) {
        if (node.rest) {
            node = node.rest;
            continue;
        }
        return;
    }
    return node;
}

const l = arrayToList([1, 2, 3, 4, 5]);
console.log(l);
console.log(listToArray(l));
console.log(nth(5, l));
console.log(prepend(50, prepend(10, l)));
