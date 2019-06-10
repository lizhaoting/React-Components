import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import iScroll from 'iscroll';
import ReactIScroll from './react-iscroll';
import style from './section.css';

const cachePosition = {};
class Section extends Component {
  constructor(props) {
    super(props);
    this.defaultOptions = {
      mouseWheel: true,
      scrollbars: true,
      scrollX: true,
      scrollY: true,
      startY: 0,
      startX: 0,
      disablePointer: true,
      interactiveScrollbars: true,
    };
    this.state = {
      options: Object.assign({}, this.defaultOptions, props.config || {}),
      isScrolling: false,
      ifHover: false,
    };
    this.reactIScroll = null;
    this.iScrollInstance = null;
    this.handleScrollStart = this.handleScrollStart.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.getIScrollInstance = this.getIScrollInstance.bind(this);
  }

  componentDidUpdate() {
    const target = this;
    const {
      id,
      ifEnableCache,
      scrollToEnd,
    } = target.props;
    if (ifEnableCache && target.getIScrollInstance()) {
      if (cachePosition[id]) {
        target.iScrollInstance.scrollTo(cachePosition[id].sx, cachePosition[id].sy);
      } else if (scrollToEnd) {
        setTimeout(() => {
          const iScoll = target.getIScrollInstance();
          const scrollY = iScoll.maxScrollY;
          const scrollX = iScoll.maxScrollX;
          this.iScrollInstance.scrollTo(scrollX, scrollY);
          cachePosition[id] = { sx: scrollX, sy: scrollY };
        }, 100);
      }
    }
  }

  getIScrollInstance() {
    if (this.reactIScroll) {
      this.iScrollInstance = this.reactIScroll.getIScroll();
    }
    return this.iScrollInstance;
  }

  handleScrollStart() {
    this.setState({ isScrolling: true });
  }

  handleScrollEnd(iScrollInstance) {
    if (iScrollInstance.y / iScrollInstance.maxScrollY > 0.7) {
      if (_.isFunction(this.props.loadData)) {
        this.props.loadData();
      }
    }
    if (this.props.ifEnableCache) {
      cachePosition[this.props.id] = { sx: iScrollInstance.x, sy: iScrollInstance.y };
    }
    this.setState({
      isScrolling: false,
    });
  }

  handleMouseEnter() {
    if (this.props.ifEnableCache && this.getIScrollInstance()) {
      cachePosition[this.props.id] = { sx: this.iScrollInstance.x, sy: this.iScrollInstance.y };
    }
    this.setState({
      ifHover: true,
    });
  }

  handleMouseLeave() {
    if (this.props.ifEnableCache && this.getIScrollInstance()) {
      cachePosition[this.props.id] = { sx: this.iScrollInstance.x, sy: this.iScrollInstance.y };
    }
    this.setState({
      ifHover: false,
    });
  }

  handleRef(reactIScroll) {
    const target = this;
    target.reactIScroll = reactIScroll;
    target.props.refIScroll(() => {
      const scrollY = target.iScrollInstance.maxScrollY;
      const scrollX = target.iScrollInstance.maxScrollX;
      cachePosition[target.props.id] = { sx: scrollX, sy: scrollY };
      target.iScrollInstance.scrollTo(scrollX, scrollY);
    });
  }

  render() {
    const {
      panelClass,
      children,
    } = this.props;
    return (
      <ReactIScroll
        ref={this.handleRef}
        iScroll={iScroll}
        options={this.state.options}
        onScrollStart={this.handleScrollStart}
        onScrollEnd={this.handleScrollEnd}
        className={classnames(style.scrollpanel, panelClass, this.state.ifHover && style.hover)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          className={style.sectionContainer}
        >
          {children}
        </div>
      </ReactIScroll>
    );
  }
}

Section.style = style;

Section.propTypes = {
  id: PropTypes.string,
  panelClass: PropTypes.string,
  config: PropTypes.shape({}),
  ifEnableCache: PropTypes.bool,
  scrollToEnd: PropTypes.bool,
  children: PropTypes.any,
  loadData: PropTypes.func,
};
Section.defaultProps = {
  id: '',
  panelClass: '',
  ifEnableCache: false,
  loadData: null,
  config: {},
  scrollToEnd: false,
  refIScroll: a => a,
};

export default Section;
