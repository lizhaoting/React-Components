/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from '../Select/Select';
import Icon from '../Icon/Icon';
import DatePicker from '../DatePicker/DatePicker';
import {
  conditionOptionOperatorMap,
  format,
  getChoiceDate,
  customDateFormat,
} from './conditionUtils';
import ConditionValue from './ConditionValue';
import filterStyle from './condition.css';

/* eslint-disable no-underscore-dangle */
const ConditionItem = (props) => {
  const {
    index,
    condition,
    conditionLen,
    conditionSource,
    isInputValid,
    onSourceSelected,
    onInputChanged,
    onOptionsSelected,
    onStartDatePicker,
    onDateOptionsSelected,
    onEndDatePicker,
    onDeleteConditionRow,
    onOperatorSelected } = props;
  return (
    <div key={`condition_${index}`}>
      <div className={filterStyle.conditionRow}>
        <div className={filterStyle.conditionNo}>
          <span>{`${index + 1}.`}</span>
        </div>
        <Select
          height={30}
          input={{
            value: condition.fieldId,
            onChange: (value) => {
              onSourceSelected(value, index, condition.matchType);
            },
          }}
          className={classNames(filterStyle.conditionSelect)}
          options={conditionSource.map(item => ({
            value: item.id,
            text: item.name,
          }))}
        />
        <Select
          height={30}
          input={{
            value: condition.matchType,
            onChange: (value) => {
              onOperatorSelected(condition.fieldId, index, value);
              // if (value === '9' || value === 9) {
              //   onDateOptionsSelected('', condition.fieldId, index);
              // }
            },
          }}
          className={classNames(filterStyle.conditionSelect)}
          options={conditionOptionOperatorMap(conditionSource, condition.fieldId).map(item => ({
            value: item.id,
            text: item.name,
          }))}
        />

        <ConditionValue
          index={index}
          condition={condition}
          conditionSource={conditionSource}
          onSourceSelected={onSourceSelected}
          onInputChanged={onInputChanged}
          onOptionsSelected={onOptionsSelected}
          onDateOptionsSelected={onDateOptionsSelected}
          onEndDatePicker={onEndDatePicker}
          isInputValid={isInputValid}
        />

        <div className={filterStyle.deleteBtn}>
          <Icon
            type={Icon.types.delete}
            size={12}
            onClick={() => {
              onDeleteConditionRow(index);
            }}
          />
        </div>
      </div>
      {condition.showDatePicker &&
        <div className={classNames(filterStyle.showDatePicker,
          conditionLen === index + 1 && filterStyle.lastShowDatePicker)}
        >
          {condition.matchType === 9 && <div style={{ display: 'inline' }}>
            <DatePicker
              dateFormatter={customDateFormat}
              className={filterStyle.datepickerwidth}
              input={{
                value: getChoiceDate(condition.value, true),
                onChange: (e) => {
                  onStartDatePicker(condition.fieldId,
                    format(new Date(e._d), customDateFormat), index);
                },
              }}
              meta={{}}
            /> <span style={{ marginRight: '3px', color: '#ccc' }}>-</span></div>}
          <DatePicker
            dateFormatter={customDateFormat}
            className={filterStyle.datepickerwidth}
            input={{
              value: getChoiceDate(condition.value, false),
              onChange: (e) => {
                onEndDatePicker(condition.fieldId,
                  format(new Date(e._d), customDateFormat), index);
              },
            }}
            meta={{}}
          />
        </div>
      }
    </div>
  );
};

ConditionItem.propTypes = {
  condition: PropTypes.shape({}),
  conditionLen: PropTypes.number,
  index: PropTypes.number,
  conditionSource: PropTypes.arrayOf(PropTypes.shape({})),
  onSourceSelected: PropTypes.func,
  onInputChanged: PropTypes.func,
  onOptionsSelected: PropTypes.func,
  onStartDatePicker: PropTypes.func,
  onDateOptionsSelected: PropTypes.func,
  onEndDatePicker: PropTypes.func,
  isInputValid: PropTypes.arrayOf(PropTypes.shape({})),
  onDeleteConditionRow: PropTypes.func,
  onOperatorSelected: PropTypes.func,
};

export default ConditionItem;
