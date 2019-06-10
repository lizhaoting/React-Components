/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import style from '../item.css';

const Msg = (props) => {
  const { itemData } = props;
  return (
    <div
      className={style.lastmsg}
      dangerouslySetInnerHTML={{
        __html: itemData.lastMessage,
      }}
    />
  );
};

export default Msg;
