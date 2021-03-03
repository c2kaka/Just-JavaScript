function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, duration)
    });
}

// sleep(1000).then(() => console.log('awake'));

function timeout(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms, 'done');
    });
}

// timeout(100).then(value => console.log(value));

// example: 一个异步操作的结果是返回另一个异步操作
const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('p1 failed!')), 3000);
});

const p2 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(p1), 1000);
});

p2
.then(res => console.log(res))
.catch(error => console.log(error));