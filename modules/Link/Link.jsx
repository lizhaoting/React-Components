import React from 'react';
import PropTypes from 'prop-types';

const Link = (props) => {
  const { onContentManage, className, descriptionInfo } = props;
  return (<a
    className={className}
    href="javascript:void(0)"
    onClick={onContentManage}
  >
    {descriptionInfo}
  </a>
  );
};

Link.propTypes = {
  descriptionInfo: PropTypes.string,
  onContentManage: PropTypes.func,
  className: PropTypes.string,
};

export default Link;
