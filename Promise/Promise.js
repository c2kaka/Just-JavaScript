function Promise(executor) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;

    const resolve = value => this.value = value;

    const reject = reason => this.reason = reason;

    executor(resolve, reject);
}

Promise.prototype.then = function (onFullFilled = Function.prototype, onRejected = Function.prototype) {
    onFullFilled(this.value);
    onRejected(this.reason);
}

