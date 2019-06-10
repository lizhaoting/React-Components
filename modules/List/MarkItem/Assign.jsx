/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import style from '../item.css';

const Assign = (props) => {
  const { itemData } = props;
  return (
    <div className={style.agentanddepartment}>
      {itemData.assigneeString}
    </div>
  );
};

export default Assign;
