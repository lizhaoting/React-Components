import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from 'lodash';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div></div>);
  }
}

Form.propTypes = {
  mode: PropTypes.string,
  formData: PropTypes.arrayOf(PropTypes.shape({})),
  formValidateDic: PropTypes.arrayOf(PropTypes.shape({})),
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form;
