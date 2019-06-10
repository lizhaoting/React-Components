import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from '../headerLayout.css';

const Middle = props => (
  <div className={classNames(style.middle, props.className)}>
    {props.children}
  </div>
);

Middle.defaultProps = {
  className: '',
};

Middle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Middle;