/* ============================================================================
    #Format mountains table
============================================================================ */
const MOUNTAINS = require('./data/mountains');

function repeat(str, times) {
    let result = '';
    for(let i = 0; i < times; i++) {
        result += str;
    }
    return result;
}

class TextCell {
    constructor(text) {
        this.text = text.split('\n');
    }

    minWidth() {
        return this.text
            .reduce((width, line) => Math.max(width, line.length), 0);
    }

    minHeight() {
        return this.text.length;
    }

    draw(width, height) {
        let result = [];
        for (let i = 0; i < height; i++) {
            const line = this.text[i] || '';
            result.push(line + repeat(' ', width - line.length));
        }
        return result;
    }
}

class UnderlinedCell {
    constructor(inner) {
        this.inner = inner;
    }

    minWidth() {
        return this.inner.minWidth();
    }

    minHeight() {
        return this.inner.minHeight() + 1;
    }

    draw(width, height) {
        return this.inner.draw(width, height - 1)
            .concat([repeat("-", width)]);
    }
}

class RTextCell extends TextCell {
    constructor(text) {
        super(text)
    }

    draw(width, height) {
        let result = [];
        for(let i = 0; i < height; i++) {
            const line = this.text[i] || '';
            result.push(repeat(' ', width - line.length) + line);
        }
        return result;
    }
}

function rowHeights(rows) {
    return rows.map(row => {
        return row.reduce((max, cell) => Math.max(max, cell.minHeight()), 0);
    });
}

function columnWidths(rows) {
    return rows[0].map((_, i) =>
        rows.reduce((max, row) => Math.max(max, row[i].minWidth()), 0)
    );
}

function drawTable(rows) {
    const heights = rowHeights(rows);
    const widths = columnWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(block => block[lineNo]).join(' ');
    }

    function drawRow(row, rowNum) {
        const blocks = row.map((cell, colNum) =>
            cell.draw(widths[colNum], heights[rowNum])
        );
        return blocks[0]
            .map((_, lineNo) => drawLine(blocks, lineNo))
            .join('\n');
    }

    return rows.map(drawRow).join('\n');
}

function dataTable(data) {
    const keys = Object.keys(data[0]);
    const headers = keys.map(name =>
        new UnderlinedCell(new TextCell(name))
    );
    const body = data.map(row => {
        return keys.map(name => {
            const value = row[name];
            if (typeof value === 'number')
                return new RTextCell(String(value));
            return new TextCell(String(value));
        });
    });
    return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));







/* ============================================================================
    #Exercise: Another cell
============================================================================ */

class StretchCell {
    constructor(inner, width, height) {
        this.inner = inner;
        this.width = width;
        this.height = height;
    }

    minWidth() {
        return Math.max(this.width, this.inner.minWidth());
    }

    minHeight() {
        return Math.max(this.height, this.inner.minHeight() + 1);
    }

    draw(width, height) {
        return this.inner.draw(width, height - 1)
            .concat([repeat(' ', width)]);
    }
}

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
console.log(sc.minHeight());
console.log(sc.draw(4, 4));







/* ============================================================================
    #Check for correctness
============================================================================ */
function displayChessboard() {
    var rows = [];
    for (var i = 0; i < 5; i++) {
        var row = [];
        for (var j = 0; j < 5; j++) {
            if ((j + i) % 2 == 0)
                row.push(new TextCell("##"));
            else
                row.push(new TextCell("  "));
        }
        rows.push(row);
    }
    console.log(drawTable(rows));
}

displayChessboard();
