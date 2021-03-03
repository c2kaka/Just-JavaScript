const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function ToyPromise(executor) {
    const that = this;
    that.state = PENDING;
    that.value = null;
    that.resolveCallbackFuncs = [];
    that.rejectCallbackFuncs = [];

    function resolve(value) {
        if (that.state === PENDING) {
            that.state = RESOLVED;
            that.value = value;
            that.resolveCallbackFuncs.map(callback => callback(value));
        }
    }

    function reject(value) {
        if (that.state === PENDING) {
            that.state = REJECTED;
            that.value = value;
            that.rejectCallbackFuncs.map(callback => callback(value));
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

ToyPromise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    if (that.state === PENDING) {
        that.resolveCallbackFuncs.push(onFulfilled);
        that.rejectCallbackFuncs.push(onRejected);
    }

    if (that.state === RESOLVED) {
        onFulfilled(that.value);
    }

    if (that.state === REJECTED) {
        onRejected(that.value);
    }
}

new ToyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 0)
  }).then(value => {
    console.log(value)
  })
