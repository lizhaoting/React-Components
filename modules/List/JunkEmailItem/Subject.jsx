/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import classNames from 'classnames';
import style from '../item.css';

const Subject = (props) => {
  const { itemData } = props;
  return (
    <div
      className={classNames(style.subjectanddate,
        itemData.ifRead ? style.haveread : style.unreadTitle)}
    >
      <div
        className={style.subject}
        dangerouslySetInnerHTML={{
          __html: itemData.subject,
        }}
      />
      <div
        className={classNames(style.subjectdate, itemData.ifRead ?
          '' : style.unreadTitle)}
      >{itemData.sendTime}
      </div>
    </div>
  );
};

export default Subject;
