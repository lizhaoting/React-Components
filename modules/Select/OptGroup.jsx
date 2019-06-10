import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Select.css';
import Option from './Option';

const OptGroup = props => (
  <li
    unselectable="unselectable"
    className={classnames(style['dropdown-menu-item-group'], props.className)}
    role="menuitem"
  >
    <div className={style['dropdown-menu-item-group-title']}>{props.label}</div>
    <ul className={style['dropdown-menu-item-group-list']}>
      {props.children}
    </ul>
  </li>
);

OptGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.instanceOf(Option)),
};

OptGroup.type = 1;
export default OptGroup;
