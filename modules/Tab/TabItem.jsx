import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabIcon from './TabIcon';
import style from './Tab.css';

const TabItem = (props) => {
  const { itemKey, text, icon, selected, draggable, onSelectedChange, dragStart, dragOver } = props;
  return (
    <div
      role={'presentation'}
      key={`tab_${itemKey}`}
      className={classnames({
        [style.item]: style.item,
        [style.selected]: selected,
      })}
      draggable={draggable}
      onMouseDown={() => { onSelectedChange(itemKey); }}
      onDragStart={(e) => { dragStart(e, itemKey); }}
      onDragOver={(e) => { dragOver(e, itemKey); }}
    >
      <TabIcon icon={icon} selected={selected} />
      { selected && <span>{text}</span> }
    </div>
  );
};

TabItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.shape().isRequired,
  selected: PropTypes.string.isRequired,
  draggable: PropTypes.bool.isRequired,
  onSelectedChange: PropTypes.func.isRequired,
  dragStart: PropTypes.func.isRequired,
  dragOver: PropTypes.func.isRequired,
};

export default TabItem;
