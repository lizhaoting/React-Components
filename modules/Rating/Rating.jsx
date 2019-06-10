import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './Rating.css';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starClicked: false,
      starParentClicked: false,
      rateVal: props.rateVal,
    };
    this.hoverChange = this.hoverChange.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.starClickChange = this.starClickChange.bind(this);
  }
  hoverChange(rateVal) {
    if (!this.state.starClicked) {
      this.setState({
        rateVal,
      });
    }
  }

  clickChange(rateVal) {
    this.setState({
      starClicked: true,
      rateVal,
    });
    this.props.rateChange(rateVal);
  }

  starClickChange() {
    const thisComponent = this;
    thisComponent.setState({
      starParentClicked: true,
    });

    setTimeout(() => {
      thisComponent.setState({
        starParentClicked: false,
      });
    }, 1000);
  }
  render() {
    let nodeChild = [];
    if (this.props.ifCanHalfRate) {
      nodeChild = this.props.rateItems.map((rateItem, index) => (
        <div
          key={index}
          role="button"
          tabIndex={rateItem}
          className={
            classnames(
              this.state.rateVal >= rateItem ? classnames(style.star, style.animate) : style.star,
              this.state.starParentClicked && (this.state.rateVal > (rateItem - 1)
                && this.state.rateVal <= rateItem)
                ? classnames(style.selected, style.isAnimated, style.pulse)
                : style.selected,
            )
          }
          onClick={this.starClickChange}
        >
          <span
            role="button"
            tabIndex={rateItem}
            className={
              (this.state.rateVal >= rateItem - 0.5) ?
                classnames(style.half, style.starColour) : style.half
            }
            data-value={rateItem - 0.5}
            onMouseOver={() => this.hoverChange(rateItem - 0.5)}
            onMouseOut={rateItem === 1 ? () => this.hoverChange('0') : () => { }}
            onClick={() => this.clickChange(rateItem - 0.5)}
          />

          <span
            role="button"
            tabIndex={rateItem}
            className={
              (this.state.rateVal >= rateItem) ?
                classnames(style.full, style.starColour) : style.full
            }
            data-value={rateItem}
            onMouseOver={() => this.hoverChange(rateItem)}
            onClick={() => this.clickChange(rateItem)}
          />
        </div>
      ));
    } else {
      nodeChild = this.props.rateItems.map((rateItem, index) => (
        <div
          key={index}
          role="button"
          tabIndex={rateItem}
          className={
            classnames(
              this.state.rateVal >= rateItem ? classnames(style.star, style.animate) : style.star,
              this.state.starParentClicked && (this.state.rateVal > (rateItem - 1)
                && this.state.rateVal <= rateItem)
                ? classnames(style.selected, style.isAnimated, style.pulse)
                : style.selected,
            )
          }
          onClick={this.starClickChange}
        >
          <span
            role="button"
            tabIndex={rateItem}
            className={
              (this.state.rateVal >= rateItem) ?
                classnames(style.full, style.starColour) : style.full
            }
            data-value={rateItem}
            onMouseOver={() => this.hoverChange(rateItem)}
            onMouseOut={rateItem === 1 ? () => this.hoverChange('0') : () => { }}
            onClick={() => this.clickChange(rateItem)}
          />
        </div>
      ));
    }


    return (
      <div className={style.rating} data-vote="0">
        {nodeChild}
      </div>
    );
  }

}

Rating.defaultProps = {
  rateVal: 0,
  rateItems: [1, 2, 3, 4, 5],
  rateChange: () => { },
  ifCanHalfRate: false,
};

Rating.propTypes = {
  rateVal: PropTypes.number,
  rateItems: PropTypes.arrayOf(PropTypes.number),
  rateChange: PropTypes.func,
  ifCanHalfRate: PropTypes.bool,
};

export default Rating;

