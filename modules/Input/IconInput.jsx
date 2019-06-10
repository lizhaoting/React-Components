import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Input.css';
import IconInputStyle from './IconInput.css';
import Input from './Input';
import Icon from '../Icon/Icon';
import { icons } from '../constants/enums';

const IconInput = (props) => {
  const { icon, ...inputProps } = props;
  const { className, ...otherProps } = inputProps;
  return (
    <div
      className={classnames(
        style.prependContainer,
        className,
        props.showError && props.error && style.error
      )}
    >
      <div className={style.prependIcon}>
        {icon}
      </div>
      <Input
        className={IconInputStyle.input}
        {...otherProps}
      />
    </div>
  );
};

IconInput.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  error: PropTypes.string,
  showError: PropTypes.bool,
};

IconInput.defaultProps = {

};

IconInput.examples = {
  DefaultExample: {
    description: 'Icon Input Example',
    component: <IconInput
      input={{}}
      meta={{}}
      name="email"
      type="email"
      placeholder="Email"
      icon={<Icon type={icons.loginUser} color="#aaa" size="larger" />}
    />,
  },
  PasswordExample: {
    description: 'Password Input Example',
    component: <IconInput
      input={{}}
      meta={{}}
      name="password"
      type="password"
      placeholder="Password"
      icon={<Icon type={icons.loginPassword} color="#aaa" size="larger" />}
    />,
  },
};

export default IconInput;
