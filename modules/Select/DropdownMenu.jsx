import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import scrollIntoView from './scrollIntoView';
import Option from './Option';
import OptGroup from './OptGroup';
import style from './Select.css';
import { createGUID } from '../utils/guid';

function staticSelectGenerator({ options, selectedValue, onChange, iconSize }, gid) {
  const optionGroups = options.reduce((_obj, option, idx) => {
    const obj = _obj;
    const group = option.group || '';
    const text = option.text || option.value;
    const component = <Option icon={option.icon} tag={option.tag} tagTheme={option.tagTheme} iconSize={iconSize} value={option.value} id={gid} key={`${gid}_${idx}`} selectedValue={selectedValue} text={text} onChange={onChange} />;
    if (obj[group]) obj[group].push(component);
    else obj[group] = [component];
    return obj;
  }, {});
  let optionComponents = [];
  _.forEach(Object.keys(optionGroups), (key) => {
    if (key === '') {
      optionComponents = optionComponents.concat(optionGroups[key]);
    } else {
      optionComponents.push(<OptGroup label={key}>
        {optionGroups[key]}
      </OptGroup>);
    }
  });
  return optionComponents;
}
class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.gid = createGUID();
    this.menuWrapper = null;
  }
  componentDidMount() {
    const props = this.props;
    if (props.visible) {
      this.scrollActiveItemToView();
    }
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.selectedValue !== nextProps.selectedValue
     || this.props.visible !== nextProps.visible
     || !_.isEqual(this.props.options, nextProps.options)) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const props = this.props;
    if (props.visible) {
      this.scrollActiveItemToView();
    }
  }

  scrollActiveItemToView() {
    // scroll into view
    const activeItem = document.getElementById(this.gid);
    if (activeItem) {
      scrollIntoView(activeItem, this.menuWrapper, {
        onlyScrollIfNeeded: true,
        alignWithTop: true,
      });
    }
  }

  render() {
    if (this.props.options && this.props.options.length) {
      return (
        <div
          ref={(element) => { this.menuWrapper = element; }}
          className={this.props.className}
          style={{ overflow: 'auto' }}
          onFocus={this.props.onPopupFocus}
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
          <ul
            key={this.gid}
            className={style['dropdown-menu']}
          >
            {staticSelectGenerator(this.props, this.gid)}
          </ul>
        </div>
      );
    }
    return null;
  }
}

DropdownMenu.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
  iconSize: PropTypes.number,
  selectedValue:
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onPopupFocus: PropTypes.func,
  visible: PropTypes.bool,
};

export default DropdownMenu;
