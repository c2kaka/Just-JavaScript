Array.prototype.iReduce = function (callback, accumulator) {
    accumulator = accumulator === undefined ? 0 : accumulator;
    for (let i = 0; i < this.length; i++) {
        accumulator = callback(this[i], accumulator);
    }

    return accumulator;
}

const array1 = [2, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(array1.iReduce(reducer, 0));
console.log(array1.iReduce(reducer));