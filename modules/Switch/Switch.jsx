import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.css';

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.handleChange(event.target.checked);
  }

  render() {
    return (
      <div
        className={classnames(style.switch, style.switchFlatRound)}
      >
        <input
          id={this.props.id}
          checked={this.props.checked}
          onChange={this.onChange}
          type={'checkbox'}
        />

        {
          React.createElement(
            'label',
            { htmlFor: this.props.id },
            this.state.label
          )
        }
      </div>
    );
  }
}

export default Switch;

Switch.propTypes = {
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  id: PropTypes.string,
};
