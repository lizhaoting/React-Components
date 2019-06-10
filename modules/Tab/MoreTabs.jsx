import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { icons as iconTypes } from '../constants/enums';
import style from './Tab.css';
import SlideDownMenu from './SlideDownMenu';

class MoreTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.updateHoverStatus = this.updateHoverStatus.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(item) {
    this.updateHoverStatus(false);
    this.props.onClick(item);
  }

  updateHoverStatus(flag) {
    this.setState({
      isHover: flag,
    });
  }

  render() {
    const { tabs } = this.props;
    return (
      <div
        className={classnames(style.item, style.more)}
        onMouseEnter={() => this.updateHoverStatus(true)}
        onMouseLeave={() => this.updateHoverStatus(false)}
      >
        <Icon type={iconTypes.more} size={20} color={'#888'} hoverColor={'#329fd9'} />
        <SlideDownMenu
          isHover={this.state.isHover}
          items={tabs}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

MoreTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MoreTabs;
