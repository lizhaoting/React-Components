import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input/Input';
import Label from '../Label/Label';
import style from './emailHeader.css';

const EmailHeader = (props) => {
  const {
    Subject,
    To,
    Cc,
    onChangeSubject,
    onChangedTo,
    onChangedCc,
    errorlist,
    ifShowSimple,
    onChangeTo,
    onRemove,
  } = props;

  const { isSubjectPass, isToPass, isCcPass } = errorlist;

  return (
    <div
      className={classNames(style.emailHeader,
        ifShowSimple && style.headerSimple)}
    >
      <div
        className={classNames(style.subjectdiv,
          !isSubjectPass && style.error,
          ifShowSimple && style.hid)}
      >
        <span
          className={style.subjectitem}
        >Subject: </span>
        <Input
          type="text"
          className={classNames(style.input, style.subjectinput)}
          maxLength={2048}
          input={{
            value: Subject,
            onChange: (e) => {
              onChangeSubject(e.target.value);
            },
          }}
        />
        <span
          className={style.isRequired}
        >*</span>
      </div>
      <div
        className={classNames(style.todiv,
          !isToPass && style.error,
          ifShowSimple && style.toSimpleMode)}
      >
        <span
          className={style.toitem}
        >To: </span>
        {!ifShowSimple ? <Input
          type="text"
          className={classNames(style.input, style.toinput)}
          maxLength={2048}
          input={{
            value: To,
            onChange: (e) => {
              onChangedTo(e.target.value);
            },
          }}
        /> : <span style={{ 'marginLeft': '10px' }}>{To}<Label
          text={'Change'}
          className={classNames(style.link, style.change)}
          onClick={onChangeTo}
        /></span>}
      </div>
      <div
        className={classNames(style.ccdiv,
          !isCcPass && style.error,
          ifShowSimple && style.ccSimpleMode)}
      >
        <span
          className={style.toitem}
        >Cc: </span>
        <Input
          type="text"
          className={classNames(style.input, style.ccinput)}
          maxLength={2048}
          input={{
            value: Cc,
            onChange: (e) => {
              onChangedCc(e.target.value);
            },
          }}
        />
        {ifShowSimple &&
          <Label
            text={'Remove'}
            className={classNames(style.link, style.remove)}
            onClick={onRemove}
          />
        }
      </div>
    </div>
  );
};

EmailHeader.defaultProps = {
  ifShowSimple: false,
};

EmailHeader.propTypes = {
  Subject: PropTypes.string,
  To: PropTypes.string,
  Cc: PropTypes.string,
  onChangeSubject: PropTypes.func,
  onChangedTo: PropTypes.func,
  onChangedCc: PropTypes.func,
  errorlist: PropTypes.shape({}),
  ifShowSimple: PropTypes.bool,
  onChangeTo: PropTypes.func,
  onRemove: PropTypes.func,
};

export default EmailHeader;
