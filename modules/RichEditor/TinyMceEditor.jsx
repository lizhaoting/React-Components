import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TinyMCE from 'react-tinymce';
import * as _ from 'lodash';
import ButtonMenu from '../ButtonMenu/ButtonMenu';
import Button from '../Button/Button';
import FileUpload from '../Upload/Upload';
import FileUploadProgress from '../FileUploadProgree/FileUploadProgress';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import style from './mceEditor.css';

const moreBtnData = [{
  type: 'SaveasDraft',
  text: 'Save as Draft',
}, {
  type: 'Discard',
  text: 'Discard',
}];
const displayItem = {
  type: 'Send',
  text: 'Send',
};
class TinyMceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.defaultConfig = {
      height: '100%',
      width: '100%',
      plugins: [
        'lists link image code paste textcolor',
      ],
      toolbar: 'undo redo bold italic underline forecolor backcolor | bullist numlist | alignleft aligncenter alignright | link unlink image | removeformat code ',
      menubar: false,
      theme: 'modern',
      branding: false,
      convert_urls: false,
      relative_urls: false,
      table_toolbar: '',
      invalid_elements: 'form,iframe,noscript,object',
      statusbar: false,
    };
    this.state = {
      editorConfig: Object.assign({}, this.defaultConfig, props.editorProps.config || {}),
      ifShowToolbar: props.editorProps.ifShowToolbar,
      isHover: false,
    };

    this.onTinyMCEContentChanged = this.onTinyMCEContentChanged.bind(this);
    this.updateHoverStatus = this.updateHoverStatus.bind(this);
    this.onSaveDraft = this.onSaveDraft.bind(this);
    this.onDiscard = this.onDiscard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const tmpConfig = Object.assign({}, this.defaultConfig, nextProps.editorProps.config || {});
    this.setState({
      editorConfig: tmpConfig,
      ifShowToolbar: nextProps.editorProps.ifShowToolbar,
    });
    if (!_.isEqual(this.props.editorProps.content, nextProps.editorProps.content)) {
      tinymce.EditorManager.get('ticket').setContent(nextProps.editorProps.content);
    }
  }

  onTinyMCEContentChanged(content) {
    this.props.editorProps.onSetTinyMsg(content);
  }

  onSaveDraft() {
    this.props.editorProps.onSaveAsDraft();
  }

  onDiscard() {
    this.props.editorProps.onDiscard();
  }

  updateHoverStatus(flag) {
    this.setState({
      isHover: flag,
    });
  }

  render() {
    const {
      editorConfig,
      ifShowToolbar,
     } = this.state;
    const {
      editorProps,
      uploaderProps,
      accounts,
      onSwitchAccount,
      displayButton,
      buttonGroup,
     } = this.props;
    return (
      <div
        className={classNames(style.editorContainer, editorProps.className,
          !ifShowToolbar && style.simpleEditor,
          editorProps.ifSimpleMode && style.simpleModeHeight)}
      >
        <TinyMCE
          id={'ticket'}
          content={editorProps.content}
          config={editorConfig}
          onChange={e => this.onTinyMCEContentChanged(e.target.getContent())}
          onFocus={editorProps.onFocus}
          onBlur={editorProps.onBlur}
        />
        <div
          className={classNames(style.editorFooter)}
        >
          <div
            className={style.attachmentGrp}
          >
            <div
              className={style.innerContent}
            >
              {uploaderProps.attachments && uploaderProps.attachments.length > 0 &&
                uploaderProps.attachments.map((attachment, index) => (
                  <div
                    key={`${index}_file`}
                  >
                    <FileUploadProgress
                      file={attachment.content}
                      fileName={attachment.fileName}
                      fileUploadProgressNumber={attachment.percent}
                      onHandleAbortUpload={uploaderProps.onHandleAbortUpload}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <FileUpload
            className={style.attachmentIcon}
            files={uploaderProps.attachments}
            dataTip={uploaderProps.attachmentTip}
            uploadConfig={uploaderProps.uploadConfig}
            onInitUpload={uploaderProps.onInitUpload}
          />
          {editorProps.ifShowSendButton && editorProps.ifShowToolbar && <SimpleSelect
            accounts={accounts}
            onSwitchAccount={onSwitchAccount}
            className={style.simpleSelect}
          />}
          <div
            className={classNames(style.buttonGrp, editorProps.ifShowSendButton && style.showSend)}
          >
            <ButtonMenu
              displayItem={displayButton}
              items={!ifShowToolbar && buttonGroup}
              btnType="primary"
              direction="up"
              onClick={(item) => {
                if (item.type === 'Send') {
                  editorProps.onSendMsg();
                } else if (item.type === 'SaveasDraft') {
                  this.onSaveDraft();
                } else {
                  this.onDiscard();
                }
              }}
            />
            {ifShowToolbar && editorProps.buttonTxtGrp &&
              <div
                className={style.morebtn}
              >
                <Button
                  type={'default'}
                  text={editorProps.buttonTxtGrp[0]}
                  className={style.button}
                  onClick={this.onSaveDraft}
                />
                <Button
                  type={'default'}
                  text={editorProps.buttonTxtGrp[1]}
                  className={style.button}
                  onClick={this.onDiscard}
                />
              </div>
            }
          </div>
        </div>
      </div >
    );
  }
}

TinyMceEditor.style = style;

TinyMceEditor.propTypes = {
  displayButton: PropTypes.shape({}),
  buttonGroup: PropTypes.arrayOf(PropTypes.shape({})),
  editorProps: PropTypes.shape({
    ifShowToolbar: PropTypes.bool,
    ifShowSendButton: PropTypes.bool,
    className: PropTypes.string,
    config: PropTypes.shape({}),
    content: PropTypes.string,
    onSetTinyMsg: PropTypes.func,
    onSendMsg: PropTypes.func,
    onSaveAsDraft: PropTypes.func,
    onDiscard: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    buttonTxtGrp: PropTypes.arrayOf(PropTypes.string),
    ifSimpleMode: PropTypes.bool,
  }),
  uploaderProps: PropTypes.shape({
    uploadConfig: PropTypes.shape({}),
    onInitUpload: PropTypes.func,
    attachmentTip: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.shape({})),
    onHandleAbortUpload: PropTypes.func,
  }),
  accounts: PropTypes.arrayOf(PropTypes.shape({})),
  onSwitchAccount: PropTypes.func,
};

TinyMceEditor.defaultProps = {
  displayButton: displayItem,
  buttonGroup: moreBtnData,
  editorProps: {
    ifShowToolbar: true,
    config: {},
    content: '',
  },
  uploaderProps: {
    attachmentTip: 'Total attachments size limit of one ticket: 20MB',
  },
  accounts: [],
  onSwitchAccount: _ => _,
};

export default TinyMceEditor;
