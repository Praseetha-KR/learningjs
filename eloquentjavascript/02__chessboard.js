const validateExec = require('./validate');

function displayChessboard(width=8, height) {
    if (!height) height = width;
    for (let i = 0; i < height; i++) {
        let line = '';
        for (let j = 0; j < width; j++) {
            line += ((i + j) % 2 === 0) ? '#' : ' ';
        }
        console.log(line);
    }
}
validateExec.call(
    null,
    displayChessboard,
    parseInt(process.argv[2]),
    parseInt(process.argv[3])
);
