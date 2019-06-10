import React from 'react';
import PropTypes from 'prop-types';
import TabItem from './TabItem';
import MoreTabs from './MoreTabs';
import style from './Tab.css';
import { getIndexByKey, swapTabs } from './utils';

const getVisibleTabNum = (width, tabCount) => {
  if ((((tabCount - 1) * 40) + 120) > width) {
    return parseInt((width - 120) / 40, 10);
  }
  return tabCount;
};

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: props.tabs,
      visibleTabsNum: getVisibleTabNum(props.width, props.tabs.length),
    };
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.exchangeTab = this.exchangeTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const visibleNum = getVisibleTabNum(nextProps.width, nextProps.tabs.length);
    let selectedIdx = getIndexByKey(nextProps.tabs, nextProps.selected);
    let allTabs = Object.assign([], nextProps.tabs);
    while (selectedIdx > visibleNum - 1) {
      allTabs = swapTabs(allTabs, selectedIdx, selectedIdx - 1);
      selectedIdx -= 1;
    }
    this.setState({
      tabs: allTabs,
      visibleTabsNum: visibleNum,
    });
  }

  exchangeTab(tab) {
    const selectedIdx = getIndexByKey(this.props.tabs, tab.key);
    const reorder = Object.assign([], this.props.tabs);
    const tmp = Object.assign({}, this.props.tabs[this.state.visibleTabsNum - 1]);
    reorder[this.state.visibleTabsNum - 1] = Object.assign({}, this.props.tabs[selectedIdx]);
    reorder[selectedIdx] = tmp;
    this.props.onReorder(reorder);
    this.props.onSelectedChange(tab.key);
  }

  dragStart(e, itemKey) {
    this.props.onSelectedChange(itemKey);
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', itemKey);
  }

  dragOver(e, itemKey) {
    if (this.props.draggable) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';
      if (itemKey !== this.props.selected) {
        const selectedIndex = getIndexByKey(this.props.tabs, this.props.selected);
        const overIndex = getIndexByKey(this.props.tabs, itemKey);
        const newOrder = swapTabs(this.props.tabs, selectedIndex, overIndex);
        this.props.onReorder(newOrder);
      }
    }
  }

  render() {
    const { draggable, width, selected } = this.props;
    const showItems = this.state.tabs.slice(0, this.state.visibleTabsNum);
    const hideItems = this.state.tabs.slice(this.state.visibleTabsNum, this.state.tabs.length);
    return (<div className={style.tabs} style={{ width }}>
      {showItems.map(item =>
        (<TabItem
          key={`tab_${item.key}`}
          text={item.text}
          icon={item.icon}
          itemKey={item.key}
          selected={selected === item.key}
          draggable={draggable}
          onSelectedChange={this.props.onSelectedChange}
          dragStart={this.dragStart}
          dragOver={this.dragOver}
        />),
      )}
      {this.state.visibleTabsNum < this.state.tabs.length &&
        <MoreTabs
          tabs={hideItems}
          onClick={this.exchangeTab}
        />}
    </div>);
  }
}

Tab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  draggable: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired,
  onReorder: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  selected: PropTypes.string.isRequired,
};

Tab.defaultProps = {
  draggable: false,
};

export default Tab;
