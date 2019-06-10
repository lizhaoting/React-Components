import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from 'lodash';
import Icon from '../Icon/Icon';
import Label from '../Label/Label';
import style from './simpleSelect.css';

function getDefaultSelectSender(accounts) {
  if (accounts.length > 0) {
    const defaultSender = _.find(accounts, a => a.isDefault);
    if (!defaultSender) {
      return accounts[0];
    }
    return defaultSender;
  }
  return { id: -1, email: '' };
}

class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddenAccountsPanel: true,
      selectedSender: getDefaultSelectSender(props.accounts),
    };
    if (props.accounts.length > 0) {
      props.onSwitchAccount(props.accounts[0]);
    }
    this.onSwitchAccount = this.onSwitchAccount.bind(this);
  }

  onSwitchAccount(account) {
    this.setState({
      hiddenAccountsPanel: true,
      selectedSender: account,
    });
    this.props.onSwitchAccount(account);
  }

  render() {
    const {
      hiddenAccountsPanel,
      selectedSender,
    } = this.state;
    const { accounts, className } = this.props;
    return (
      <div
        className={classNames(style.SimpleSelect, className)}
      >
        <Label
          text={'From:'}
          className={style.newticketfrom}
        />
        <span
          className={style.sender}
          onClick={() => {
            this.setState({ hiddenAccountsPanel: !hiddenAccountsPanel });
          }}
        >{selectedSender.email}
          <Icon
            type={Icon.types.gt}
            className={style.chosensender}
          />
        </span>
        <span
          className={style.integrationUsers}
        >
          <ul className={classNames(style.userslist, hiddenAccountsPanel && style.hide)}>
            {accounts.map(item => (
              <li
                key={item.id}
                className={classNames(style.accountitem, selectedSender.id === item.id && style.selected)}
                onClick={(e) => {
                  e.stopPropagation();
                  this.onSwitchAccount(item);
                }}
              >
                {item.email}
              </li>
            ))}
          </ul>
        </span>
      </div>);
  }
}

SimpleSelect.defaultProps = {
  selectedSender: {
    id: 1,
    email: 'angus@comm100.com',
  },
  accounts: [{
    id: 1,
    email: 'angus@comm100.com',
  }, {
    id: 2,
    email: 'andy@comm100.com',
  }],
  onSwitchAccount: _ => _,
};

SimpleSelect.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({})),
  onSwitchAccount: PropTypes.func,
  className: PropTypes.string,
};

export default SimpleSelect;
