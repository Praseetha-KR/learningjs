const validateExec = require('./validate');

function oddOrEven(num) {
    const SUBTRACTOR = num < 0 ? -2 : 2;
    if (num === 0) return 'even';
    if (num === 1) return 'odd';
    return oddOrEven(num - SUBTRACTOR);
}

function displayOddOrEven(num) {
    console.log(oddOrEven(num));
}

validateExec.call(null, displayOddOrEven, parseInt(process.argv[2]));
