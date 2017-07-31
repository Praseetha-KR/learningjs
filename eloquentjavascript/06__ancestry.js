const ANCESTRY_FILE = require('./data/ancestry');
const ANCESTRY = JSON.parse(ANCESTRY_FILE);

/* ============================================================================
    #Born Between
============================================================================ */
function bornBetween(y1, y2, arr) {
    return arr.filter(v => v.born > y1 && v.born < y2);
}
console.log('Young people in 1924', bornBetween(1900, 1925, ANCESTRY));

/* ============================================================================
    #Above Age
============================================================================ */
function aboveAge(age, arr) {
    return arr.filter(v => v.died - v.born > age).map(v => v.name);
}
console.log('Over 90', aboveAge(90, ANCESTRY));

/* ============================================================================
    #Most Ancient
============================================================================ */
function mostAncient(arr) {
    return arr.reduce((min, curr) => {
        if (min.born > curr.born) return curr;
        return min;
    });
}
console.log('Most ancient', mostAncient(ANCESTRY));

/* ============================================================================
    #Avg age
============================================================================ */
function average(arr) {
    return arr.reduce((prev, curr) => prev + curr) / arr.length;
}
function male(p) {
    return p.sex === 'm';
}
function female(p) {
    return p.sex === 'f';
}
function age(p) {
    return p.died - p.born;
}

console.log('Male avg age', average(ANCESTRY.filter(male).map(age)));
console.log('Female avg age', average(ANCESTRY.filter(female).map(age)));

/* ============================================================================
    #byName
============================================================================ */
function fieldObjMap(field, arr) {
    return arr.reduce((acc, curr) => {
        acc[curr[field]] = curr;
        return acc;
    }, {});
}
const byName = fieldObjMap('name', ANCESTRY);

/* ============================================================================
    #Shared DNA
============================================================================ */
function reduceAncestors(person, f, defaultValue) {
    function valueFor(person) {
        if (!person) return defaultValue;
        return f(
            person,
            valueFor(byName[person.mother]),
            valueFor(byName[person.father])
        );
    }
    return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
    if (person.name === 'Pauwels van Haverbeke') return 1;
    return (fromMother + fromFather) / 2;
}

const ph = byName['Philibert Haverbeke'];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

/* ============================================================================
    #long living percentage
============================================================================ */
function countAncestors(person, cb) {
    function combine(current, fromMother, fromFather) {
        const thisOneCounts = current != person && cb(current);
        return fromMother + fromFather + (thisOneCounts ? 1 : 0);
    }
    return reduceAncestors(person, combine, 0);
}

function longLivingPercentage(person) {
    const all = countAncestors(person, p => true);
    const longLiving = countAncestors(person, p => p.died - p.born >= 70);
    return longLiving / all;
}
console.log(longLivingPercentage(byName['Emile Haverbeke']));

/* ============================================================================
    #isInSet
============================================================================ */
var theSet = ['Carel Haverbeke', 'Maria van Brussel', 'Donald Duck'];

function isInSet(set, person) {
    return set.indexOf(person.name) !== -1;
}

console.log(ANCESTRY.filter(isInSet.bind(null, theSet)));

/* ============================================================================
    #Exercise: Mother-child age difference
============================================================================ */
function motherChildAgeDiffAvg(arr) {
    return average(
        arr
            .filter(p => byName[p.mother])
            .map(person => person.born - byName[person.mother].born)
    );
}
console.log(motherChildAgeDiffAvg(ANCESTRY));

/* ============================================================================
    #Exercise: Historical life expectancy
============================================================================ */
function centuryToPersonMap(arr) {
    let map = {};
    arr.forEach(p => {
        const key = Math.ceil(p.died / 100);
        map[key] = !map[key] ? [p] : map[key].concat(p);
    });
    return map;
}

function avgAgeCentury(arr) {
    const centuryPersonMap = centuryToPersonMap(arr);
    let centuryAvgAge = {};
    for (entry in centuryPersonMap) {
        centuryAvgAge[entry] = average(
            centuryPersonMap[entry].map(p => p.died - p.born)
        );
    }
    return centuryAvgAge;
}

console.log(avgAgeCentury(ANCESTRY));
