import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import style from './attachment.css';
import Icon from '../Icon/Icon';

class Attachment extends React.Component {
  render() {
    const {
      attachments,
      onClickFile,
    } = this.props;
    if (!_.isArray(attachments) || attachments.length === 0) return null;
    return (
      <ul className={style.attachment}>
        <li className={style.icon}>
          <Icon
            type={Icon.types.ticketAttachment}
          />
        </li>
        {attachments.map(item => (
          <li key={item.id}>
            <Button
              className={style.file}
              text={item.fileName}
              onClick={() => {
                onClickFile(item);
              }}
            />
          </li>
        ))}
      </ul>
    );
  }
}

Attachment.defaultProps = {
  attachments: [],
};

Attachment.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.shape({})),
  onClickFile: PropTypes.func.isRequired,
};

export default Attachment;
