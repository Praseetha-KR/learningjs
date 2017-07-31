const validateExec = require('./validate');

function min(num1, num2) {
    return num1 < num2 ? num1 : num2;
}

function displayMin(num1, num2) {
    console.log(min(num1, num2));
}

validateExec.call(
    null,
    displayMin,
    parseInt(process.argv[2]),
    parseInt(process.argv[3])
);
