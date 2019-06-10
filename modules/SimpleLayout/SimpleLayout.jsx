import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './simpleLayout.css';

const SimpleLayout = (props) => {
  const {
    className,
    children,
  } = props;
  return (
    <div className={classNames(style.content, className)}>
      {_.isArray(children) ? children.map((item, index) => (
        <div
          className={`simpleLayout_${index}`}
          key={`item_${index}`}
        >
          {item}
        </div>
      ))
      : children}

    </div>
  );
};

SimpleLayout.defaultProps = {
  className: '',
  children: [],
};

SimpleLayout.style = style;

SimpleLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default SimpleLayout;
