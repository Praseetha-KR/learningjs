const validateExec = require('./validate');

function countChar(str, char) {
    const filtered = str.split('').filter(v => v === char);
    return filtered.length;
}

function displayCountChar(str, char) {
    console.log(countChar(str, char));
}

validateExec.call(null, displayCountChar, process.argv[2], process.argv[3]);
