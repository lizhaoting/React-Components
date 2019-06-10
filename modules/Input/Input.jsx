import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Input.css';

class Input extends React.Component {
  render() {
    const {
      isDisabled,
      placeholder,
      input,
      type,
      autoComplete,
      maxLength,
      className,
      meta,
      isReadOnly,
      inputRef,
      animationEffect,
      ...rest
    } = this.props;
    if (animationEffect) {
      return (
        <div className={style.inputContainer}>
          <input
            {...input}
            readOnly={isReadOnly ? 'readOnly' : false}
            disabled={isDisabled ? 'disabled' : false}
            className={classnames(
              className,
              style.input,
              meta && meta.touched && meta.invalid && style.error,
              animationEffect,
            )}
            id={this.props.id || ''}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete ? 'on' : 'off'}
            maxLength={maxLength}
            ref={inputRef}
            {...rest}
          />
          <span className={style.input__focusBorder}>
            <i></i>
          </span>
        </div>
      )
    }
    return (
      <input
        {...input}
        readOnly={isReadOnly ? 'readOnly' : false}
        disabled={isDisabled ? 'disabled' : false}
        className={classnames(
          className,
          style.input,
          meta && meta.touched && meta.invalid && style.error
        )}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete ? 'on' : 'off'}
        maxLength={maxLength}
        ref={inputRef}
        {...rest}
      />
    );
  }
}

Input.defaultProps = {
  type: 'text',
  autoComplete: false,
};

Input.propTypes = {
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  input: PropTypes.object,
  meta: PropTypes.object,
  inputRef: PropTypes.func,
};

export default Input;
