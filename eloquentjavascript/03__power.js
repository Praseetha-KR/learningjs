const validateExec = require('./validate');

function power(base, exponent) {
    if (exponent === 0) {
        return 1;
    }
    return base * power(base, exponent - 1);
}

function displayPower(base, exponent) {
    console.log(power(base, exponent || 2));
}

validateExec.call(
    null,
    displayPower,
    parseInt(process.argv[2]),
    parseInt(process.argv[3])
);
