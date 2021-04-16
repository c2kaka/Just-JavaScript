function _new(ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new TypeError('ctor must be a function');
    }

    let obj = {};
    obj.__proto__ = Object.create(ctor.prototype);
    let res = ctor.apply(obj, [...args]);

    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typeof res === 'function';

    return isObject || isFunction ? res : obj;
}

function test() {
    this.name = 'test';
}

test.prototype.getName = function () {
    console.log(this.name);
}

let res = _new(test, 'c');
console.log(res);
res.getName();