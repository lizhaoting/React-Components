import React from 'react';
import classNames from 'classnames';
import style from './image.css';
/**
 * Component Description
 */
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.onError = this.onError.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.src !== this.props.src;
  }

  onError(e) {
    e.target.src = this.props.defaultImage;
  }

  onLoad(e) {
    const {
      defaultWidth,
    } = this.props;
    let w = e.target.width;
    let h = e.target.height;
    if (w > defaultWidth) {
      h *= (defaultWidth / w);
      w = defaultWidth;
    }
    e.target.width = w;
    e.target.height = h;
  }

  render() {
    let src = this.props.src;
    const {
      alt,
      link,
      className,
      openExternal,
      defaultWidth,
      ...rest
    } = this.props;
    if (!src) {
      src = this.props.defaultImage;
    }
    if (!link || link === '') {
      return (
        <img
          alt={alt}
          src={src}
          width={defaultWidth}
          className={classNames(style.img, className)}
          onError={this.onError}
          onLoad={this.onLoad}
          {...rest}
        />
      );
    }
    return (
      <a onClick={(e) => { openExternal(link, e); }} target="_blank">
        <img
          alt={alt}
          src={src}
          width={defaultWidth}
          className={classNames(style.img, className)}
          onError={this.onError}
          onLoad={this.onLoad}
          {...rest}
        />
      </a>
    );
  }
}

Image.propTypes = {
  defaultWidth: React.PropTypes.number,
  alt: React.PropTypes.string,
  src: React.PropTypes.string,
  link: React.PropTypes.string,
  defaultImage: React.PropTypes.string,
  className: React.PropTypes.string,
  openExternal: React.PropTypes.func,
};

Image.defaultProps = {
  alt: '',
  link: null,
  src: null,
  defaultImage: '',
  className: '',
  defaultWidth: 400,
  openExternal: _ => _,
};

export default Image;
