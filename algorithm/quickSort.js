const quickSort = (array, left, right) => {
    if (left < right) {
        const pivot = right;
        let partitionIndex = getPartition(array, left, right, pivot);
        quickSort(array, left, partitionIndex - 1 > left ? partitionIndex - 1 : left);
        quickSort(array, right > partitionIndex + 1 ? partitionIndex + 1 : right, right);
    }
}

const getPartition = (array, left, right, pivot) => {
    const pivotValue = array[pivot];
    let startIndex = left;
    for (i = left; i < right; i++) {
        if (array[i] < pivotValue) {
            [array[startIndex], array[i]] = [array[i], array[startIndex]];
            startIndex++;
        }
    }

    [array[startIndex], array[pivot]] = [array[pivot], array[startIndex]];

    return startIndex;
}

const testArr = []
let i = 0
while (i < 10) {
    testArr.push(Math.floor(Math.random() * 1000))
    i++
}
console.log('unsort', testArr)
quickSort(testArr, 0, testArr.length - 1);
console.log('sort', testArr)
