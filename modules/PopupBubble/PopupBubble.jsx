import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './PopupBubble.css';

class PopupBubble extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {
      id,
      className,
      children,
      transformOrigin,
      ifShow,
    } = this.props;
    return (
      <div
        id={id}
        style={{ transformOrigin }}
        className={
          classnames(
            style.bubble,
            className,
            ifShow && style.bubbleShow,
          )
        }
      >
        { children }
      </div>
    );
  }


}

PopupBubble.defaultProps = {
  id: '',
  className: '',
  transformOrigin: '',
  ifShow: false,
};

PopupBubble.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  transformOrigin: PropTypes.string,
  ifShow: PropTypes.bool,
};

export default PopupBubble;
