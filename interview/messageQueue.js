/**
 * 页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响，每次请求回来的数据都为按钮的名字。
 * 请实现当用户依次点击 A、B、C、A、C、B 的时候，最终获取的数据为 ABCACB。
 */

class MessageQueue {
    constructor() {
        this.data = [];
    }

    push(param) {
        let index = Symbol();
        this.data.push(index);

        new Promise((resolve, reject) => {
            setTimeout(() => resolve(param), Math.floor(Math.random * 100));
        }).then(res => {
            this.data.forEach((value, i) => {
                if (value === index) {
                    this.data[i] = res;
                }
            });
            
            this.run();
        });
    }

    run() {
        if (this.data[0] && typeof this.data[0] !== 'symbol') {
            console.log(this.data[0]);
            this.data.shift();
            this.run();
        }
    }
}

let mq = new MessageQueue();

mq.push('a');
mq.push('b');
mq.push('c');
mq.push('a');
mq.push('c');
mq.push('b');
