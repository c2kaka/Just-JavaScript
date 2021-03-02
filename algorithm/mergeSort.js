const mergeSort = array => {
    if (array.length <= 1) {
        return array;
    }

    const middleIndex = Math.floor(array.length / 2);
    const leftArray = array.slice(0, middleIndex);
    const rightArray = array.slice(middleIndex);

    return merge(mergeSort(leftArray), mergeSort(rightArray));
}

const merge = (leftArray, rightArray) => {
    let temp = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftArray.length > leftIndex && rightArray.length > rightIndex) {
        if (leftArray[leftIndex] > rightArray[rightIndex]) {
            temp.push(rightArray[rightIndex]);
            rightIndex++;
        } else {
            temp.push(leftArray[leftIndex]);
            leftIndex++;
        }
    }

    return temp.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex));
};

let testArr = []
let i = 0
while (i < 10) {
    testArr.push(Math.floor(Math.random() * 1000))
    i++
}
console.log('unsort', testArr)
const res = mergeSort(testArr);
console.log('sort', res)