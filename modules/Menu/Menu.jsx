/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import style from './menu.css';


/* eslint-disable react/jsx-boolean-value */
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSource: '',
      expandDic: [],
    };

    this.onExpandMenu = this.onExpandMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ activeSource: nextProps.clickSource });
  }

  // 目前只处理1
  onExpandMenu(flag, menuId) {
    const menuDic = [];
    if (flag) {
      _.remove(menuDic, a => a.id === menuId);
      if (menuId === 2) return;
    } else if (menuId === 2) {
      return;
    } else {
      menuDic.push({ id: menuId, height: '0 0 30px' });
    }

    this.setState({ expandDic: menuDic });
  }

  render() {
    const {
      data,
      children,
      noDataDescription,
      noDataOperate,
    } = this.props;
    const { expandDic } = this.state;
    const findHeigh = (key, height) => {
      const menu = _.find(expandDic, a => a.id === key);
      if (!menu) return height;
      return menu.height || height;
    };

    return (
      <div
        className={style.filterMain}
      >
        {
          data.length > 0 &&
          data.map((menu, index) => (
            <div
              key={`menu_${index}`}
              className={classNames(style.flexItem, menu.ifShowDivideLine && style.divideLine)}
              style={{ 'flex': findHeigh(menu.key, menu.height) }}
            >
              <MenuItem
                menuid={menu.key}
                menuTitle={menu.menuTitle}
                flagIcon={menu.flagIcon}
                menuItemList={menu.menuItemList}
                ifShowOperation={menu.ifShowOperation}
                ifShowCornerMark={menu.ifShowCornerMark}
                refreshIconClassName={style.refreshIcon}
                settingIconClassName={style.settingIcon}
                expandSubMenuDefault={menu.expandSubMenuDefault}
                titleMap={menu.titleMap}
                numMap={menu.numMap}
                onRefresh={menu.onRefresh}
                onSetting={menu.onSetting}
                refreshTip={menu.refreshTip}
                settingTip={menu.settingTip}
                noDataDescription={noDataDescription}
                noDataOperate={noDataOperate}
                onItemSelected={(id) => {
                  this.setState({
                    activeSource: menu.menuType,
                  });
                  menu.onItemSelected(id, menu.menuType);
                }}
                onMainClick={() => {
                  if (menu.ifTitleCanClick) {
                    this.setState({
                      activeSource: menu.menuType,
                    });
                    menu.onItemSelected();
                  }
                }}
                ifShowSimple={menu.ifShowSimple}
                isActive={this.state.activeSource === menu.menuType}
                isNoContent={menu.isNoContent}
                onExpandMenu={this.onExpandMenu}
              />
            </div>
          ))
        }
        {children}
      </div>);
  }
}

Menu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  children: PropTypes.any,
  noDataDescription: PropTypes.any,
  noDataOperate: PropTypes.element,
  clickSource: PropTypes.string,
};

export default Menu;
