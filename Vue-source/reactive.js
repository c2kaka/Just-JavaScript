let data = {
	price: 5,
	quantity: 2,
};

let target, total, salePrice;

class Dep {
	constructor() {
		this.subs = [];
	}

	depend() {
		if (target && !this.subs.includes(target)) {
			this.subs.push(target);
		}
	}

	notify() {
		this.subs.forEach((sub) => sub());
	}
}

let dep = new Dep();

Object.keys(data).forEach((key) => {
	let internalValue = data[key];

	Object.defineProperty(data, key, {
		get() {
			dep.depend();
			return internalValue;
		},

		set(newVal) {
			internalValue = newVal;
			dep.notify();
		},
	});
});

function watcher(myFunc) {
	target = myFunc;
	target();
	target = null;
}

watcher(() => {
	total = data.price * data.quantity;
});

console.log(total);
data.price = 20;
console.log(total);
