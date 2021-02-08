export const MyPromiseSymbol = Object.freeze({
        state: Symbol('MyPromiseState'),
        result: Symbol('MyPromiseResult'),
        isHandled: Symbol('MyPromiseIsHandled'),
        fulfillReaction: Symbol('MyPromiseFulfillReaction'),
        rejectReaction: Symbol('MyPromiseRejectReaction')
});

export class MyPromise {
    constructor(executor) {
        if (typeof executor === 'undefined') {
            throw new TypeError('Executor missing!');
        }

        if (typeof executor !== 'function') {
            throw new TypeError('Executor must be a function!');
        }

        // initialize properties
        this[MyPromiseSymbol.state] = 'pending';
        this[MyPromiseSymbol.result] = undefined;
        this[MyPromiseSymbol.isHandled] = false;
        this[MyPromiseSymbol.fulfillReaction] = [];
        this[MyPromiseSymbol.rejectReaction] = [];

        const { resolve, reject } = createResolvingFunctions(this);

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
}