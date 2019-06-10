/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import classNames from 'classnames';
import style from '../item.css';

const Subject = (props) => {
  const { itemData, ifRead } = props;
  return (
    <div
      className={classNames(style.subjectanddate,
        ifRead ? style.haveread : style.unreadTitle)}
    >
      <div
        className={style.subject}
        dangerouslySetInnerHTML={{
          __html: itemData.subject,
        }}
      />
      <div
        className={style.subjectdate}
      >{itemData.lastReplyTime}
      </div>
    </div>
  );
};

Subject.propTypes = {
  ifRead: React.PropTypes.bool.isRequired,
  itemData: React.PropTypes.shape({}).isRequired,
};

export default Subject;
