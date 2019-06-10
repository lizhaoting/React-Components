export const empty = function empty() { };
export const identity = function identity(input) { return input; };
export const everyfns = (...fns) => (...args) => {
  for (let i = 0; i < fns.length; i += 1) {
    if (!fns[i](...args)) return false;
  }
  return true;
};
/**
 * Wrapped a function to make sure that no matter how many times this function is called,
 * it will only be triggered once in each tick. (use setTimout internally).
 *
 * @param {function} f - function that will be triggered.
 * @return {function} wrapped function
 */
export const onceEachTick = f => (() => {
  let timer = null;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      f();
      timer = null;
    }, 0);
  };
})();
