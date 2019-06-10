import React from 'react';
import Column from './Column';

export const findColumn = (children) => {
  const type = Column.displayName || Column.name;
  const ret = [];
  React.Children.forEach(children, (child) => {
    if (child && child.type && (child.type.displayName || child.type.name) === type) {
      ret.push(child);
    }
  });
  return ret;
};
