import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './warnning.css';
import Icon from '../Icon/Icon';

class Warnning extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.text !== this.props.text;
  }
  render() {
    const {
      text,
      className,
    } = this.props;
    if (!text) return null;
    return (
      <div className={classnames(style.warnning, className)}>
        <Icon
          className={style.icon}
          type={Icon.types.ticketWarn}
        />
        <span className={style.warnningText}>
          {text}
        </span>
      </div>
    );
  }
}

Warnning.defaultProps = {
  text: null,
  className: '',
};

Warnning.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Warnning;
