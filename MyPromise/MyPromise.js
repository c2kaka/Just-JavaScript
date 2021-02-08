export const MyPromiseSymbol = Object.freeze({
        state: Symbol('MyPromiseState'),
        result: Symbol('MyPromiseResult'),
        isHandled: Symbol('MyPromiseIsHandled'),
        fulfillReaction: Symbol('MyPromiseFulfillReaction'),
        rejectReaction: Symbol('MyPromiseRejectReaction')
});

export function createResolvingFunctions(myPromise) {
    const alreadyResolved = {value: false};

    const resolve = resolution => {
        // TODO
    };

    resolve.alreadyResolved = alreadyResolved;
    resolve.myPromise = myPromise;

    const reject = reason => {
       if (alreadyResolved.value) {
           return;
       }

       alreadyResolved.value = true;
       return rejectMyPromise(myPromise, reason);
    };

    reject.alreadyResolved = alreadyResolved;
    reject.myPromise = myPromise;

    return {
        resolve,
        reject
    };
}

export function rejectMyPromise(myPromise, reason) {
    if (myPromise[MyPromiseSymbol.state] !== 'pending') {
        throw new Error('MyPromise is already settled!');
    }

    const reactions = myPromise[MyPromiseSymbol.rejectReaction];

    myPromise[MyPromiseSymbol.result] = reason;
    myPromise[MyPromiseSymbol.fulfillReaction] = undefined;
    myPromise[MyPromiseSymbol.rejectReaction] = undefined;
    myPromise[MyPromiseSymbol.state] = 'rejected';

    if (!myPromise[MyPromiseSymbol.isHandled]) {
        // TODO: perform HostPromiseRejectionTracker(promise, "reject").
    }

    // TODO: Return `TriggerPromiseReactions(reactions, reason)`.
}

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