import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Label from '../Label/Label';
import {
  conditionOptionOperatorMap,
  getDefaultOption,
  getDataType,
  format,
} from './conditionUtils';
import ConditionItem from './ConditionItem';
import style from './condition.css';

/**
 * 该控件封装修改考虑数据返回，以及输入校验。
 *
 * @class Condition
 * @extends {React.Component}
 */
class Condition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputValid: [],
      lstResult: props.lstResult,
      lstSource: props.lstSource,
    };

    this.onChoiceSource = this.onChoiceSource.bind(this);
    this.onChoiceOperator = this.onChoiceOperator.bind(this);
    this.onChoiceOptionValue = this.onChoiceOptionValue.bind(this);
    this.onCreateCondition = this.onCreateCondition.bind(this);
    this.onRemoveCondition = this.onRemoveCondition.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onStartDatePicker = this.onStartDatePicker.bind(this);
    this.onEndDatePicker = this.onEndDatePicker.bind(this);
    this.onDateOptionsSelected = this.onDateOptionsSelected.bind(this);
    this.onConditionVerify = this.onConditionVerify.bind(this);
    this.onUpdateLstResult = this.onUpdateLstResult.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      this.setState({
        lstResult: nextProps.lstResult,
        lstSource: nextProps.lstSource,
      });
    }
  }

  componentDidUpdate() {
    if (this.conditionWraper) {
      if (this.conditionWraper.scrollHeight > this.conditionWraper.clientHeight) {
        this.conditionWraper.scrollTop = this.conditionWraper.scrollHeight;
      }
    }
  }

  /* 判断条件有待优化 */
  onConditionVerify(lstResultCopy) {
    const { lstSource, isInputValid } = this.state;
    let isPass = true;
    const validObj = _.cloneDeep(isInputValid);
    /* eslint-disable no-param-reassign */
    lstResultCopy.forEach((a, index) => {
      a.index = index + 1;
      const dataType = getDataType(lstSource, a.fieldId);
      if (_.isEmpty(a.value)) {
        if ((dataType === 1 || dataType === 2)) {
          isPass = false;
          validObj.push({ id: index, flag: true });
        } else if (dataType === 3) { // datetime
          if (a.showDatePicker) {
            const now = new Date(_.now());
            a.value = format(now);
          } else {
            a.value = getDefaultOption(lstSource, a.fieldId);
          }
        } else { // option
          a.value = getDefaultOption(lstSource, a.fieldId);
        }
      }
    });

    this.setState({ isInputValid: validObj });
    return { lstResultCopy, isPass };
  }

  onUpdateLstResult(lstResultCopy) {
    const result = this.onConditionVerify(lstResultCopy);
    const { onUpdateResult } = this.props;
    if (onUpdateResult && _.isFunction(onUpdateResult)) {
      onUpdateResult(result);
    }
  }

  onChoiceSource(id, opIndex) {
    const { lstSource, lstResult } = this.state;
    const selectedConditions = lstSource.filter(con => con.id === parseInt(id));
    if (!selectedConditions) return;

    const lstResultCopy = _.cloneDeep(lstResult);
    lstResultCopy.map((item, index) => {
      if (index === opIndex) {
        item.showDatePicker = false;
        item.fieldId = parseInt(id);
        item.matchType = -1;
        item.value = '';
      }

      return item;
    });

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  onChoiceOperator(id, opIndex, matchType) {
    const { lstResult } = this.state;
    const lstResultCopy = _.cloneDeep(lstResult);
    lstResultCopy.map((item, index) => {
      if (index === opIndex) {
        item.fieldId = parseInt(id);
        item.matchType = parseInt(matchType);
        if (matchType === 9 || matchType === '9') {
          item.showDatePicker = true;
          item.value = '';
        }
      }
      return item;
    });

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  onChoiceOptionValue(value, id, opIndex) {
    const { lstResult } = this.state;
    const lstResultCopy = _.cloneDeep(lstResult);
    lstResultCopy.map((item, index) => {
      if (index === opIndex) {
        item.value = value;
      }
      return item;
    });

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  onCreateCondition() {
    const { lstResult } = this.state;
    const lstResultCopy = _.cloneDeep(lstResult);
    const condition = {
      fieldId: -1,
      matchType: -1,
      value: 'init@@||@@init',
      index: lstResult.length + 1,
    };
    lstResultCopy.push(condition);

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  onRemoveCondition(index) {
    const { lstResult } = this.state;
    const lstResultCopy = _.cloneDeep(lstResult);
    lstResultCopy.splice(index, 1);

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  onInputChanged(value, id, opIndex) {
    const { lstResult } = this.state;
    const lstResultCopy = _.cloneDeep(lstResult);
    lstResultCopy.map((item, index) => {
      if (index === opIndex) {
        item.value = value;
      }
      return item;
    });

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  onStartDatePicker(fieldId, value, opIndex) {
    const { lstResult } = this.state;
    const lstResultCopy = _.cloneDeep(lstResult);
    lstResultCopy.map((item, index) => {
      if (index === opIndex) {
        if (item.value.indexOf('|') > 0) {
          const dateAry = item.value.split('|');
          dateAry[0] = value;
          // if (dateAry[0] > dateAry[1]) return item;
          item.value = `${dateAry[0]}|${dateAry[1]}`;
        } else {
          item.value = `${value}|`;
        }
      }

      return item;
    });

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  onEndDatePicker(fieldId, value, opIndex) {
    const { lstResult } = this.state;
    const lstResultCopy = _.cloneDeep(lstResult);
    lstResultCopy.map((item, index) => {
      if (index === opIndex) {
        item.value = value;
        // #region comment Date between
        // if (item.value.indexOf('|') > 0) {
        //   const dateAry = item.value.split('|');
        //   dateAry[1] = value;
        //   item.value = `${dateAry[0]}|${dateAry[1]}`;
        // } else {
        //   item.value = `|${value}`;
        // }
        // #endregion
      }
      return item;
    });

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  onDateOptionsSelected(value, fieldId, opIndex) {
    const { lstResult } = this.state;
    const lstResultCopy = _.cloneDeep(lstResult);
    lstResultCopy.map((item, index) => {
      if (index === opIndex) {
        if (value === '') {
          item.showDatePicker = true;
        } else {
          item.showDatePicker = false;
        }
        item.value = value;
      }
      return item;
    });

    this.setState({ lstResult: lstResultCopy });
    this.onUpdateLstResult(lstResultCopy);
  }

  render() {
    const {
      operateTitle,
      conditionContainer,
     } = this.props;
    const { isInputValid, lstSource, lstResult } = this.state;
    const sortLstSource = _.orderBy(lstSource, [source => source.name], 'asc');
    const conditionLen = lstResult.length;

    return (<div className={conditionContainer}>
      <div
        ref={(t) => {
          this.conditionWraper = t;
        }}
        className={classNames(style.conditionContainer,
          lstResult.length > 0 && style.containershow)}
      >
        {lstResult.map((condition, index) => {
          condition.fieldId = condition.fieldId === -1 ?
            sortLstSource[0].id : condition.fieldId;
          condition.matchType = condition.matchType === -1 ?
            conditionOptionOperatorMap(sortLstSource, condition.fieldId)[0].id :
            condition.matchType;
          condition.value = condition.value === 'init@@||@@init' ?
            sortLstSource[0].options[0].value : condition.value;
          return (
            <ConditionItem
              index={index}
              conditionLen={conditionLen}
              condition={condition}
              conditions={lstResult}
              key={`condition_${index}`}
              isInputValid={isInputValid}
              conditionSource={sortLstSource}
              onSourceSelected={this.onChoiceSource}
              onInputChanged={this.onInputChanged}
              onOptionsSelected={this.onChoiceOptionValue}
              onStartDatePicker={this.onStartDatePicker}
              onDateOptionsSelected={this.onDateOptionsSelected}
              onEndDatePicker={this.onEndDatePicker}
              onDeleteConditionRow={this.onRemoveCondition}
              onOperatorSelected={this.onChoiceOperator}
            />
          );
        })}
      </div>
      <div className={style.operateDiv}>
        <Label
          text={operateTitle || 'Add Condition'}
          className={style.addCondition}
          onClick={this.onCreateCondition}
        />
      </div>
    </div >);
  }
}

Condition.propTypes = {
  operateTitle: PropTypes.string,
  lstResult: PropTypes.arrayOf(PropTypes.shape({})),
  lstSource: PropTypes.arrayOf(PropTypes.shape({})),
  onUpdateResult: PropTypes.func,
  conditionContainer: PropTypes.string,
};

export default Condition;
