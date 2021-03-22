const isComplexDataType = obj => {
    return (typeof obj === 'object' || typeof obj === 'function') && obj !== null;
}

const deepClone = (obj, map = new WeakMap()) => {
    if (obj.constructor === Date) {
        return new Date(obj);
    }

    if (obj.constructor === RegExp) {
        return new RegExp(obj);
    }

    if (map.has(obj)) { //防止循环引用
        return map.get(obj);
    }

    let allDesc = Object.getOwnPropertyDescriptor(obj); //遍历传入参数所有键的特性
    let cloneObj = Object.create(obj, allDesc); //继承原型链

    map.set(obj, cloneObj);

    for (const key of Reflect.ownKeys(obj)) {
        cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], map) : obj[key];
    }

    return cloneObj;
}

// 下面是验证代码
let obj = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: { name: '我是一个对象', id: 1 },
    arr: [0, 1, 2],
    func: function () { console.log('我是一个函数') },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    [Symbol('1')]: 1,
  };
  Object.defineProperty(obj, 'innumerable', {
    enumerable: false, value: '不可枚举属性' }
  );
  obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
  obj.loop = obj    // 设置loop成循环引用的属性
  let cloneObj = deepClone(obj)
  cloneObj.arr.push(4)
  console.log('obj', obj)
  console.log('cloneObj', cloneObj)