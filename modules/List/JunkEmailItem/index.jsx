/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import classNames from 'classnames';
import style from '../item.css';
import Header from './Header';
import Subject from './Subject';
import Msg from './Msg';

/* eslint-disable jsx-a11y/no-static-element-interactions */
class Item extends React.Component {
  constructor(props) {
    super(props);
    const {
      selected,
      itemData,
    } = props;
    this.state = {
      ifRead: itemData.ifRead,
      ifSelected: selected === itemData.id,
    };
    this.onSetReadOrUnRead = this.onSetReadOrUnRead.bind(this);
    this.selectedTicket = this.selectedTicket.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      selected,
      itemData,
    } = nextProps;
    this.setState({
      ifRead: itemData.ifRead,
      ifSelected: selected === itemData.id,
    });
  }

  onSetReadOrUnRead() {
    const {
      itemData,
      onSetReadOrUnRead,
    } = this.props;
    onSetReadOrUnRead(itemData.id, !itemData.ifRead);
    this.setState({
      ifRead: !this.state.ifRead,
    });
  }

  selectedTicket() {
    const {
      itemData,
      onSelectedTicket,
    } = this.props;
    onSelectedTicket(itemData.id, itemData.ifRead);
    this.setState({
      ifSelected: true,
    });
  }

  render() {
    const { itemData } = this.props;
    return (
      <div
        className={classNames(style.content_item,
          style.junk,
          this.state.ifSelected && style.isSelected)}
      >
        <div
          className={classNames(style.flagdiv)}
          onClick={(e) => {
            e.stopPropagation();
            this.onSetReadOrUnRead();
          }}
        >
          <div
            className={classNames(style.dividebottom,
              this.state.ifRead ? style.read : style.unread)}
          >&nbsp;</div>
        </div>
        <div
          className={style.itemcontent}
          onClick={(e) => {
            e.stopPropagation();
            this.selectedTicket();
          }}
        >
          <Header
            itemData={itemData}
          />
          <Subject
            itemData={itemData}
          />
          <Msg
            itemData={itemData}
          />
        </div>
      </div>);
  }
}

Item.propTypes = {
  itemData: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    subject: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    sendTime: React.PropTypes.string.isRequired,
    ifRead: React.PropTypes.bool.isRequired,
  }).isRequired,
  selected: React.PropTypes.number.isRequired,
  onSetReadOrUnRead: React.PropTypes.func.isRequired,
  onSelectedTicket: React.PropTypes.func.isRequired,
};

export default Item;
