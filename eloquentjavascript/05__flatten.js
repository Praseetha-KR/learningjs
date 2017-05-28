function flatten(arr) {
    return arr
        .reduce((acc, curr) => acc.concat(curr), []);
}


var arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
