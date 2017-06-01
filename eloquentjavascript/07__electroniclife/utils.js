function randomElement(arr) {
    return arr[Math.floor((Math.random() * arr.length))];
}

function elementFromChar(legend, ch) {
    if (ch === ' ') return null;
    let elem = new legend[ch]();
    elem.originalChar = ch;
    return elem;
}
function charFromElement(elem) {
    if (!elem) return ' ';
    return elem.originalChar;
}

module.exports.randomElement = randomElement;
module.exports.elementFromChar = elementFromChar;
module.exports.charFromElement = charFromElement;
