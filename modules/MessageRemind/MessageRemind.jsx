import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './messageRemind.css';

const MessageRemind = props => (
  <div
    className={classnames(style.content, props.className)}
    dangerouslySetInnerHTML={{ __html: props.message }}
    onClick={props.onClick}
  />
);

MessageRemind.defaultProps = {
  className: '',
};

MessageRemind.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
MessageRemind.style = style;

export default MessageRemind;
