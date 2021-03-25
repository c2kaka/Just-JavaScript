const flattenRecursion = array => {
    let res = [];
    
    for (const item of array) {
        if (Array.isArray(item)) {
            res = res.concat(flattenRecursion(item));
        } else {
            res.push(item);
        }
    }

    return res;
}

const flattenReduce = array => {
    return array.reduce(function (accumulator, currentValue) {
        return accumulator.concat(Array.isArray(currentValue) ? flattenReduce(currentValue) : currentValue);
    }, []);
}

const flattenDot = array => {
    while (array.some(item => Array.isArray(item))) {
        array = [].concat(...array);
    }

    return array;
}

const flattenSplit = array => {
    return array.toString().split(',');
}

const flattenES6 = array => {
    return array.flat(Infinity);
}

const a = [1, [2, [3, 4, 5]]];
// console.log(flattenRecursion(a));
console.log(flattenES6(a))