import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import style from './Tab.css';

const TabIcon = (props) => {
  const { icon, selected } = props;
  if (icon.type) {
    return (<Icon
      type={icon.type}
      color={selected ? icon.hoverColor : '#888'}
      hoverColor={icon.hoverColor}
      className={style.itemIcon}
    />);
  }
  return <img src={icon.url} width={20} height={20} className={style.itemIcon} alt={''} />;
};

TabIcon.propTypes = {
  icon: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool,
};

TabIcon.defaultProps = {
  selected: false,
};

export default TabIcon;
