import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import classNames from 'classnames';
import Label from '../Label/Label';
import Input from '../Input/Input';
import style from './multiInput.css';

class MultiInput extends React.Component {
  constructor(props) {
    super(props);
    this.ifOnHover = false;
    this.state = {
      ifEditMode: false,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onFocus() {
    this.props.onFocus();
    this.setState({ ifEditMode: true });
  }

  onBlur() {
    if (this.ifOnHover) return;
    this.setState({ ifEditMode: false });
    this.props.onBlur();
  }

  onMouseEnter() {
    this.ifOnHover = true;
  }

  onMouseLeave() {
    this.ifOnHover = false;
  }

  render() {
    const { data, title } = this.props;
    const { ifEditMode } = this.state;
    const getSimpleContent = (itemData) => {
      let rtnStr = '';
      itemData.forEach((item, index) => {
        if (!_.isEmpty(item.value)) {
          if (index % 2 === 0) {
            rtnStr += item.value;
          } else {
            rtnStr += `<${item.value}>;`;
          }
        }
      });
      return rtnStr;
    };
    return (<div
      className={style.multiContainer}
    >
      {title &&
        <Label text={title} className={style.eidtTitle} />}
      <div
        ref={(element) => { this.container = element; }}
        tabIndex={-1}
        className={classNames(style.editContainer, ifEditMode ? style.editMode : style.readMode)}
        onBlur={this.onBlur}
        onClick={this.onFocus}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {ifEditMode ?
          data.map(item => (
            <div
              className={style.editItem}
            >
              <span>{`${item.name}: `}</span>
              <Input
                type="text"
                maxLength={2048}
                input={{
                  value: item.value,
                  onChange: (e) => {
                    item.onChanged(e.target.value);
                  },
                }}
              />
            </div>
          )) : getSimpleContent(data)
        }
      </div>
    </div >);
  }
}

MultiInput.defaultProps = {
  data: [{ name: 'Name', value: 'angus', onChange: _ => _ },
  { name: 'Email', value: 'angus@comm100.com', onChange: _ => _ }],
  onBlur: _ => _,
  onFocus: _ => _,
};

MultiInput.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

MultiInput.style = style;

export default MultiInput;
