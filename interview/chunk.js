/**
 * chunk(['a', 'b', 'c', 'd', 'e'], 2)
 * 输出： [['a', 'b'], ['c', 'd'], ['e']]
 * 
 * chunk(['a', 'b', 'c', 'd', 'e'], 3)
 * 输出： [['a', 'b', 'c'], ['d', 'e']]
 */

function chunk(input, size) {
    size = Math.max(Math.floor(Number(size)), 0);
    if (!Array.isArray(input)) {
        return [];
    }

    if (size < 1) {
        return [];
    }

    let result = [];
    let start = 0;
    while (start < input.length) {
        result.push(input.slice(start, start + size));
        start += size;
    }

    return result;
}

console.log(chunk(['a', 'b', 'c', 'd', 'e'], 2));
console.log(chunk(['a', 'b', 'c', 'd', 'e'], 3))