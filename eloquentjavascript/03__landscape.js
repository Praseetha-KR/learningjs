const validateExec = require('./validate');

function landscape(arr) {
    terrain = '';
    function flat(size) {
        for (let i = 0; i < size; i++) {
            terrain += '_';
        }
    }
    function mountain(size) {
        terrain += '\/';
        for (let i = 0; i < size; i++) {
            terrain += '^';
        }
        terrain += '\\';
    }

    arr.forEach((v, i) => {
        return (i % 2 === 0) ? flat(v) : mountain(v);
    });

    return terrain;
}

function displayLandscape() {
    console.log(landscape.call(this, [].slice.call(arguments)));
}

displayLandscape(3,4,6,1,1);
