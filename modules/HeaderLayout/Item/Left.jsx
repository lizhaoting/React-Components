import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from '../headerLayout.css';

const Left = props => (
  <div className={classNames(style.left, props.className)}>
    {props.children}
  </div>
);

Left.defaultProps = {
  className: '',
};

Left.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Left;
