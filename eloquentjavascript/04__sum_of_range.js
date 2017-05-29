const validateExec = require('./validate');

function range(start, end, step=1) {
    if (!step) step = 1;
    const mult = (start < end) ? 1 : -1;
    const total = Math.ceil((end - start) / 1);
    return Array.from(Array(total), (_, i) =>  start + ((mult * i) * step));
}

function sum(arr) {
    return arr.reduce((prev, curr) => prev + curr, 0);
}

function displayRangedSum(start, end, step) {
    console.log(sum(range(start, end, step)));
}

validateExec.call(
    null,
    displayRangedSum,
    parseInt(process.argv[2]),
    parseInt(process.argv[3]),
    parseInt(process.argv[4])
);
