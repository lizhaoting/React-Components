/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import classNames from 'classnames';
import Label from '../../Label/Label';
import Icon from '../../Icon/Icon';
import { icons } from '../../constants/enums';
import { tooltips } from '../../constants/enumtooltip';
import CornerMark from '../../CornerMark/CornerMark';
import Tooltip from '../../Tooltip/Tooltip';
import Section from '../../Section/Section';
import style from '../menu.css';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifShowSubMenu: props.expandSubMenuDefault || false,
    };
    this.onShowSubMenu = this.onShowSubMenu.bind(this);
  }

  componentDidUpdate() {
    Tooltip.rebuild();
  }

  onShowSubMenu(menuid) {
    this.setState({ ifShowSubMenu: !this.state.ifShowSubMenu });
    this.props.onExpandMenu(!this.state.ifShowSubMenu, menuid);
  }

  render() {
    const {
      menuid,
      flagIcon,
      menuTitle,
      menuItemList,
      ifShowOperation,
      ifShowCornerMark,
      refreshTip,
      settingTip,
      onItemSelected,
      onMainClick,
      onRefresh,
      onSetting,
      subMenuClassName,
      menuContainerClassName,
      refreshIconClassName,
      settingIconClassName,
      titleMap,
      numMap,
      ifShowSimple,
      isActive,
      isNoContent,
      noDataOperate,
      noDataDescription,
    } = this.props;
    const { ifShowSubMenu } = this.state;
    const itemList = menuItemList || [];
    const defaultMenuName = _.isEmpty(titleMap) ? 'name' : titleMap;
    const defaultMenuNum = _.isEmpty(numMap) ? 'number' : numMap;

    const NoContent = (noDataDes, noDataOper) => (
      <div className={style.noContent}>
        {noDataDes}
        {noDataOper}
      </div>);

    return (<div className={classNames(style.itemContainer, menuContainerClassName)}>
      <div
        className={classNames(style.menuTitle,
          itemList.length <= 0 && style.noSub,
          isActive && itemList.length <= 0 && style.isSelected)}
        onClick={() => {
          if (itemList.length > 0) {
            this.onShowSubMenu(menuid);
          }
          if (onMainClick && _.isFunction(onMainClick)) {
            onMainClick();
          }
        }}
      >
        <span className={classNames(style.mainIcon,
          isActive && itemList.length > 0 && style.isActive)}
        >
          {flagIcon ? flagIcon :
            <Icon
              type={icons.edit}
            />}
        </span>
        {itemList.length > 0 &&
          <Icon
            type={ifShowSubMenu ? icons.arrowDown : icons.arrowRight}
            className={classNames(style.expandIcon)}
          />}
        <Label
          text={menuTitle}
          className={classNames(style.itemText, style.mainText,
            itemList.length <= 0 && style.hasNoSub)}
        />
        <div className={classNames(style.operationgroup,
          ifShowOperation && style.showOperation)}
        >
          <Icon
            type={icons.refresh}
            className={classNames(style.refresh, refreshIconClassName)}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRefresh();
            }}
            data-for={tooltips.bottom}
            data-tip={refreshTip || 'Refresh'}
          />
          <Icon
            type={icons.chatListSetting}
            className={classNames(style.settings, settingIconClassName)}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onSetting();
            }}
            data-for={tooltips.left}
            data-tip={settingTip || 'Setting'}
          />
        </div>
      </div>

      {isNoContent ? NoContent(noDataDescription, noDataOperate) :
        (ifShowSubMenu && itemList.length > 0) &&
        <Section panelClass={style.scrollPanel}> {
          itemList.map((menu) => {
            const cornernum = menu[`${defaultMenuNum}`] || 0;
            return (
              <div
                key={menu.id}
                className={classNames(style.submenuitem, subMenuClassName,
                  menu.isSelected && style.isSelected)}
                onClick={() => {
                  onItemSelected(menu.id);
                }}
                data-for={tooltips.bottom}
                data-tip={menu[`${defaultMenuName}`]}
              >
                <Label
                  text={menu[`${defaultMenuName}`]}
                  className={classNames(style.submenutext,
                    (ifShowCornerMark && cornernum > 0) && style.submenutextcorner)}
                />
                <div
                  className={classNames(style.cornerdiv,
                    (ifShowCornerMark && cornernum > 0) && style.showcorner)}
                >
                  <CornerMark
                    className={style.corner}
                    num={cornernum}
                    ifShowSimple={ifShowSimple}
                  />
                </div>
              </div>);
          })}
        </Section>
      }
    </div >);
  }
}

MenuItem.proptypes = {
  flagIcon: PropTypes.element,
  subMenuClassName: PropTypes.string,
  refreshIconClassName: PropTypes.string,
  settingIconClassName: PropTypes.string,
  menuTitle: PropTypes.string,
  menuItemList: PropTypes.arrayOf(PropTypes.shape({})),
  ifShowOperation: PropTypes.bool,
  ifShowCornerMark: PropTypes.bool,
  expandSubMenuDefault: PropTypes.bool,
  refreshTip: PropTypes.string,
  settingTip: PropTypes.string,
  onItemSelected: PropTypes.func,
  onMainClick: PropTypes.func,
  onRefresh: PropTypes.func,
  onSetting: PropTypes.func,
  titleMap: PropTypes.string,
  numMap: PropTypes.string,
  ifShowSimple: PropTypes.bool,
  isActive: PropTypes.bool,
  isNoContent: PropTypes.bool,
};

export default MenuItem;
