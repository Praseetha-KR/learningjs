function displayTriangle(limit) {
    let str = '';
    for (let i = 0; i < limit; i++) {
        str += '#';
        console.log(str);
    }
}

function validateArgAndExecute(fn, arg) {
    if (!arg) {
        console.log('Provide a value');
        return;
    }

    fn(arg);
}

validateArgAndExecute(displayTriangle, process.argv[2]);
