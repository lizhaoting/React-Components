import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './cornerMark.css';

const CornerMark = (props) => {
  const { num, className, ifShowSimple } = props;
  return (
    <span className={classNames(style.cornermark, className)}>
      {(ifShowSimple && num > 99) ?
        <span>99<span className={style.simple}>+</span></span> : num}
    </span>
  );
};

CornerMark.propTypes = {
  num: PropTypes.number,
  className: PropTypes.string,
  ifShowSimple: PropTypes.bool,
};

export default CornerMark;
