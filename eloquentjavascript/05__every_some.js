function some(arr, predicate) {
    return !!arr.filter(v => predicate(v)).length;
}

function every(arr, predicate) {
    return arr.length === arr.filter(v => predicate(v)).length;
}

console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));
console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));
