import React, { Component } from 'react';
import classnames from 'classnames';
import Upload from 'rc-upload';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';

const emptyConfig = { percent: 0 };
const getFile = (files) => {
  if (!files) return emptyConfig;
  const last = files[files.length - 1];
  if (!last || last.percent >= 100) return emptyConfig;
  return last;
};

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.upload = null;
    this.uploadConfig = Object.assign({
      disabled: false,
      action: '',
    }, props.uploadConfig);
  }

  render() {
    const { dataTip, className, onInitUpload } = this.props;
    // const { percent } = getFile(files);
    // if (!this.uploadConfig.disabled) {
    //   if (percent !== 100 && percent !== 0) {
    //     this.uploadConfig.disabled = true;
    //   } else {
    //     this.uploadConfig.disabled = false;
    //   }
    // }
    return (
      <div
        className={classnames(className)}
      >
        <span
          data-tip={dataTip}
          data-for={Tooltip.types.top}
        >
          <Upload
            ref={(element) => { this.upload = element; onInitUpload(element); }}
            {...this.uploadConfig}
          >
            <Icon
              type={Icon.types.ticketAttachment}
              data-for={dataTip}
              data-tip={Tooltip.types.top}
            />
          </Upload>
        </span>
      </div>
    );
  }
}

FileUpload.propTypes = {
  className: React.PropTypes.string,
  uploadConfig: React.PropTypes.shape({}),
  files: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  dataTip: React.PropTypes.string,
  onInitUpload: React.PropTypes.func,
};

export default FileUpload;
