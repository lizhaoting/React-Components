import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Trigger from 'rc-trigger';
import 'rc-trigger/assets/index.css';
import * as _ from 'lodash';
import Icon from '../Icon/Icon';
import { findDOMNode } from 'react-dom';
import DropdownMenu from './DropdownMenu';
import style from './Select.css';
import { shouldComponentUpdateGen } from '../utils/helper';

/** @todo remove following eslint disable */
/* eslint-disable react/no-string-refs */

let cache;
const shouldComponentUpdateHelper = shouldComponentUpdateGen(
  'Select',
  ['options', 'isDisabled'],
  ['selectValue', 'active'],
);

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 1],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -1],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      selectValue: this.props.input.value,
      width: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onDropdownVisibleChange = this.onDropdownVisibleChange.bind(this);
    this.onPopupFocus = this.onPopupFocus.bind(this);
    this.maybeFocus = this.maybeFocus.bind(this);
    this.resetTriggerWidth = this.resetTriggerWidth.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let active = this.state.active;
    if (nextProps.dropdownHidden && active) {
      active = false;
      this.lastDropdownHidden = true;
    }
    if (nextProps.input.value !== this.props.input.value) {
      this.setState({ selectValue: nextProps.input.value });
    }
  }
  componentWillUnmount() {
    cache = null;
  }
  onChange(value) {
    if (this.props.input.value !== value) {
      this.props.input.onChange(value);
    }
    this.setState({ active: false });
  }
  onDropdownVisibleChange(open) {
    const { state } = this;
    if (state.active === open) {
      this.maybeFocus(open, false);
      return;
    }
    const nextState = {
      active: open,
    };
    if (!open) {
      this.maybeFocus(open, false);
    }
    this.setState(nextState, () => {
      if (open) {
        this.maybeFocus(open, false);
      }
    });
  }
  onPopupFocus() {
    // fix ie scrollbar, focus element again
    this.maybeFocus(true, true);
  }
  maybeFocus(open, needFocus) {
    if (needFocus || open) {
      const input = findDOMNode(this.container);
      const { activeElement } = document;
      if (input && activeElement !== input) {
        input.focus();
      }
    }
  }
  resetTriggerWidth(node) {
    if (node) {
      /* eslint-disable */
      node.style.width = `${findDOMNode(this).offsetWidth}px`;
    }
  }
  render() {
    const {
      className,
      width = '',
      input,
      options,
      isDisabled,
      customizeStyle,
      dropdownClassName,
    } = this.props;
    const optionsMapping = options.reduce((_obj, option) => {
      const obj = _obj;
      obj[option.value] = option; // option.text || option.value;
      return obj;
    }, {});

    const selectedOption = optionsMapping[input.value] || options[0];
    const text = selectedOption ? (selectedOption.text || selectedOption.value) : '';
    const ownStyle = customizeStyle || {};
    ownStyle.width = width && width > 0 ? width : '100%';
    return (<Trigger
      showAction={isDisabled ? [] : ['click']}
      hideAction={['click']}
      popupPlacement="bottomLeft"
      builtinPlacements={BUILT_IN_PLACEMENTS}
      popup={<DropdownMenu
        onChange={this.onChange}
        onPopupFocus={this.onPopupFocus}
        options={options}
        selectedValue={this.state.selectValue}
        visible={this.state.active}
        className={classnames(style.dropdown, dropdownClassName)}
        iconSize={this.props.iconSize}
      />}
      popupVisible={this.state.active}
      onPopupVisibleChange={this.onDropdownVisibleChange}
      onPopupAlign={this.resetTriggerWidth}
    >
      <div
        tabIndex={-1}
        data-vmselect={this.state.active ? 'open' : 'close'}
        style={ownStyle}
        ref={(container) => { this.container = container; }}
        className={classnames(
          style.select,
          this.state.active && style.active,
          isDisabled && style.controlDisabled, className)
        }
        onBlur={() => { // fix IE ISSUE
          setTimeout(() => {
            if (this.state.active) {
              const containerDOM = findDOMNode(this.container);
              if (containerDOM && document.activeElement !== containerDOM) {
                containerDOM.focus();
              }
            }
          }, 100);
        }}
        onKeyPress={(event) => {
          const keyEv = event.nativeEvent.key.toLowerCase();
          if (!cache || cache.key !== keyEv) {
            cache = {
              key: keyEv,
              value: options.filter((item) => {
                const temp = _.trim(item.text).substr(0, 1);
                return temp.toLowerCase() === keyEv;
              }),
            };
          }
          if (cache.value.length === 0) return;
          let selectV = this.state.selectValue;
          let selectIndex = _.findIndex(cache.value, o => o.value === selectV);
          if (selectIndex === -1 || selectIndex === cache.value.length - 1) {
            selectIndex = 0;
            selectV = cache.value[selectIndex].value;
          } else {
            selectV = cache.value[selectIndex + 1].value;
          }
          if (this.state.active) {
            this.setState({
              selectValue: selectV,
            });
          } else {
            this.onChange(selectV);
          }
        }}
        onKeyDown={(event) => {
          let selectV = this.state.selectValue;
          const selectIndex = _.findIndex(options, o => o.value === selectV);
          console.log(event);
          switch (event.nativeEvent.keyCode) {
            case 13:
              event.preventDefault();
              event.stopPropagation();
              this.onChange(this.state.selectValue);
              this.setState({ active: false });
              break;
            case 27:
              event.preventDefault();
              event.stopPropagation();
              this.setState({
                active: false,
                selectValue: this.props.input.value,
              });
              break;
            case 40:
              event.preventDefault();
              event.stopPropagation();
              if (selectIndex < options.length - 1) {
                selectV = options[selectIndex + 1].value;
              }
              if (this.state.active) {
                this.setState({
                  selectValue: selectV,
                });
              } else {
                this.onChange(selectV);
              }
              break;
            case 38:
              event.preventDefault();
              event.stopPropagation();
              if (selectIndex > 0) {
                selectV = options[selectIndex - 1].value;
              }
              if (this.state.active) {
                this.setState({
                  selectValue: selectV,
                });
              } else {
                this.onChange(selectV);
              }
              break;
            default:
              break;
          }
        }}
      >
        <span className={style.selectLabel}>
          {
            (selectedOption && selectedOption.icon) &&
              <Icon type={selectedOption.icon} size={this.props.iconSize ? this.props.iconSize : 'normal'} className={style.optionIcon} />
          }
          { this.props.noWrap ? text.replace(/[\-\_\,\s+\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '') : text}
          {
            (selectedOption && selectedOption.tag) &&
            <span className={style.tagStyle} style={{ color: selectedOption.tagTheme }}>{selectedOption.tag}</span>
          }
        </span>
        <div className={style.selectArrow}>
          <Icon type="drop-down" size={11} color="#9b9b9b" />
        </div>
      </div>
    </Trigger>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  dropdownClassName: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({ })),
  iconSize: PropTypes.number,
  width: PropTypes.number,
  isDisabled: PropTypes.bool,
  customizeStyle: PropTypes.shape({ }),
  dropdownHidden: PropTypes.bool,
};

export default Select;
