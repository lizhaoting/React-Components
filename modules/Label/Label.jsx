/** eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import classNames from 'classnames';
import Link from '../Link/Link';
import style from './label.css';
import { enumFloats, verticalAligns } from '../constants/enumLabel';

class Label extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  render() {
    const {
      text,
      float,
      verticalAlign,
      ifMultiLine,
      onClick,
      className,
      icon,
      ifSuperLink,
      href,
      target,
      innerClass,
      ...others
    } = this.props;

    return (
      <div
        {...others}
        className={classNames(
          style.default,
          (onClick && _.isFunction(onClick)) && style.cursorhand,
          float === enumFloats.left && style.left,
          float === enumFloats.right && style.right,
          verticalAlign === verticalAligns.bottom && style.bottom,
          verticalAlign === verticalAligns.baseline && style.baseline,
          className, innerClass)}
        onClick={(onClick && _.isFunction(onClick)) ? () => onClick() : undefined}
      >
        {icon && icon}
        {ifSuperLink ?
          <a
            className={classNames(
              style.href,
              icon && style.textleft,
              ifMultiLine ? '' : style.ifSingleLine)}
            href={href}
            target={target || '_blank'}
          > {text}</a > :
          <span
            className={classNames(
              icon && style.textleft,
              ifMultiLine ? '' : style.ifSingleLine)}
          >{text}</span>}
      </div >);
  }
}

Label.defaultProps = {
  text: '',
  ifMultiLine: false,
  ifSuperLink: false,
};

Label.float = enumFloats;

Label.verticalAlign = verticalAligns;

Label.style = style;

Label.propTypes = {
  text: PropTypes.string,
  ifMultiLine: PropTypes.bool.isRequired,
  ifSuperLink: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.element,
  href: PropTypes.string,
  target: PropTypes.string,
  float: PropTypes.oneOf(Object.keys(enumFloats).map(key => enumFloats[key])),
  verticalAlign: PropTypes.oneOf(Object.keys(verticalAligns).map(key => verticalAligns[key])),
  innerClass: PropTypes.string,
};

export default Label;
