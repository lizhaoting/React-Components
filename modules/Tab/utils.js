import _ from 'lodash';

export function getIndexByKey(tabs, key) {
  return _.findIndex(tabs, tab => tab.key === key);
}

export function swapTabs(tabs, indexA, indexB) {
  const reorder = Object.assign([], tabs);
  if (indexA >= 0 && indexA < tabs.length && indexB >= 0 && indexB < tabs.length) {
    const tmp = Object.assign({}, reorder[indexA]);
    reorder[indexA] = Object.assign({}, tabs[indexB]);
    reorder[indexB] = Object.assign({}, tmp);
  }
  return reorder;
}
