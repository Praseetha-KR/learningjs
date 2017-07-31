const JOURNAL = require('./data/jacques_journal');

function phi(arr) {
    return (
        (arr[3] * arr[0] - arr[2] * arr[1]) /
        Math.sqrt(
            (arr[2] + arr[3]) *
                (arr[0] + arr[1]) *
                (arr[1] + arr[3]) *
                (arr[2] + arr[0])
        )
    );
}

function hasEvent(event, entry) {
    return entry.events.indexOf(event) !== -1;
}

function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    journal.forEach(entry => {
        let index = 0;
        if (hasEvent(event, entry)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 2;
    });
    return table;
}

function gatherCorrelations(journal) {
    phis = {};
    journal.forEach(entry => {
        events = entry.events;
        events.forEach(e => {
            if (!phis[e]) {
                phis[e] = phi(tableFor(e, journal));
            }
        });
    });
    return phis;
}

function topCorrelations(correlations, threshold) {
    return Object.keys(correlations)
        .filter(
            c => correlations[c] > threshold || correlations[c] < -1 * threshold
        )
        .reduce((acc, curr) => {
            acc[curr] = correlations[curr];
            return acc;
        }, {});
}

function phiCoexistence(include, exclude, journal) {
    function mergeEventLabels(arr) {
        return arr
            .map(v => v.replace(/\s/g, ''))
            .reduce((prev, curr) => `${prev}_${curr}`);
    }

    const COEXISTANCE_LABEL = mergeEventLabels(include.concat(exclude));
    journal.forEach(entry => {
        let union = true;
        include.forEach(event => {
            union = union && hasEvent(event, entry);
        });
        exclude.forEach(event => {
            union = union && !hasEvent(event, entry);
        });
        if (union) entry.events.push(COEXISTANCE_LABEL);
    });

    return {
        [COEXISTANCE_LABEL]: phi(tableFor(COEXISTANCE_LABEL, journal))
    };
}

console.log(topCorrelations(gatherCorrelations(JOURNAL), 0.1));

console.log(
    phiCoexistence(
        ['peanuts', 'spaghetti'],
        ['brushed teeth', 'candy'],
        JOURNAL
    )
);
