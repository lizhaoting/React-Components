import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from './Button';
import style from './Button.css';
import Icon from '../Icon/Icon';
import { icons } from '../constants/enums';

// large => lg
// small => sm
const sizeClassMapping = {
  large: 'btn-group-lg',
  small: 'btn-group-sm',
};

const ButtonBar = (props) => {
  const {
    className,
    size,
    ...others
  } = props;

  const sizeCls = sizeClassMapping[size] || '';
  return (
    <div
      {...others}
      className={classnames(
        style['btn-group'],
        style[sizeCls],
        className
      )}
    />
  );
};

ButtonBar.propTypes = {
  /** additional className */
  className: PropTypes.string,
  /** size of button */
  size: PropTypes.oneOf(['large', 'default', 'small']),
};

ButtonBar.examples = {
  DefaultExample: {
    description: 'Default Example',
    component: <ButtonBar>
      <Button>
        <Icon type={icons.loginUser} />
      </Button>
      <Button type="primary" text="second" />
      <Button type="gray" text="last" />
    </ButtonBar>,
  },
};

export default ButtonBar;
