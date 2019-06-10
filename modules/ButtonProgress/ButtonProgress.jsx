import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import style from './ButtonProgress.css';

import Button from '../Button/Button';

class ButtonProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubmitting: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({
      isSubmitting: true,
    });
  }
  render() {
    const {
      success,
      failed,
      ...others
    } = this.props;
    return (
      <div
        className={
          classnames(
            style.buttonProgressContainer,
            this.state.isSubmitting && !failed && style.buttonProgressContainerLoading,
            success && style.buttonProgressContainerSuccess,
          )
        }
        {...others}
      >
        <Button
          type="primary"
          text="Start Chat"
          className={
            classnames(
              style.buttonProgressBtnAnimated,
              style.buttonProgressBtnDefaultSize,
            )
          }
          htmlType="submit"
          onClick={this.onSubmit}
        />

        <svg
          version="1.1"
          className={style.buttonProgress__layerLoading}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          xmlSpace="preserve"
        >
          <path
            className={style.buttonProgress__submitLoadingPath}
            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <svg
          version="1.1"
          className={style.buttonProgress__layerCircle}
          id="buttonProgress__layer-circle"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          viewBox="0 0 30 30"
          xmlSpace="preserve"
        >
          <path
            className={style.buttonProgress__submitCirclePath}
            d="M15,1.5c7.4,0,13.5,6.1,13.5,13.5S22.4,28.5,15,28.5S1.5,22.4,1.5,15S7.6,1.5,15,1.5L15,1.5z"
          />
        </svg>
        <svg
          version="1.1"
          className={style.buttonProgress__layerSuccess}
          id="buttonProgress__layer-success"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          xmlSpace="preserve"
        >
          <polygon
            className={style.buttonProgress__submitSuccessPath}
            points="16,3.5 12.8,1 6.5,9.2 2.5,6.1 0,9.3 6,14 7.3,15 "
          />
        </svg>
      </div>
    );
  }
}

ButtonProgress.defaultProps = {
  success: false,
  failed: false,
};

ButtonProgress.propTypes = {
  success: PropTypes.bool,
  failed: PropTypes.bool,
};

export default ButtonProgress;
