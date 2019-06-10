import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import style from './buttonMenu.css';

class ButtonMenu extends React.Component {
  constructor(props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this);
  }
  clickMenu(item) {
    this.props.onClick(item);
  }
  render() {
    const {
      className,
      displayItem,
      items,
      btnType,
      direction,
    } = this.props;
    let directionStyle = '';
    switch (direction) {
      case 'down':
        directionStyle = style.down;
        break;
      default:
        directionStyle = style.up;
        break;
    }

    return (
      <div
        className={classNames(style.content, className)}
      >
        {_.isArray(items) && items.length > 0 && (
          <div className={classNames(style.dropdown, directionStyle)}>
            <Icon
              className={style.arrowDown}
              tabIndex={-1}
              type={Icon.types.arrowDown}
            />
            <div className={style.menu}>
              <ul>
                {items.map(item => (
                  <li
                    key={item.type}
                    onClick={() => {
                      this.clickMenu(item);
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <Button
          className={style.button}
          text={displayItem.text}
          type={btnType}
          onClick={() => {
            this.clickMenu(displayItem);
          }}
        />
      </div>
    );
  }
}

ButtonMenu.defaultProps = {
  className: '',
  btnType: 'default',
  direction: 'down',
  items: null,
};

ButtonMenu.style = style;

ButtonMenu.propTypes = {
  btnType: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down']),
  displayItem: PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
  onClick: PropTypes.func.isRequired,
};

export default ButtonMenu;
