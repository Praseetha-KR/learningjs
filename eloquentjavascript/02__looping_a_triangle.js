function displayTriangle(limit, char) {
    for (let i = 1; i <= limit; i++) {
        console.log(Array(i + 1).join(char || '#'));
    }
}

function validateArgAndExecute(fn) {
    if (!arguments[1]) {
        console.log('Provide a limit');
        return;
    }
    fn(arguments[1], arguments[2]);
}

validateArgAndExecute(displayTriangle, process.argv[2], process.argv[3]);
