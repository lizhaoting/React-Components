import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './TextArea.css';


const TextArea = (props) => {
  const { input, rows, cols, isDisabled, placeholder, type, maxLength, className, meta } = props;
  return (
    <textarea
      {...input}
      cols={cols}
      rows={rows}
      disabled={isDisabled ? 'disabled' : false}
      className={classnames(
        className,
        style.multipleText,
        meta.touched && meta.invalid && style.error
      )}
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

export default TextArea;

TextArea.propTypes = {
  rows: PropTypes.string,
  cols: PropTypes.string,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  meta: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
