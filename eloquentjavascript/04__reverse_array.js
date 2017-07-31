function reverseArray(arr) {
    return arr.reduce((acc, val) => [val].concat(acc), []);
}

function reverseArrayInPlace(arr) {
    function swap(arr, index1, index2) {
        let temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        return arr;
    }
    function reverse(a, startindex, endindex) {
        if (startindex >= endindex) return a;
        return reverse(
            swap(a, startindex, endindex),
            startindex + 1,
            endindex - 1
        );
    }
    return reverse(arr, 0, arr.length - 1);
}

var list = [1, 2, 3, 4, 6, 5];

console.log(reverseArray(list));
console.log(list);

console.log(reverseArrayInPlace(list));
console.log(list);
