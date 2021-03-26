function throttle(fn, wait) {
    let lastTime = 0;

    return function(...args) {
        let now = + new Date();

        if (now - lastTime > wait) {
            lastTime = now;
            fn.apply(this, args)
        }
    }
}

let timer = setInterval(
    throttle(() => {
      console.log(1)
    }, 500),
    1
  )

  clearInterval(timer);
  timer = null;