import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import style from './Button.css';
import Icon from '../Icon/Icon';
import { icons } from '../constants/enums';

// large => lg
// small => sm
const sizeClassMapping = {
  large: 'btn-lg',
  small: 'btn-sm',
};

const buttonClassMapping = {
  primary: 'btn-primary',
  default: 'btn-default',
  gray: 'btn-gray',
  noborder: 'btn-noborder',
  special: 'btn-special',
};

class Button extends React.Component {
  shouldComponentUpdate(nextProps) {
    /** @todo prefer more precise comparison */
    return !_.isEqual(this.props, nextProps);
  }
  render() {
    const {
      disabled,
      text,
      onClick,
      className,
      htmlType,
      loading,
      size,
      icon,
      iconPosition,
      type,
      children,
      ...others
    } = this.props;

    const sizeCls = sizeClassMapping[size] || '';
    const btnCls = buttonClassMapping[type] || 'btn-default';
    let iconComponent = null;
    if (loading) {
      iconComponent = <Icon type={icons.loading} />;
    } else if (icon) {
      iconComponent = icon;
    }
    return (
      <button
        {...others}
        className={classnames(
          style.btn,
          disabled && style.disabled,
          style[sizeCls],
          style[btnCls],
          className,
        )}
        disabled={disabled ? 'disabled' : false}
        onClick={disabled ? undefined : () => onClick()}
        type={htmlType}
      >
        {iconPosition !== 'right' && iconComponent }
        {iconPosition !== 'right' && children }
        {text && <span>
          {text}
        </span>}
        {iconPosition === 'right' && children }
        {iconPosition === 'right' && iconComponent }
      </button>
    );
  }
}

Button.propTypes = {
  /** button type */
  type: PropTypes.oneOf(['primary', 'default', 'gray', 'noborder']),
  /** text showed in button */
  text: PropTypes.string,
  /** whether button is disabled */
  disabled: PropTypes.bool,
  /** onClick callback function, no param is passed in when called */
  onClick: PropTypes.func,
  /** additional className */
  className: PropTypes.string,
  /** icon Position */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  icon: PropTypes.element,
  /** whether show loading icon */
  loading: PropTypes.bool,
  /** size of button */
  size: PropTypes.oneOf(['large', 'default', 'small']),
  /** type of button, 'submit' is common example */
  htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]),
};

/* eslint-disable */
Button.examples = {
  DefaultExample: {
    description: 'Loading Example',
    component: <Button text="Click Me!" loading iconPosition="right" />,
  },
  DisabledButton: {
    description: 'Disabled Button',
    component: <Button text="Disabled!" disabled size="large">
      <Icon type={icons.loginUser} size="normal" />
    </Button>,
  },
  BlueButton: {
    description: 'Blue Button',
    component: <Button type="primary" text="Log In" size="large" iconPosition="right">
      <Icon type={icons.loginUser} size="normal" />
    </Button>,
  },
  GrayButton: {
    description: 'Gray Button',
    component: <Button type="gray" text="Log In" />,
  },
  NoborderButton: {
    description: 'Noborder Button',
    component: <Button type="noborder" text="GET HELP" htmlType="button" icon={<Icon type={icons.loginHelp} size="small" />} />,
  },
};
/* eslint-enable */

export default Button;
