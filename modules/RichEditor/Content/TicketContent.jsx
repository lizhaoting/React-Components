import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './content.css';
import Icon from '../../Icon/Icon';

const TicketContent = (props) => {
  const {
      children,
      replyLabel,
      noteLabel,
      ifReplySelected,
      onClickReply,
      onClickNote,
      OnZoomUp,
      errorClass,
    } = props;
  return (
    <div className={style.ticketContent}>
      <div className={style.topMenu}>
        <ul>
          <li className={ifReplySelected && style.selected}>
            <span onClick={onClickReply}>{replyLabel}</span>
            {ifReplySelected && (
              <Icon
                type={Icon.types.ticketZoomup}
                onClick={OnZoomUp}
              />
            )}
          </li>
          <li className={!ifReplySelected && style.selected}>
            <span onClick={onClickNote}>{noteLabel}</span>
          </li>
        </ul>
      </div>
      <div className={classnames(style.editorWraper, errorClass)}>
        {children}
      </div>
    </div>
  );
};

TicketContent.defaultProps = {
  replyLabel: 'Reply',
  noteLabel: 'Note',
  children: null,
  ifReplySelected: true,
  errorClass: '',
};

TicketContent.style = style;

TicketContent.propTypes = {
  errorClass: PropTypes.string,
  replyLabel: PropTypes.string,
  noteLabel: PropTypes.string,
  ifReplySelected: PropTypes.bool,
  children: PropTypes.any,
  onClickReply: PropTypes.func.isRequired,
  onClickNote: PropTypes.func.isRequired,
  OnZoomUp: PropTypes.func.isRequired,
};

export default TicketContent;
