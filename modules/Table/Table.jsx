import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import Icon from '../Icon/Icon';
import { icons } from '../constants/enums';
import PageSizer from './PageSizer';
import { findColumn } from './utils';
import style from './style.css';

const pageSizeArr = [10, 30, 50, 100, 500];

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: props.sortAsc ? 'asc' : 'desc',
      sortColumn: props.sortCol,
      pageSize: pageSizeArr[1],
      pageIndex: 1,
    };
    this.pageChange = this.pageChange.bind(this);
    this.sort = this.sort.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        pageIndex: 1,
      });
    }
  }

  pageChange(currentPage, pageSz) {
    this.setState({
      pageIndex: currentPage,
      pageSize: pageSz,
    });
  }

  sort(sortField) {
    let order = this.state.sortOrder;
    if (sortField === this.state.sortColumn) {
      order = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
    }
    this.setState({
      sortColumn: sortField,
      sortOrder: order,
    });
  }

  render() {
    const props = this.props;
    const columns = findColumn(props.children);
    const getStyle = column => ({
      width: column.props.width,
      textAlign: column.props.textAlign || column.props.align,
    });

    // for string, ignore case
    const newData = _.orderBy(props.data, [(data) => {
      if (typeof data[this.state.sortColumn] === 'string') {
        return data[this.state.sortColumn].toLowerCase();
      }
      return data[this.state.sortColumn];
    }], [this.state.sortOrder]);
    const ths = columns.map((column, index) => {
      const { name, th, ifCanSort, dataKey } = column.props;
      const content = React.isValidElement(th) ? React.cloneElement(th) : name;
      return (
        <th
          key={`th-${index}`}
          style={getStyle(column)}
        >
          <span
            role={'presentation'}
            className={ifCanSort ? style.sortable : null}
            onClick={ifCanSort ? () => { this.sort(dataKey); } : null}
          >
            {content}
            { ifCanSort && this.state.sortColumn === dataKey &&
              (this.state.sortOrder === 'asc' ?
                <Icon type={icons.arrowUp} /> : <Icon type={icons.arrowDown} />
              )
            }
          </span>
        </th>
      );
    });
    const startIndex = (this.state.pageIndex - 1) * this.state.pageSize;// this.state.startIndex;
    const endIndex = (this.state.pageIndex * this.state.pageSize) - 1 > props.data.length ?
      props.data.length : (this.state.pageIndex * this.state.pageSize) - 1;
    const tmp = props.ifPaging ?
      newData.filter((item, index) => index >= startIndex && index <= endIndex) : newData;
    const tds = tmp.map((datum, index) => {
      const row = columns.map((column, i) => {
        const { dataKey, td, propsMap } = column.props;
        const value = dataKey ? datum[dataKey] : undefined;
        const props = {
          rowData: datum,
          tdValue: value,
          dataKey,
          rowIndex: index,
          colIndex: i,
        };
        let content;
        if (React.isValidElement(td)) {
          content = React.cloneElement(td, propsMap ? propsMap(props) : props);
        } else if (typeof td === 'function') {
          const tmp = td(props);
          content = React.isValidElement(tmp) ? React.cloneElement(tmp) : tmp;
        } else content = value;
        return <td key={`td-${index}-${i}`} style={getStyle(column)}>{content}</td>;
      });
      let className = index % 2 === 0 ? style.evenRow : style.oddRow;
      if (props.selected === index) className = style.selected;
      const onClick = () => {
        // if (onSelectChange) { onSelectChange(index); }
      };
      return (
        <tr key={`tr-${index}`} className={className} onClick={onClick}>
          {row}
        </tr>
      );
    });
    let tableWidth = props.width;
    if (tableWidth === undefined) {
      const widths = columns.map(column => column.props.width + 1 + 15);
      tableWidth = widths.reduce((sum, w) => {
        if (sum === undefined) return sum;
        if (isNaN(w)) return undefined;
        return sum + w;
      }, 0);
    }
    return (
      <div>
        <div className={style.container} style={{ width: tableWidth || '100%' }}>
          <table>
            <thead>
              <tr>
                {ths}
              </tr>
            </thead>
            <tbody>
              {tds}
            </tbody>
          </table>
        </div>
        {props.ifPaging
          ? <PageSizer
            pageIndex={this.state.pageIndex}
            pageSize={this.state.pageSize}
            totalItems={props.data.length}
            onPagerChange={this.pageChange}
            sizes={pageSizeArr}
          /> : ''}
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  children: PropTypes.array.isRequired,
  selected: PropTypes.number,
  onSelectChange: PropTypes.func,
  ifPaging: PropTypes.bool,
  sortCol: PropTypes.string,
  sortAsc: PropTypes.bool,
};

export default Table;
