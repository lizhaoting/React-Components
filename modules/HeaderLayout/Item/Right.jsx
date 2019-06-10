import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from '../headerLayout.css';

const Right = props => (
  <div className={classNames(style.right, props.className)}>
    {props.children}
  </div>
);

Right.defaultProps = {
  className: '',
};

Right.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Right;