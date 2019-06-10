import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Select.css';
import Icon from '../Icon/Icon';

const Option = props => (
  <li
    unselectable="unselectable"
    onMouseDown={() => {
      props.onChange(props.value);
    }}
    id={props.value === props.selectedValue ? props.id : ''}
    className={classnames(style['dropdown-menu-item'], props.value === props.selectedValue && style['dropdown-menu-item-selected'], props.className)}
    role="menuitem"
  >
    {
      props.icon && <Icon  type={props.icon} size={props.iconSize} className={style.optionIcon} />
    }
    {props.text}
    {
      props.tag && <span className={style.tagStyle} style={{color: props.tagTheme}}>{props.tag}</span>
    }
  </li>
);

Option.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  text: PropTypes.string.isRequired,
};

export default Option;
