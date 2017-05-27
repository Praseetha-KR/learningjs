function validateArgsAndExecute(fn) {
    if (!arguments[1]) {
        console.log('Please check function signature');
        return;
    }
    fn.apply(null, Array.prototype.slice.call(arguments, 1));
}

module.exports = validateArgsAndExecute;
