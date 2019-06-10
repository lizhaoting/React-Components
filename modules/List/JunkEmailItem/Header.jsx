/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Icon from '../../Icon/Icon';
import style from '../item.css';

const Header = (props) => {
  const { itemData } = props;
  return (
    <div className={style.firstline}>
      <div className={style.nameandstatus}>
        <span className={style.sendby}>{itemData.name}</span>
      </div>
      <div className={style.clear}>&nbsp;</div>
    </div>
  );
};

export default Header;

