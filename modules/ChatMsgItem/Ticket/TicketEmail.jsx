import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import Image from '../../Image/Image';
import HeaderLayout from '../../HeaderLayout/HeaderLayout';
import SimpleLayout from '../../SimpleLayout/SimpleLayout';
import Link from '../../Link/Link';
import style from './style.css';
import Icon from '../../Icon/Icon';
import Button from '../../Button/Button';
import Attachment from '../../Attachment/Attachment';

class TicketEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifShowEmail: false,
      ifShowQuote: false,
    };
    this.clickShowEmail = this.clickShowEmail.bind(this);
    this.clickQuote = this.clickQuote.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id ||
    nextState.ifShowEmail !== this.state.ifShowEmail ||
    nextState.ifShowQuote !== this.state.ifShowQuote;
  }

  clickShowEmail() {
    this.setState({
      ifShowEmail: !this.state.ifShowEmail,
    });
  }

  clickQuote() {
    this.setState({
      ifShowQuote: !this.state.ifShowQuote,
    });
  }

  render() {
    const {
      content,
      to,
      cc,
      from,
      replierName,
      attachments,
      className,
      replierAvatar,
      time,
      quote,
      showLable,
      hideLable,
      defaultImage,
      onClickFile,
    } = this.props;

    return (
      <SimpleLayout className={classnames(style.itemSection, className)}>
        <SimpleLayout className={classnames(style.padding0, style.headerLayout)}>
          <HeaderLayout
            className={style.headerSection}
          >
            <HeaderLayout.Left
              className={style.userAvtar}
            >
              <Image
                defaultImage={defaultImage}
                className={style.messageAvatar}
                src={replierAvatar}
              />
            </HeaderLayout.Left>
            <HeaderLayout.Middle>
              <ul className={classnames(style.ulwraper, style.userInfo)}>
                <li>
                  {replierName}
                  {(to || cc) && (
                    <Icon
                      className={classnames(style.dropdownIcon,
                        this.state.ifShowEmail && style.hide)}
                      type={Icon.types.ticketDropdown}
                      onClick={this.clickShowEmail}
                    />
                  )}
                </li>
                <li>{from}</li>
              </ul>
            </HeaderLayout.Middle>
            <HeaderLayout.Right
              className={style.sendTime}
            >
              {time}
            </HeaderLayout.Right>
          </HeaderLayout>
        </SimpleLayout>
        {this.state.ifShowEmail && (to || cc) && (
          <SimpleLayout className={classnames(style.padding0, style.hideSection)}>
            <ul className={classnames(style.ulwraper, style.hideWraper)}>
              <li className={style.fieldsection}>
                <span className={style.name}>To:</span>
                <span className={style.value}>{to}</span>
              </li>
              <li className={style.fieldsection}>
                <span className={style.name}>CC:</span>
                <span className={style.value}>{cc}</span>
              </li>
            </ul>
          </SimpleLayout>
        )}
        <SimpleLayout className={style.padding0}>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </SimpleLayout>
        {_.isArray(attachments) && attachments.length > 0 && (
          <SimpleLayout className={style.padding0}>
            <Attachment
              attachments={attachments}
              onClickFile={onClickFile}
            />
          </SimpleLayout>
        )}
        {quote && (
          <SimpleLayout className={style.padding0}>
            {this.state.ifShowQuote && (
              <SimpleLayout className={style.padding0}>
                <div
                  dangerouslySetInnerHTML={{ __html: quote }}
                />
              </SimpleLayout>
            )}
            <Link
              className={style.showMoreLink}
              descriptionInfo={this.state.ifShowQuote ? hideLable : showLable}
              onContentManage={this.clickQuote}
            />
          </SimpleLayout>
        )}
      </SimpleLayout>
    );
  }
}

TicketEmail.defaultProps = {
  attachments: [],
  className: '',
  showLable: 'Show quote replies >>',
  hideLable: '<< Hide quote replies',
  replierAvatar: '',
  replierName: '',
  from: '',
  to: '',
  cc: '',
  content: '',
  quote: '',
  isHtml: true,
};

TicketEmail.propTypes = {
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
  replierAvatar: PropTypes.string,
  replierName: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  cc: PropTypes.string,
  time: PropTypes.string.isRequired,
  content: PropTypes.string,
  quote: PropTypes.string,
  attachments: PropTypes.arrayOf(PropTypes.shape({})),
  isHtml: PropTypes.bool,
  showLable: PropTypes.string,
  hideLable: PropTypes.string,
  defaultImage: PropTypes.string.isRequired,
  onClickFile: PropTypes.func.isRequired,
};


export default TicketEmail;
