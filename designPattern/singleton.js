/**
 * 使用类实现单例模式
 * @param {*} name 
 */
var Singleton = function(name) {
    this.name = name;
    this.instance = null;
}

Singleton.prototype.getName = function() {
    return this.name;
}

Singleton.getInstance = function(name) {
    if (this.instance === null) {
        this.instance = new Singleton(name);
    }
    return this.instance;
}

var a = Singleton.getInstance( 'sven1' ); 
var b = Singleton.getInstance( 'sven2' );
console.log(a === b);

/**
 * 使用闭包和高阶函数实现单例模式
 */

var getSingleton = function(fn) {
    var result;

   return function() {
       return result || (result = fn.apply(this, arguments));
   }
}