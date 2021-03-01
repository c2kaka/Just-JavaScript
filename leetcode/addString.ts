function addStrings(num1: string, num2: string): string {
    let i = num1.length - 1;
    let j = num2.length - 1;
    let res = [];
    let add = 0;

    while (i >= 0 || j >= 0 || add > 0) {
        const num1Item = +num1[i] >= 0 ? +num1[i] : 0;
        const num2Item = +num2[j] >= 0 ? +num2[j] : 0;
        const sum = num1Item + num2Item + add;
        res.push(sum % 10);
        add = Math.floor(sum / 10);
        i--;
        j--;
    }

    return res.reverse().join('');
}