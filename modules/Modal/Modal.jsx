import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import classnames from 'classnames';
import ReactModal from 'react-modal';
import ModalStyle from './Modal.css';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { icons } from '../constants/enums';

/**
 * @todo if props.ifOpen is false, no need to render ReactModal
 * Currently, this optimization has been done on each position where Modal is rendered.
 * Optimization can also be made here.
 *
 * It will causing a bit more render works, but made optimization much easier.
 * Should test the tradeoffs later, which solution is better.
 */

const clearSelect = () => {
  const element = document.querySelector('div[data-vmselect="open"]');
  if (element) {
    element.click();
  }
};
const clearSelectDebounce = _.debounce(clearSelect);

const modalTypes = {
  small: 0,
  narmal: 1,
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
    this.closeModal = this.closeModal.bind(this);
    this.hideSelect = this.hideSelect.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.hideSelect);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideSelect);
  }

  hideSelect() {
    clearSelectDebounce();
  }

  closeModal() {
    this.setState({
      isOpen: false,
    });
    setTimeout(() => this.props.closeModal(), 300);
  }

  render() {
    const props = this.props;
    return (
      <div>
        <ReactModal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          className={classnames(ModalStyle.ModalClass, props.className,
            props.modalType === modalTypes.small && ModalStyle.smallModal)}
          overlayClassName={classnames(ModalStyle.OverlayClass, props.overlayClassName)}
          shouldCloseOnOverlayClick
          closeTimeoutMS={300}
          contentLabel={props.contentLabel || 'Modal'}
        >
          {props.ifShowCloseIcon &&
            <button
              className={ModalStyle.close}
              onClick={this.closeModal}
            >
              <Icon type={icons.close} />
            </button>
          }
          {props.title ? <h3><b>{props.title}</b></h3> : ''}
          {props.children}

          {
            props.actions ?
              <div className={classnames(ModalStyle.action, props.actions.className)}>
                {
                  props.actions.okProps && (
                    _.isArray(props.actions.okProps) ?
                      _.map(props.actions.okProps, (okPropsValue, key) => (
                        <Button
                          key={key}
                          text={okPropsValue.text}
                          type={okPropsValue.type ? okPropsValue.type : 'primary'}
                          disabled={okPropsValue.disabled}
                          onClick={okPropsValue.eventClick}
                          className={okPropsValue.className}
                          loading={okPropsValue.loading}
                        />
                      ))
                      : (
                        <Button
                          text={props.actions.okProps.text}
                          type="primary"
                          disabled={props.actions.okProps.disabled}
                          onClick={props.actions.okProps.eventClick}
                          className={props.actions.okProps.className}
                          loading={props.actions.okProps.loading}
                        />
                      )
                  )
                }
                {
                  props.actions.cancelProps ?
                    <Button
                      text={props.actions.cancelProps.text}
                      type="default"
                      onClick={this.closeModal}
                    />
                    :
                    ''
                }

              </div>
              : ''
          }
        </ReactModal>
      </div>
    );
  }
}

/* const Modal = props => (
  <div>
    <ReactModal
      isOpen={props.ifOpen}
      onRequestClose={props.closeModal}
      className={classnames(ModalStyle.ModalClass, props.className)}
      overlayClassName={classnames(ModalStyle.OverlayClass, props.overlayClassName)}
      shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
      closeTimeoutMS={300}
    >
      { props.ifShowCloseIcon &&
        <button
          className={ModalStyle.close}
          onClick={props.closeModal}
        >
          <Icon type={icons.close} />
        </button>
      }
      {props.children}
    </ReactModal>
  </div>
);*/

Modal.propTypes = {
  ifOpen: PropTypes.bool,
  ifShowCloseIcon: PropTypes.bool,
  closeModal: PropTypes.func,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  shouldCloseOnOverlayClick: PropTypes.bool,
  /* String indicating how the content container should be announced to screenreaders */
  contentLabel: PropTypes.string,
  modalType: PropTypes.number,
};

Modal.modalTypes = modalTypes;

Modal.defaultProps = {
  shouldCloseOnOverlayClick: true,
  ifShowCloseIcon: true,
};

export default Modal;
