/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from 'lodash';
import Icon from '../Icon/Icon';
import { findColumn } from '../Table/utils';
import style from './scrolltable.css';

class ScrollTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: props.sortAsc ? 'asc' : 'desc',
      sortColumn: props.sortCol,
      pageIndex: 1,
    };
    this.sort = this.sort.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        pageIndex: 1,
      });
    }
  }

  /* eslint-disable no-nested-ternary */
  sort(sortField) {
    const order = sortField !== this.state.sortColumn ?
      this.state.sortOrder : (this.state.sortOrder === 'asc' ? 'desc' : 'asc');
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
    const tds = newData.map((datum, index) => {
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
    const ths = columns.map((column, index) => {
      const { name, th, ifCanSort, dataKey } = column.props;
      const content = React.isValidElement(th) ? React.cloneElement(th) : name;
      return (
        <th
          key={`th-${index}`}
          style={getStyle(column)}
          className={tds.length < 11 ? style.srcollth : style.scrollthnomarl}
        >
          <span
            role={'presentation'}
            className={ifCanSort ? style.sortable : null}
            onClick={ifCanSort ? () => { this.sort(dataKey); } : null}
          >
            {content}
            {ifCanSort && this.state.sortColumn === dataKey &&
              (this.state.sortOrder === 'asc' ?
                <Icon type={Icon.types.arrowUp} /> : <Icon type={Icon.types.arrowDown} />
              )
            }
          </span>
        </th>
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
      <div className={style.scrollTableContainer}>
        <div className={classNames(style.container, style.scrollHeader)} style={{ width: tableWidth || '100%' }}>
          <table>
            <thead>
              <tr>
                {ths}
              </tr>
            </thead>
          </table>
        </div>
        <div className={classNames(style.container, style.scroll)} style={{ width: tableWidth || '100%' }}>
          <table>
            <tbody>
              {tds}
            </tbody>
          </table>
        </div>
      </div >
    );
  }
}

ScrollTable.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  children: PropTypes.array.isRequired,
  selected: PropTypes.number,
  sortCol: PropTypes.string,
  sortAsc: PropTypes.bool,
};

export default ScrollTable;
