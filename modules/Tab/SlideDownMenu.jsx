import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Tab.css';
import TabIcon from './TabIcon';

const SlideDownMenu = (props) => {
  const { items, isHover } = props;
  return (
    <div
      className={classnames({
        [style.openPopup]: style.openPopup,
        [style.mouseover]: isHover,
      })}
    >
      <div className={style.slideDownContainer} >
        <ul>
          {
            items.map(item =>
            (
              <li
                key={`item_${item.key}`}
                role={'presentation'}
                onClick={() => props.onClick(item)}
                className={style.sdItem}
              >
                { item.icon && <TabIcon icon={item.icon} /> }
                <span>{item.text}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

SlideDownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isHover: PropTypes.bool.isRequired,
};

export default SlideDownMenu;
