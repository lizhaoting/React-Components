import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Checkbox.css';
import Icon from '../Icon/Icon';
import { icons } from '../constants/enums';

/**
 * Checkbox
 */

const Checkbox = props => (
  <div
    className={classnames(style.innercontainer, props.isDisabled && style.disable, props.className)}
    onClick={() => {
      if (props.isDisabled) return;
      const v = typeof props.input.value === 'undefined' ? props.initialValue : props.input.value;
      if (props.onChange) props.onChange(!v);
      props.input.onChange(!v, props.text, props.id);
    }}
  >
    {props.text}
    <input
      type="Checkbox"
      className={style.checkbox}
      disabled={props.isDisabled ? 'disabled' : false}
      checked={typeof props.input.value === 'undefined' ? props.initialValue : props.input.value}
      onChange={() => {}}
    />
    <span
      className={classnames({
        [style.checkboxContainer]: style.checkboxContainer,
        [style.selected]: props.input.value,
        [style.unselected]: !props.input.value,
      })}
    >
      <Icon type={icons.checked} />
    </span>
  </div>
);

Checkbox.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  initialValue: PropTypes.bool,
  onChange: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
};

Checkbox.defaultProps = {
  initialValue: false,
  isDisabled: false,
};

Checkbox.examples = {
  DefaultExample: {
    description: 'Loading Example',
    component: <Checkbox input={{ value: false, onChange: () => {} }} />,
  },
};

export default Checkbox;
