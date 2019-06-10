import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import Tooltip from '../../Tooltip/Tooltip';
import style from './column.css';

class OrderPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onSort = this.onSort.bind(this);
    Tooltip.rebuild();
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.rowData, nextProps.rowData);
  }

  componentDidUpdate() {
    Tooltip.rebuild();
  }

  onSort(row, type) {
    const { onSort, sortData } = this.props;
    let sortAry = [];
    if (type === 'up') {
      if (row.rowData.index === 0) return;
      sortAry = sortData.map((item, index) => {
        if (index === row.rowData.index - 1) {
          return { id: item.id, index: item.index + 1 };
        }
        if (index === row.rowData.index) {
          return { id: item.id, index: item.index - 1 };
        }

        return { id: item.id, index: item.index };
      });
    } else {
      if (row.rowData.index === sortData.length - 1) return;
      sortAry = sortData.map((item, index) => {
        if (index === row.rowData.index) {
          return { id: item.id, index: item.index + 1 };
        }
        if (index === row.rowData.index + 1) {
          return { id: item.id, index: item.index - 1 };
        }

        return { id: item.id, index: item.index };
      });
    }

    onSort(sortAry);
  }

  render() {
    const { rowData, sortData, tooltip } = this.props;
    return (
      <span>
        <Icon
          type={Icon.types.arrowDown}
          size={14}
          className={classNames(style.opIcons,
            (rowData.rowIndex !== (sortData.length - 1)) ? style.show : style.hidden)}
          data-tip={'Move Down'}
          data-for={tooltip}
          onClick={() => {
            this.onSort(rowData, 'down');
          }}
        />
        <Icon
          type={Icon.types.arrowUp}
          className={classNames(style.opIcons,
            (rowData.rowIndex !== 0) ? style.show : style.hidden)}
          size={14}
          data-tip={'Move Up'}
          data-for={tooltip}
          onClick={() => {
            this.onSort(rowData, 'up');
          }}
        />
      </span>
    );
  }
}

OrderPanel.propTypes = {
  rowData: PropTypes.shape({}),
  sortData: PropTypes.arrayOf(PropTypes.shape({})),
  onSort: PropTypes.func,
  tooltip: PropTypes.string,
};

export default OrderPanel;
