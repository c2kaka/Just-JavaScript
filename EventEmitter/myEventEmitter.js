class MyEventEmitter {
    constructor() {
        this.eventMap = new Map();
    }

    on(type, handler) {
        if (!(handler instanceof Function)) {
            throw TypeError('handler must be a function');
        }

        if (!this.eventMap.has(type)) {
            this.eventMap.set(type, []);
        }

        this.eventMap.get(type).push(handler);
    }

    emit(type, params) {
        if (this.eventMap.has(type)) {
            for (const handler of this.eventMap.get(type)) {
                handler(params);
            }
        }
    }

    off(type, handler) {
        if (this.eventMap.has(type)) {
            this.eventMap.get(type).splice(this.eventMap.get(type).indexOf(handler), 1);
        }
    }
}

const myEvent = new MyEventEmitter();
// 编写一个简单的 handler
const testHandler = function (params) {
  console.log(`test事件被触发了，testHandler 接收到的入参是${params}`);
};
// 监听 test 事件
myEvent.on("test", testHandler);
// 在触发 test 事件的同时，传入希望 testHandler 感知的参数
myEvent.emit("test", "newState");