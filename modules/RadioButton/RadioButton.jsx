import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import RadioButtonStyle from './RadioButton.css';

class RadioButton extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.radioOption, nextProps.radioOption) ||
      this.props.selectedVal !== nextProps.selectedVal ||
      this.props.disabled !== nextProps.disabled;
  }
  render() {
    return (
      <div className={RadioButtonStyle.clearfix}>
        {
          this.props.radioOption.map((item, index) => (
            /** @todo remove following eslint disable */
            // eslint-disable-next-line
            <label
              key={index}
              className={
                classnames(
                  RadioButtonStyle.control,
                  RadioButtonStyle.controlRadio,
                  this.props.className,
                  this.props.horizontal ? RadioButtonStyle.horizontal : '',
                  this.props.small ? RadioButtonStyle.small : '',
                )
              }
            >
              {item.text || item}
              <input
                type="radio"
                name={this.props.name}
                value={item.value || item}
                disabled={this.props.disabled}
                checked={this.props.selectedVal === item.value}
                onChange={this.props.disabled ? () => {} : this.props.handleChange}
              />

              <div className={RadioButtonStyle.controlIndicator} />
              {item.component ? item.component : ''}
            </label>
          ))
        }
      </div>
    );
  }
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  radioOption: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  selectedVal: PropTypes.string,
  handleChange: PropTypes.func,
  className: PropTypes.string,
  horizontal: PropTypes.bool,
  disabled: PropTypes.bool,
  // name: PropTypes.string.isRequired,
  // value: PropTypes.string.isRequired,
  // checked: PropTypes.string,
  // component: PropTypes.element,
};

RadioButton.defaultProps = {
  disabled: false,
  handleChange: () => {},
};

RadioButton.examples = {
  DefaultExample: {
    description: 'Default Example',
    component: <RadioButton
      name="banvisitor"
      selectedVal= '0'
      radioOption={[
        {
          text: 'Ban visitor from this Visitor Id.',
          value: '0',
        },
        {
          text: 'Ban visitor from this IP',
          value: '1',
        },
      ]}
      handleChange={event => console.log(event.target.value)}
    />,
  },
};

export default RadioButton;
