const validateExec = require('./validate');

function displayTriangle(limit, char) {
    for (let i = 1; i <= limit; i++) {
        console.log(Array(i + 1).join(char || '#'));
    }
}

validateExec.call(
    null,
    displayTriangle,
    parseInt(process.argv[2]),
    process.argv[3]
);
