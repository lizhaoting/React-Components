import * as _ from 'lodash';

/**
 * High order function to create helper function for `shouldComponentUpdate`.
 *
 * @param {string} name - Component name. Use to output useful info in development mode.
 * @param {string[]} propKeys - Keys of props that should trigger component update if values are
 * different in two render cycle.
 * @param {string[]} stateKeys - Keys of states that should trigger component update if values are
 * different in two render cycle.
 * @return {function(object,object,object,object):boolean} Helper function to determine whether
 * component should be updated.
 */
export const shouldComponentUpdateGen = (name, propKeys = [], stateKeys = []) =>
/**
 * @param {object} props - Current props.
 * @param {object} nextProps - Props in next cycle.
 * @param {?object} state - Current state (optional).
 * @param {?object} nextState - State in next cycle.
 * @return {boolean} Whether component should update
 */
(props, nextProps, state = { }, nextState = { }) => {
  const shouldComponentUpdate = propKeys.some((key) => {
    let shouldUpdate = false;
    if (process.env.NODE_ENV !== 'production' && key.indexOf('.') > 0) {
      console.error('[ERROR]: _.get() does not support path with ".", please modify!');
    }
    const nextValue = _.get(nextProps, key);
    const value = _.get(props, key);
    if (nextValue !== value) {
      shouldUpdate = true;
    } else if (nextValue instanceof Date) {
      if (JSON.stringify(nextValue) !== JSON.stringify(value)) {
        shouldUpdate = true;
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      if (shouldUpdate) {
        console.groupCollapsed(`Component ${name} should update because of prop ${key}`);
        console.log('previous: ', value && value.toJS ? value.toJS() : value);
        console.log('current: ', nextValue && nextValue.toJS ? nextValue.toJS() : nextValue);
        console.groupEnd();
      }
    }
    return shouldUpdate;
  }) ||
  stateKeys.some((key) => {
    let shouldUpdate = false;
    const nextValue = _.get(nextState, key);
    const value = _.get(state, key);
    if (nextValue !== value) {
      shouldUpdate = true;
    } else if (nextValue instanceof Date) {
      if (JSON.stringify(nextValue) !== JSON.stringify(value)) {
        shouldUpdate = true;
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      if (shouldUpdate) {
        console.groupCollapsed(`Component ${name} should update because of state ${key}`);
        console.log('previous: ', value && value.toJS ? value.toJS() : value);
        console.log('current: ', nextValue && nextValue.toJS ? nextValue.toJS() : nextValue);
        console.groupEnd();
      }
    }
    return shouldUpdate;
  });

  if (process.env.NODE_ENV !== 'production') {
    if (!shouldComponentUpdate) {
      const notEqualPropKeys = getNotEqualKeys(props, nextProps);
      if (notEqualPropKeys.length > 0) {
        console.groupCollapsed(`Component ${name} should not update but has following prop changes:`);
        notEqualPropKeys.forEach((key) => {
          const value = props[key];
          const nextValue = nextProps[key];
          console.group(`Prop with key: ${key}`);
          console.log('previous: ', value && value.toJS ? value.toJS() : value);
          console.log('current: ', nextValue && nextValue.toJS ? nextValue.toJS() : nextValue);
          console.groupEnd();
        });
        console.groupEnd();
      }
      const notEqualStateKeys = getNotEqualKeys(state, nextState);
      if (notEqualStateKeys.length > 0) {
        console.groupCollapsed(`Component ${name} should not update but has following state changes:`);
        notEqualStateKeys.forEach((key) => {
          const value = state[key];
          const nextValue = nextState[key];
          console.group(`State with key: ${key}`);
          console.log('previous: ', value && value.toJS ? value.toJS() : value);
          console.log('current: ', nextValue && nextValue.toJS ? nextValue.toJS() : nextValue);
          console.groupEnd();
        });
        console.groupEnd();
      }
    }
  }

  return shouldComponentUpdate;
};


/**
 * 元素比较，一般用于排序
 */
export const compare = (a, b) => {
  if (a === null || b === null) {
      return a === null ? -1 : 1;
  }
  const type = typeof a;
  if (type !== typeof b) {
      return 0;
  }
  if (type === 'number') {
      return a - b;
  }
  if (type === 'string') {
      return compareStr(a, b);
  }
  if (type === 'object') {
      if (a instanceof Date) {return compareDate(a, b);}
      if (Object.prototype.toString.call(a) === '[object Arrary]') {
          return compareArray(a, b);
      }
  }
  return compareStr(a.toString(), b.toString());
};

const compareStr = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a === b) {return 0;}
  return a > b ? 1 : -1;
};

const compareDate = (a, b) => a.getTime() - b.getTime();

const compareArray = (a, b) => {
  for (let i = 0; i < a.length || a < b.length; i += 1) {
      const res = this.compare(a[i], b[i]);
      if (res !== 0) {return res;}
  }
  return a.length - b.length;
};

/** 元素大小比较 结束 */

