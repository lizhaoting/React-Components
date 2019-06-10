import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Resizer from './Resizer';
import style from './Resizer.css';

class ResizeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResizing: false,
      width: props.width,
    };
    this.onResizer = this.onResizer.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onStopResize = this.onStopResize.bind(this);
  }
  onResizer(offset) {
    if (this.props.resizerPosition === 'left') {
      if (this.mainWidth - offset < this.props.right_minWidth) return;
      if (this.mainWidth - offset > this.props.right_maxWidth) return;
      if (this.startWidth + offset <= this.props.left_minWidth) {
        this.setState({ width: this.props.left_minWidth });
      } else if (this.startWidth + offset >= this.props.left_maxWidth) {
        this.setState({ width: this.props.left_maxWidth });
      } else {
        this.setState({ width: this.startWidth + offset });
      }
    } else {
      if (this.mainWidth + offset < this.props.left_minWidth) return;
      if (this.mainWidth + offset > this.props.left_maxWidth) return;
      if (this.startWidth - offset < this.props.right_minWidth) {
        this.setState({ width: this.props.right_minWidth });
      } else if (this.startWidth - offset > this.props.right_maxWidth) {
        this.setState({ width: this.props.right_maxWidth });
      } else {
        this.setState({ width: this.startWidth - offset });
      }
    }
  }
  onMouseDown() {
    this.setState({ isResizing: true, width: this.aside.offsetWidth });
    this.mainWidth = this.main.offsetWidth;
    this.startWidth = this.aside.offsetWidth;
  }
  onStopResize() {
    this.setState({ isResizing: false });
    if (this.props.onStopResize) {
      this.props.onStopResize(this.state.width);
    }
  }
  render() {
    const {
      className,
      leftContainerClassName,
      rightContainerClassName,
      resizerPosition,
      children,
      rightContainerStyle,
    } = this.props;
    if (process.env.NODE_ENV !== 'production' && React.Children.count(children) !== 2) {
      throw new Error('Expect to have exact 2 children under <ResizeContainer />, but got 0');
    }
    const [firstComponent, secondComponent] = React.Children.toArray(children);
    if (resizerPosition === 'right') {
      const mainStyle = {};
      if (this.props.left_minWidth > 0) {
        mainStyle.minWidth = this.props.left_minWidth;
      }
      const asideStyle = {};
      asideStyle.width = this.props.width;
      if (this.props.right_minWidth > 0) {
        asideStyle.minWidth = this.props.right_minWidth;
      }
      return (
        <div
          className={classnames(style.Container, className)}
        >
          <div
            ref={(c) => { this.main = c; }}
            className={classnames(style.mainContainer, rightContainerStyle)}
            style={mainStyle}
          >
            {firstComponent}
          </div>
          <Resizer
            onResizer={this.onResizer}
            onStartResize={this.onMouseDown}
            onStopResize={this.onStopResize}
          />
          <div
            ref={(c) => { this.aside = c; }}
            className={style.asideContainer}
            style={asideStyle}
          >
            {React.cloneElement(secondComponent, { style: { width: this.props.width } })}
          </div>
          <div
            className={style.resizeClone}
            style={{ display: this.state.isResizing ? 'block' : 'none', right: this.state.width }}
          />
        </div>
      );
    }
    const mainStyle = {};
    if (this.props.right_minWidth >= 0) {
      mainStyle.minWidth = this.props.right_minWidth;
    }
    const asideStyle = {};
    asideStyle.width = this.props.width;
    if (this.props.left_minWidth >= 0) {
      asideStyle.minWidth = this.props.left_minWidth;
    }
    return (
      <div
        className={classnames(style.Container, className)}
      >
        <div
          ref={(c) => { this.aside = c; }}
          className={classnames(style.asideContainer, leftContainerClassName)}
          style={asideStyle}
        >
          {React.cloneElement(firstComponent, { style: { width: this.props.width } })}
        </div>
        {!this.props.hideResizer &&
          <Resizer
            onResizer={this.onResizer}
            onStartResize={this.onMouseDown}
            onStopResize={this.onStopResize}
          />}
        <div
          ref={(c) => { this.main = c; }}
          className={classnames(style.mainContainer, rightContainerClassName)}
          style={mainStyle}
        >
          {secondComponent}
        </div>
        <div
          className={style.resizeClone}
          style={{ display: this.state.isResizing ? 'block' : 'none', left: this.state.width }}
        />
      </div>
    );
  }
}

ResizeContainer.propTypes = {
  /** Container style */
  className: PropTypes.string,
  leftContainerClassName: PropTypes.string,
  rightContainerClassName: PropTypes.string,
  hideResizer: PropTypes.bool,
  rightContainerStyle: PropTypes.string,
  /** resizer Position */
  resizerPosition: PropTypes.oneOf(['left', 'right']).isRequired,
  /** resizerComponent initial width */
  width: PropTypes.number.isRequired,
  /** resize min width */
  left_minWidth: PropTypes.number,
  /** resize max width */
  left_maxWidth: PropTypes.number,
  /** resize min width */
  right_minWidth: PropTypes.number,
  /** resize max width */
  right_maxWidth: PropTypes.number,
  /** Stop Resize callback,return the width of the resizerComponent */
  onStopResize: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.any,
  ]),
};
ResizeContainer.defaultProps = {
  left_minWidth: 100,
  right_minWidth: 100,
};
ResizeContainer.examples = {
  DefaultExample: {
    description: 'Left Example',
    component: <ResizeContainer
      resizerPosition="left"
      className={style.demo}
      width={200}
      right_minWidth={400}
      onStopResize={(width) => { console.log(width); }}
    >
      <div>aside</div>
      <div>main content</div>
    </ResizeContainer>,
  },
  RightExample: {
    description: 'Right Example',
    component: <ResizeContainer
      resizerPosition="right" className={style.demo}
      width={200}
      left_minWidth={400}
    >
      <div>main content</div>
      <div>aside</div>
    </ResizeContainer>,
  },
};

export default ResizeContainer;
