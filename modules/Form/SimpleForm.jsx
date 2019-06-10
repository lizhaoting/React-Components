import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from 'lodash';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import Condition from '../Condition/Condition';
import Select from '../Select/Select';
import Label from '../Label/Label';
import DatePicker from '../DatePicker/DatePicker';
import RadioButton from '../RadioButton/RadioButton';
import MulitInput from '../MultiInput/MultiInput';
import { formMode, formItemType, formItemFloat } from '../constants/enumsForm';
import { format, getChoiceDate } from './formUtils';
import style from './form.css';

const tagItem = (tag, removeFunc) => (
  <div key={`item-${tag.id}`} className={style.tagItem}>
    <div className={style.tagName}>{tag.name}</div>
    <Icon
      className={style.deleteIcon}
      type={Icon.types.delete}
      size={8}
      onClick={() => { removeFunc(tag); }}
    />
  </div>);

const showFormBtnGroup = (onSave, onCancel, okText, cancelText) => {
  let okButton = null;
  let cancelButton = null;
  let hasOkBtn = false;
  let hasCancelBtn = false;
  if (onSave && _.isFunction(onSave)) {
    okButton =
      <Button
        className={style.okButton}
        type={'primary'}
        text={okText || 'OK'}
        onClick={onSave}
      />;
    hasOkBtn = true;
  }
  if (onCancel && _.isFunction(onCancel)) {
    cancelButton =
      <Button
        className={style.cancelButton}
        type={'default'}
        text={cancelText || 'Cancel'}
        onClick={onCancel}
      />;
    hasCancelBtn = true;
  }

  return (
    <div className={classNames(style.formFooter)}>
      {hasOkBtn && okButton}
      {hasCancelBtn && cancelButton}
    </div>
  );
};

const formItemFunc = (itemData, mode) => {
  let itemComponent = <span />;
  switch (itemData.itemType) {
    case formItemType.none:
    case formItemType.group:
      itemComponent = <span />;
      break;
    case formItemType.checkbox:
      itemComponent =
        <div className={style.checkboxcontainer}>
          <Checkbox
            input={{
              value: !itemData.value,
              onChange: (value) => {
                itemData.onChanged(!value);
              },
            }}
          />
          <span
            className={classNames(style.requiredSpan,
              itemData.isRequired && style.required)}
          >*</span>
        </div>;
      break;
    case formItemType.input:
      itemComponent =
        <div className={style.inputcontainer}>
          <Input
            type="text"
            className={style.input}
            maxLength={2048}
            input={{
              value: itemData.value,
              onChange: (e) => {
                itemData.onChanged(e.target.value);
              },
            }}
          />
          <span
            className={classNames(style.requiredSpan,
              itemData.isRequired &&
              mode === formMode.horizontalForm &&
              style.required)}
          >*</span>
          {itemData.ifNotValid && mode === formMode.horizontalForm &&
            <span className={style.required}>{itemData.errorMsg}</span>}
        </div>;
      break;
    case formItemType.condition:
      itemComponent =
        <Condition
          lstSource={itemData.lstSource}
          lstResult={itemData.lstResult}
          onUpdateResult={itemData.onUpdateResult}
          conditionContainer={style.conditionContainer}
          onJudgeConditionIfUnique={itemData.onJudgeConditionIfUnique}
        />;
      break;
    case formItemType.errorinfo:
      itemComponent = <span
        className={classNames(style.hidden, style.errorinfo,
          itemData.ifShow && style.visiable)}
      >
        {itemData.errorinfo}
      </span>;
      break;
    case formItemType.select:
      itemComponent = <div
        className={classNames(style.selectedContainer)}
      ><Select
          height={30}
          input={{
            value: itemData.value,
            onChange: (value) => {
              itemData.onChanged(value);
            },
          }}
          className={classNames(style.conditionSelect)}
          options={itemData.list.map((item) => {
            const option = {
              value: item.value,
              text: item.name,
            };
            if (item.icon) {
              option.icon = item.icon;
            }
            return option;
          })}
        />
      </div>;
      break;
    case formItemType.tag:
      itemComponent = <div
        className={style.tags}
      >
        {itemData.tags && itemData.tags.map(tag => tagItem(tag, itemData.removeTag))}
        <a onClick={itemData.onCommand}>{'+ Add'}</a>
      </div>;
      break;
    case formItemType.textarea:
      itemComponent = <textarea
        className={style.textarea}
        value={itemData.value}
        onChange={(e) => {
          itemData.onChanged(e.target.value);
        }}
      />;
      break;
    case formItemType.radio:
      itemComponent = <div
        className={style.radioOptionContainer}
      ><RadioButton
          name={'form_radio_01'}
          selectedVal={itemData.value}
          handleChange={(e) => {
            itemData.onChanged(e.target.value);
          }}
          radioOption={itemData.list.map((item) => {
            const option = {
              value: item.value,
              text: item.name,
            };
            if (item.icon) {
              option.icon = item.icon;
            }
            return option;
          })
          }
        />
      </div>;
      break;
    case formItemType.checkboxlist:
      itemComponent = <div
        className={style.checkboxlist}
      >
        {
          itemData.list.map((chk, index) => (
            <div
              className={style.checkboxItem}
              key={`${index}_chk`}
            >
              <Checkbox
                input={{
                  value: _.includes(itemData.value.split(itemData.sperator), chk.value),
                  onChange: (value) => {
                    itemData.onChanged(value, chk.value);
                  },
                }}
              />
              <span>{chk.name}</span>
            </div>
          ))}
      </div>;
      break;
    case formItemType.date:
      itemComponent = <div
        className={style.dateContainer}
      >
        <DatePicker
          dateFormatter={'YYYY-MM-DD'}
          input={{
            value: getChoiceDate(itemData.value),
            onChange: (e) => {
              itemData.onChanged(format(new Date(e._d), 'YYYY-MM-DD'));
            },
          }}
          meta={{}}
        /></div>;
      break;
    case formItemType.mulitinput:
      itemComponent = <MulitInput
        data={itemData.value}
      />;
      break;
    case formItemType.clearboth:
      itemComponent = <div
        className={style.clearboth}
      />;
      break;
    default:
      itemComponent = <span />;
      break;
  }

  return (<div
    key={itemData.key}
    className={classNames(itemData.label && style.formItem,
      itemData.itemType === formItemType.group && style.groupcontainer,
      itemData.formItemFloat === formItemFloat.left && style.floatLeft,
      itemData.formItemFloat === formItemFloat.right && style.floatRight)}
  >
    {(itemData.label && _.isString(itemData.label)) ?
      <Label
        text={`${itemData.label}`}
      /> : itemData.label
    }
    {itemData.isRequired && mode === formMode.verticalForm &&
      <span
        className={style.isRequired}
      >*</span>}
    {itemData.ifNotValid && mode === formMode.verticalForm &&
      <span className={style.required}>{itemData.errorMsg}</span>}
    {itemComponent}
  </div>);
};


class SimpleForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSaveForm = this.onSaveForm.bind(this);
  }

  onSaveForm() {
    //TODO add formValidate.
    this.props.onSave();
  }

  render() {
    const {
      mode,
      formData,
      onSave,
      onCancel,
      okText,
      cancelText,
      className,
     } = this.props;
    return (
      <div
        className={classNames(className, style.form, mode === formMode.horizontalForm ?
          style.horizontalForm : style.verticalForm)}
      >
        <div
          className={style.formContent}
        >{formData.length > 0 &&
          formData.map(formItem => (
            formItemFunc(formItem, mode)
          ))}
        </div>
        {showFormBtnGroup(onSave, onCancel, okText, cancelText)}
      </div>
    );
  }
}

SimpleForm.propTypes = {
  mode: PropTypes.oneOf(Object.keys(formMode).map(key => formMode[key])),
  formData: PropTypes.arrayOf(PropTypes.shape({})),
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
};

SimpleForm.modes = formMode;

SimpleForm.formItemTypes = formItemType;

SimpleForm.style = style;

SimpleForm.formItemFloat = formItemFloat;

export default SimpleForm;
