import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './PopupModal.css';

const PopupModal = (props) => {
  const {
    ifShow,
    children,
  } = props;
  return (
    <div
      className={classNames(style.popupmodal, ifShow && style.show)}
    >
      <p>{children}</p>
    </div>
  );
};

PopupModal.defaultProps = {
  ifShow: true,
};

PopupModal.propTypes = {
  ifShow: PropTypes.bool,
  children: PropTypes.string,
};

export default PopupModal;
