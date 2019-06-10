import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Resizer.css';

class Resizer extends Component {
  constructor() {
    super();
    this.isActive = false;
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.doDrag = this.doDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    if (this.isActive && typeof window !== 'undefined') {
      window.removeEventListener('mouseup', this.stopDrag);
      window.removeEventListener('mousemove', this.doDrag);
      window.removeEventListener('touchmove', this.doDrag);
      window.removeEventListener('touchend', this.stopDrag);
    }
  }
  doDrag(e) {
    if (!this.isActive) return;
    if (e.which !== 1) {
      this.stopDrag(e);
      return;
    }
    this.props.onResizer(e.pageX - this.startX);
  }

  stopDrag() {
    if (!this.isActive) return;
    if (this.props.onStopResize) {
      this.props.onStopResize();
    }
    this.isActive = false;
    if (typeof window !== 'undefined') {
      window.removeEventListener('mouseup', this.stopDrag);
      window.removeEventListener('mousemove', this.doDrag);
      window.removeEventListener('touchmove', this.doDrag);
      window.removeEventListener('touchend', this.stopDrag);
    }
  }
  mouseDownHandler(event) {
    event.nativeEvent.preventDefault();
    event.nativeEvent.stopPropagation();
    this.startX = event.nativeEvent.pageX;
    if (this.props.onStartResize) {
      this.props.onStartResize();
    }
    this.isActive = true;
    if (typeof window !== 'undefined') {
      window.addEventListener('mouseup', this.stopDrag);
      window.addEventListener('mousemove', this.doDrag);
      window.addEventListener('touchmove', this.doDrag);
      window.addEventListener('touchend', this.stopDrag);
    }
  }
  render() {
    return (
      <div
        className={classnames(styles.resizeDiv, this.props.className)}
        onMouseDown={this.mouseDownHandler}
      />
    );
  }
}

Resizer.propTypes = {
  onResizer: PropTypes.func.isRequired,
  onStartResize: PropTypes.func,
  onStopResize: PropTypes.func,
  className: PropTypes.string,
};

Resizer.examples = {
  DefaultExample: {
    description: 'Resizer Example',
    component: <Resizer
      onResizer={(offset) => { console.log(offset); }}
    />,
  },
};
export default Resizer;
