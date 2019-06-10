/*eslint-disable */
import React from 'react';
import classNames from 'classnames';
import * as _ from 'lodash';
import Input from '../Input/Input';
import Select from '../Select/Select';
import { dataTypeMap } from './conditionUtils';
import filterStyle from './condition.css';

class ConditionValue extends React.Component {
  render() {
    const { conditionSource,
      condition,
      index,
      onOptionsSelected,
      onDateOptionsSelected,
      isInputValid,
      onInputChanged,
    } = this.props;
    const conditions = conditionSource.filter(item => condition.fieldId === item.id);
    if (conditions.length > 0) {
      const name = conditions[0].name;
      const dataType = dataTypeMap(conditions[0].dataType);
      const valueOptions = conditions[0].options;
      const validObj = _.find(isInputValid, a => a.id === index);
      let isValid = false;
      if (validObj) isValid = validObj.flag;
      switch (dataType) {
        case 1:
        case 2:
          return (
            <div className={filterStyle.inputdiv}>
              <Input
                type="text"
                maxLength={1024}
                ref={(c) => { this.userInput = c; }}
                input={{
                  value: condition.value,
                  onChange: (e) => {
                    onInputChanged(e.target.value, condition.fieldId, index);
                  },
                }}
                className={classNames(filterStyle.inputClass,
                  (isValid && _.isEmpty(condition.value)) ?
                    filterStyle.isBlank : '')}
              />
            </div>);
        case 3:
          return (
            <Select
              height={30}
              input={{
                value: (condition.value.toString()).indexOf('@') >= 0 ?
                  condition.value :
                  (condition.showDatePicker && condition.showDatePicker === true ? '' : '@Today'),
                onChange: (value) => {
                  if (condition.matchType === 9) {
                    onDateOptionsSelected('', condition.fieldId, index);
                  } else {
                    onDateOptionsSelected(value, condition.fieldId, index);
                  }
                },
              }}
              className={classNames(filterStyle.conditionSelect)}
              options={valueOptions.map(option => ({ value: `${option.value}`, text: option.name }))}
            />
          );
        case 4:
          if (valueOptions.length === 0) return (<span></span>);
          const blank = _.find(valueOptions, a => a.value === 'Blank');
          return (
            <Select
              height={30}
              input={{
                value: condition.value === '' ?
                  (blank ? blank.value : valueOptions[0].value) :
                  condition.value,
                onChange: (value) => {
                  onOptionsSelected(value, condition.fieldId, index);
                },
              }}
              className={classNames(filterStyle.conditionSelect)}
              options={valueOptions.map(option => ({ value: option.value, text: option.name }))}
            />);
        default:
          return (<span></span>);
      }
    } else {
      return (<span></span>);
    }
  }
}

ConditionValue.propTypes = {
  conditionSource: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  condition: React.PropTypes.shape({}).isRequired,
};

export default ConditionValue;
