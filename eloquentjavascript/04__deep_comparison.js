function deepEqual(v1, v2) {
    if (Object.keys(v1).length !== Object.keys(v2).length) return false;

    for (item in v1) {
        if (typeof v1[item] === 'object') return deepEqual(v1[item], v2[item]);
        if (v1[item] !== v2[item]) return false;
    }

    return true;
}

var obj1 = {here: {is: "an"}, object: 2};
var obj2 = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj1, Object.assign(obj2, { new: 'field' })));
