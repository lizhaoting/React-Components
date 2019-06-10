import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

class NoRecord extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.noRecordInfo, nextProps.noRecordInfo);
  }

  render() {
    const { noRecordInfo } = this.props;
    return (
      <div style={{ 'marginTop': '10px' }}>{noRecordInfo}</div>);
  }
}

NoRecord.propTypes = {
  noRecordInfo: PropTypes.string,
};

NoRecord.defaultProps = {
  noRecordInfo: 'No records were found.',
};

export default NoRecord;
