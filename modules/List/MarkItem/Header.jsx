/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import Icon from '../../Icon/Icon';
import style from '../item.css';
import commonStyle from '../../Common/common.css';

const Header = (props) => {
  const { itemData } = props;
  return (
    <div className={style.firstline}>
      <div className={style.nameandstatus}>
        <Icon
          data-for={itemData.status.tipPosition}
          data-tip={itemData.status.tip}
          color={itemData.status.color}
          type={itemData.status.iconType}
          className={style.status}
        />
        {itemData.isHaveDraft && (
          <span className={commonStyle.fontSize15_fe8e14}>[draft]</span>
        )}
        <span className={style.sendby}>{itemData.replierName}</span>
      </div>
      <div className={style.sourceandpriority}>
        {(itemData.priority.iconType === Icon.types.conversationPriority3 ||
          itemData.priority.iconType === Icon.types.conversationPriority2) && (
          <Icon
            data-for={itemData.priority.tipPosition}
            data-tip={itemData.priority.tip}
            color={itemData.priority.color}
            type={itemData.priority.iconType}
            className={style.priority}
          />
        )}
        <Icon
          data-for={itemData.source.tipPosition}
          data-tip={itemData.source.tip}
          color={itemData.source.color}
          type={itemData.source.iconType}
          className={style.source}
        />
      </div>
      <div className={style.clear}>&nbsp;</div>
    </div>
  );
};

export default Header;

