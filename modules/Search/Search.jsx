import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './search.css';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: props.searchValue,
      ifShowSeachIcon: true,
    };
    this.iconActionHandle = this.iconActionHandle.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
    this.pressHandle = this.pressHandle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id === -1 || nextProps.id !== this.props.id) {
      this.setState({
        searchValue: nextProps.searchValue,
        ifShowSeachIcon: true,
      });
    }
  }

  iconActionHandle(e) {
    e.stopPropagation();
    if (this.props.disabled ||
        this.props.searching) return;
    if (!this.state.ifShowSeachIcon) {
      this.props.onReset(this.props.id);
      this.setState({
        searchValue: '',
        ifShowSeachIcon: true,
      });
      return;
    }
    this.props.onSearch(this.props.id, this.state.searchValue);
    if (this.state.searchValue !== '') {
      this.setState({
        ifShowSeachIcon: false,
      });
    }
  }

  pressHandle(e) {
    e.stopPropagation();
    if (e.keyCode === 13) {
      this.props.onSearch(this.props.id, this.state.searchValue);
      if (this.state.searchValue !== '') {
        this.setState({
          ifShowSeachIcon: false,
        });
      }
    }
  }

  changeHandle(e) {
    if (this.props.disabled ||
      this.props.searching) return;
    this.setState({
      searchValue: e.target.value,
    });
    this.props.onChange(e.target.value);
  }

  render() {
    const {
      wraperClass,
      iconClass,
      placeHolder,
      disabled,
      searching,
    } = this.props;
    return (
      <div
        className={classnames(style.searchwraper,
          wraperClass,
          searching && style.searching)}
      >
        <Input
          type="text"
          className={style.searchInput}
          placeholder={placeHolder}
          disabled={disabled}
          input={{
            value: this.state.searchValue,
            onChange: this.changeHandle,
          }}
          onKeyDown={this.pressHandle}
        />
        <Icon
          className={classnames(style.searchicon, iconClass)}
          type={(this.state.ifShowSeachIcon ? Icon.types.search : Icon.types.delete)}
          onClick={this.iconActionHandle}
          size={16}
          color={'#ddd'}
        />
      </div>
    );
  }
}

Search.defaultProps = {
  id: -1,
  searchValue: '',
  placeHolder: 'Input key word...',
  wraperClass: '',
  iconClass: '',
  disabled: false,
  searching: false,
  onChange: _ => _,
  onSearch: _ => _,
  onReset: _ => _,
};

Search.propTypes = {
  id: PropTypes.number,
  wraperClass: PropTypes.string,
  iconClass: PropTypes.string,
  searchValue: PropTypes.string,
  placeHolder: PropTypes.string,
  disabled: PropTypes.bool,
  searching: PropTypes.bool,
  onChange: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Search;
