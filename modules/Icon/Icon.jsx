import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import _ from 'lodash';
import icons from './icon.css';
import styles from './style.css';
import { icons as enums } from '../constants/enums';

class Icon extends React.Component {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.updateHoverStatus = this.updateHoverStatus.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState) ||
           !_.isEqual(this.props, nextProps);
  }
  updateHoverStatus(flag) {
    this.setState({
      isHover: flag,
    });
  }
  render() {
    const {
    type,
    color,
    size,
    className,
    hoverScale,
    disabled,
    hoverColor,
    ...others } = this.props;
    const sizeCls = ({
      large: 'icon-large',
      small: 'icon-small',
      larger: 'icon-larger',
      smaller: 'icon-smaller',
      normal: 'icon-normal',
    })[size] || '';
    // `type` should both determine the icon and default color to be used.
    // though I don't think following implementation is recommended.
    // might need refactor later.
    const [typeName, cssColor] = type.split('#');
    const classString = classnames(
      icons.icon,
      type === enums.loading && styles['icon-spin'],
      icons[`icon-${typeName}`],
      styles[sizeCls],
      hoverScale && styles['icon-hover'],
      className,
    );
    const cssStyle = others.style || {};
    if (hoverColor && this.state.isHover) {
      cssStyle.color = hoverColor;
    } else if (color) {
      cssStyle.color = color;
    } else if (cssColor) {
      cssStyle.color = `#${cssColor}`;
    }
    if (typeof size === 'number') cssStyle.fontSize = `${size}px`;
    if (disabled) cssStyle.color = '#999';
    return (
      <i
        {...others} style={cssStyle} className={classString}
        onMouseEnter={() => this.updateHoverStatus(true)}
        onMouseLeave={() => this.updateHoverStatus(false)}
      />);
  }
}
Icon.defaultProps = {
  hoverScale: false,
};

Icon.propTypes = {
  /** Icon type */
  type: PropTypes.oneOf(Object.keys(enums).map(key => enums[key])),
  /** Icon color */
  color: PropTypes.string,
  /** Icon color #999 !important*/
  disabled: PropTypes.bool,
  /** font-size of Icon, default：inherit */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['larger', 'large', 'normal', 'small', 'smaller']),
    PropTypes.number,
  ]),
  /** onClick callback function, no param is passed in when called */
  hoverScale: PropTypes.bool,
  /** additional className */
  className: PropTypes.string,
  hoverColor: PropTypes.string,
};

Icon.types= enums;

export default Icon;