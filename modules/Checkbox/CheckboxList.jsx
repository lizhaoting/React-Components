import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import classnames from 'classnames';
import Checkbox from './Checkbox';
import style from './Checkbox.css';

/**
 * CheckboxList
 */
class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.Change = this.Change.bind(this);
  }
  Change(value, text, id) {
    let values = this.props.input.value;
    const listValues = values.split('⊙');

    if (value) {
      if (_.indexOf(listValues, id) === -1) {
        if (values.length > 0) {
          values = `${values}⊙${id}`;
        } else {
          values = id;
        }
      }
    } else if (_.indexOf(listValues, id) !== -1) {
      values = _.pull(listValues, id).join('⊙');
    }
    const onChange = this.props.input.onChange;
    if (onChange) {
      onChange(values);
    }
  }
  render() {
    const { className, options, align, ...rest } = this.props;
    return (
      <div
        className={classnames(style.container, className)}
      >
        {options.map((option, index) =>
          <div key={index} className={align === 'horizontal' ? style.horizontal : style.vertical} >
            <Checkbox
              {...rest}
              id={option.id.toString()}
              text={option.text}
              input={{
                value: _.indexOf(this.props.input.value.split('⊙'), option.id.toString()) !== -1,
                onChange: this.Change,
              }}
              isDisabled={this.props.disabled}
            />
          </div>
        )}
      </div>
    );
  }
}

CheckboxList.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  align: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

CheckboxList.defaultProps = {
};

CheckboxList.examples = {
  DefaultExample: {
    description: 'Default Example',
    component: <CheckboxList
      options={[{text: '111', id: 111}, {text: '123', id: 111}]}
      input={{ value: '111⊙123', onChange: value => console.log(value) }}
    />,
  },
  HorizontalExample: {
    description: 'horizontal Example',
    component: <CheckboxList
      options={[{text: '111', id: 111}, {text: '123', id: 111}]}
      align="horizontal"
      input={{ value: '', onChange: value => console.log(value) }}
    />,
  },
};

export default CheckboxList;
