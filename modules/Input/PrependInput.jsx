import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Input.css';
import Input from './Input';

const PrependInput = (props) => {
  const { text, ...inputProps } = props;
  return (
    <div
      className={classnames(
        style.prependContainer,
        props.className,
        props.showError && props.error && style.error
      )}
    >
      <div className={style.prepend}>
        {text}
      </div>
      <Input
        {...inputProps}
      />
    </div>
  );
};

PrependInput.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
};

PrependInput.defaultProps = {
};

PrependInput.examples = {
  DefaultExample: {
    description: 'Prepend Input Example',
    component: <PrependInput
      input={{}}
      meta={{}}
      name="email"
      type="email"
      placeholder="Email"
      text="Email"
    />,
  },
};

export default PrependInput;
