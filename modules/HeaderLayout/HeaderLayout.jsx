import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './headerLayout.css';
import Left from './Item/Left';
import Middle from './Item/Middle';
import Right from './Item/Right';

const HeaderLayout = props => (
  <div className={classnames(style.content, props.className)}>
    {props.children}
  </div>
);

HeaderLayout.defaultProps = {
  className: '',
  children: null,
};

HeaderLayout.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
HeaderLayout.style = style;
HeaderLayout.Left = Left;
HeaderLayout.Middle = Middle;
HeaderLayout.Right = Right;

export default HeaderLayout;
