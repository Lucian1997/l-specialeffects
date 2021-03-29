(

export function debounce(fn, time, triggerNow) {
  let t = null, res;
  let debounced = function () {
    let _self = this, args = arguments;
    if (t) {
      clearTimeout(t);
    }
    if (triggerNow) {
      let exec = !t;
      t = setTimeout(function () {
        t = null;
      }, time);
      if (exec) {
        res = fn.apply(_self, args);
      }
    } else {
      t = setTimeout(function () {
        res = fn.apply(_self, args);
      }, time);
    }
    return res;
  }
  // debounced.remove = function () {
  //   clearTimeout(t);
  //   t = null;
  // }
  return debounced;
}

export function throttle(fn, delay) {
  let t = null, begin = new Date().getTime();
  return function () {
    let _self = this, args = arguments, cur = new Date().getTime();
    clearTimeout(t)
    if (cur - begin >= delay) {
      fn.apply(_self, args);
      begin = cur;
    } else {
      t = setTimeout(function () {
        fn.apply(_self, args);
      }, delay)
    }
  }
}

)