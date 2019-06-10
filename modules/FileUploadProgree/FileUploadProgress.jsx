import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import style from './fileUploadProgress.css';

const FileUploadProgress = props => (
  <div
    className={style.uploadProgressContainer}
  >
    <div
      className={classNames(style.unfinishbg,
        props.fileUploadProgressNumber === 100 && style.finished)}
      style={{ width: `${props.fileUploadProgressNumber} !important` }}
    >
      <div
        className={style.progressContainer}
      >
        <span className={style.uploadFileName}>
          {props.fileName}
          <Icon
            type={Icon.types.delete}
            onClick={() => props.onHandleAbortUpload(props.file, props.fileName)}
          />
        </span>
      </div>
    </div>
  </div>
);

export default FileUploadProgress;

FileUploadProgress.propTypes = {
  file: React.PropTypes.shape({}).isRequired, /** @todo better PropTypes here */
  fileName: React.PropTypes.string,
  fileUploadProgressNumber: React.PropTypes.number.isRequired,
  onHandleAbortUpload: React.PropTypes.func.isRequired,
};
