import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Icon from '../Icon/Icon';
import { icons } from '../constants/enums';
import style from './style.css';

const pageSizeArr = [10, 30, 50, 100, 500];
class PageSizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: props.pageIndex,
      pageSize: props.sizes[1],
      totalPages: Math.ceil(props.totalItems / props.pageSize),
    };
    this.changePageIndex = this.changePageIndex.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getCurPageItems = this.getCurPageItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pageIndex: nextProps.pageIndex,
      totalPages: Math.ceil(nextProps.totalItems / nextProps.pageSize),
    });
  }

  onChange() {
    this.props.onPagerChange(parseInt(this.state.pageIndex, 10), this.state.pageSize);
  }

  getCurPageItems() {
    const startIndex = (this.props.pageIndex - 1) * this.props.pageSize;
    const endIndex = (this.props.pageIndex * this.props.pageSize) - 1 > this.props.totalItems - 1
      ? this.props.totalItems - 1 : (this.props.pageIndex * this.props.pageSize) - 1;
    return (endIndex + 1) - startIndex;
  }

  gotoPage() {
    const tmp = parseInt(this.state.pageIndex, 10);
    if (_.isInteger(tmp) && tmp > 0 && tmp <= this.state.totalPages) {
      this.onChange();
    } else {
      this.setState({
        pageIndex: this.props.pageIndex,
      });
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.gotoPage();
    }
  }

  changePageIndex(e) {
    this.setState({
      pageIndex: e.target.value,
    });
  }

  changePageSize(value) {
    this.setState({
      pageIndex: 1,
      pageSize: value,
      totalPages: Math.ceil(this.props.totalItems / value),
    }, this.onChange);
  }

  prevPage() {
    if (this.state.pageIndex > 1) {
      this.setState({
        pageIndex: this.state.pageIndex - 1,
      }, this.onChange);
    }
  }

  nextPage() {
    if (this.state.pageIndex < this.state.totalPages) {
      this.setState({
        pageIndex: this.state.pageIndex + 1,
      }, this.onChange);
    }
  }

  firstPage() {
    if (this.state.pageIndex !== 1) {
      this.setState({
        pageIndex: 1,
      }, this.onChange);
    }
  }

  lastPage() {
    if (this.state.pageIndex !== this.state.totalPages) {
      this.setState({
        pageIndex: this.state.totalPages,
      }, this.onChange);
    }
  }

  render() {
    const props = this.props;
    const pageSizeSelector = () => (<Select
      options={props.sizes.map(item => ({ value: item, text: item.toString() }))}
      input={{
        value: this.state.pageSize,
        onChange: this.changePageSize,
      }}
      width={80}
      className={style.sizeSelector}
    />);
    return (
      <div className={style.paging}>
        <Icon type={icons.PagingFirst} className={style.icons} onClick={this.firstPage} />
        <Icon type={icons.PagingPrev} className={style.icons} onClick={this.prevPage} />
        <Input
          meta={{}}
          input={{
            value: this.state.pageIndex,
            onChange: this.changePageIndex,
            onKeyPress: this.handleKeyPress,
          }}
          onBlur={this.gotoPage}
        />&nbsp;
        {` / ${this.state.totalPages}`}&nbsp;
        <Icon type={icons.PagingNext} className={style.icons} onClick={this.nextPage} />
        <Icon type={icons.PagingLast} className={style.icons} onClick={this.lastPage} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {'Page Size: '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {pageSizeSelector()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {`Current Page Items: ${this.getCurPageItems()}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {`Total Items: ${props.totalItems}`}
      </div>
    );
  }
}

PageSizer.propTypes = {
  pageSize: PropTypes.number.isRequired,
  pageIndex: PropTypes.number,
  totalItems: PropTypes.number.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number),
  onPagerChange: PropTypes.func.isRequired,
};

PageSizer.defaultProps = {
  pageIndex: 0,
  sizes: pageSizeArr,
};

export default PageSizer;
