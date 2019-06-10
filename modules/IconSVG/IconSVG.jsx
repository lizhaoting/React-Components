import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './IconSVG.css';

class IconSVG extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    const {
      disabled,
      className,
      type,
      active,
      onClick,
      ...others
    } = this.props;
    let svgContent;
    switch (type) {
      case 'rating': {
        svgContent = [<path
          key="svgRatePath1"
          className={classnames(style.svgPath, style.svgRatePath1)}
          d="M11.9,14.7c-0.1,0-0.1,0-0.2,0l-3.7-1.8l-3.7,1.8c-0.2,0.1-0.3,0.1-0.4,
          0c-0.1-0.1-0.2-0.3-0.2-0.4L4.3,10l-3-3.2C1.3,6.6,1.3,6.5,1.3,6.4c0.1-0.2,0.2-0.3,
          0.4-0.3l4-0.8l2-3.8C7.7,1.3,7.8,1.3,8,1.3l0,0c0.2,0,0.3,0.1,0.4,0.3l2,3.8l4,0.8c0.2,
          0,0.3,0.2,0.4,0.3c0.1,0.2,0,0.3-0.1,0.4l-2.8,3.1l0.5,4.3c0,0.2-0.1,0.3-0.2,0.4C12.1,
          14.7,12,14.7,11.9,14.7L11.9,14.7z"
        />];
        break;
      }
      case 'sendfile': {
        svgContent = [<path
          key="svgPathSendFile1"
          className={classnames(style.svgPath, style.svgPathSendFile1)}
          d="M8.4,5.1c0,0-2.8,3-3.1,3.3C5,8.7,4.9,9.1,5,9.4c0.1,0.4,0.9,1.2,1.1,1.3c0.6,0.4,
          1,0,1.5-0.4s5.1-5.1,5.4-5.5s0.7-1.1,0.5-1.9c-0.1-0.5-1.3-2-2.1-2.2c-0.8-0.2-1.4,0-2.1,
          0.6C8.6,1.8,2.8,8,2.4,8.4s-0.9,1-0.9,2s1,3.7,3.6,4.1c1,0.1,1.7-0.4,2-0.8c0.4-0.5,
          4.6-4.8,4.6-4.8"
        />];
        break;
      }
      case 'videochat': {
        svgContent = [<path
          key="svgPathVideo1"
          className={classnames(style.svgPath, style.svgPathVideo1)}
          d="M12.6,6.4h-0.8V4.2c0,0-0.1-0.9-0.9-0.9c0,0-8.7,0-9.4,0S0.5,3.7,0.5,4.5s0,7.3,0,
          7.3s0.1,0.9,0.8,0.9h9.4c0,0,0.9-0.2,0.9-0.9v-1.5h0.9l2.8,2.4V4.2L12.6,6.4z"
        />,
          <circle
            key="svgPathVideo2"
            className={classnames(style.svgPath, style.svgPathVideo2)}
            cx="2.5"
            cy="5.5"
            r="0.5"
          />,
          <circle
            key="svgPathVideo3"
            className={classnames(style.svgPath, style.svgPathVideo2)}
            cx="4.5"
            cy="5.5"
            r="0.5"
          />];
        break;
      }
      case 'voicechat': {
        svgContent = [<path
          key="svgPathVoice1"
          className={classnames(style.svgPath, style.svgPathVoice1)}
          d="M8,9.3c1.4,0,2.5-1.1,2.5-2.5V4.4C10.5,3,9.4,1.8,8,1.8S5.5,3,5.5,4.4v2.5C5.5,
          8.1,6.6,9.3,8,9.3z"
        />,
          <path
            key="svgPathVoice2"
            className={classnames(style.svgPath, style.svgPathVoice2)}
            d="M12.5,6.9c-0.8,0-0.6,0.7-0.6,0.7c0,2.5-1.5,3.4-4,3.4s-4-1.2-4-3.7c0,0,
            0.2-0.5-0.6-0.5c0,0-0.5,0-0.5,0.5c0,3,1.3,4.2,4.1,4.6c0,0.3,0,2,0,2H4.7C4.3,
            14,4,14,4,14.5S4.4,15,4.9,15h6.4c0.4,0,0.7,0,0.7-0.5S11.7,14,11.3,14H9c0,0,0-1.7,
            0-2c2.8-0.5,4.1-1.4,4.1-4.3C13,7.6,13.3,6.9,12.5,6.9z"
          />];
        break;
      }
      case 'sendemail': {
        svgContent = [<path
          key="sendemail1"
          className={classnames(style.svgPath, style.sendemail1)}
          d="M14.4,14H1.6C0.7,14,0,13.3,0,12.4l0-8.9C0,2.7,0.7,2,1.6,2h12.9C15.3,2,
          16,2.7,16,3.6v8.9C16,13.3,15.3,14,14.4,14z"
        />,
          <path
            key="sendemail2"
            className={classnames(style.svgPath, style.sendemail2)}
            d="M15.5,7.2v5.4c0,0.5-0.4,1-1,1H1.5c-0.5,0-1-0.4-1-1V3.5c0-0.5,0.4-1,
            1-1h13.1L7.7,9.4L3.4,5.2"
          />];
        break;
      }
      default: {
        break;
      }
    }
    return (
      <svg
        version="1.1"
        className={
          classnames(
            style.svg,
            className,
            disabled && style.disabled,
            active && style.active,
          )
        }
        onClick={disabled ? undefined : () => onClick()}
        {...others}
      >
        { svgContent }
      </svg>
    );
  }

}

IconSVG.defaultProps = {
  disabled: false,
  className: '',
  type: '',
  active: false,
  onClick: () => { },
};

IconSVG.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default IconSVG;
