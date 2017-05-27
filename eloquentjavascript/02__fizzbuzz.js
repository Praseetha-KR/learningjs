const validateExec = require('./validate');

function fizzbuzz(start, end, step=1) {
    for (let i = start; i <= end; i += step) {
        if (i % 3 == 0 || i % 5 == 0) {
            if (i % 3 === 0 && i % 5 === 0) {
                console.log('FizzBuzz');
                continue;
            }
            if (i % 3 == 0) {
                console.log('Fizz');
                continue;
            }
            if (i % 5 == 0) {
                console.log('Buzz');
                continue;
            }
            continue;
        }
        console.log(i);
    }
}

validateExec.call(
    null,
    fizzbuzz,
    parseInt(process.argv[2]),
    parseInt(process.argv[3]),
    parseInt(process.argv[4])
);
