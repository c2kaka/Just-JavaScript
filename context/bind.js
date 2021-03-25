Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('this must be a function');
    }

    const self = this;

    /**
     * 分两种情况： 当这个绑定函数被当做普通函数调用的时候，可以直接用context； 
     * 而返回的这个之后当做构造函数使用的时候，却是指向这个实例，所以this instanceof self为true时，要用this。 因此这里加了这个判断。
     */
    let bound = function () {
        return self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    }

    if (this.prototype) {
        bound.prototype = Object.create(this.prototype);
    }

    return bound;
};

let a = {
    name: 'jack',
    getName: function (msg) {
        return msg + this.name;
    }
}
let b = {
    name: 'lily'
}
console.log(a.getName('hello~'));  // hello~jack
console.log(a.getName.myBind(b, 'hi~')());  // hi~lily

