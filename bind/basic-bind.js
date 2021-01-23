function basicBind(context) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1);

    return function bound () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);

        return me.apply(context, finalArgs);
    }
}
