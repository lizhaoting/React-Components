import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import Icon from '../../Icon/Icon';
import Tooltip from '../../Tooltip/Tooltip';
import style from './column.css';

class OperationPanel extends React.Component {
  constructor(props) {
    super(props);
    Tooltip.rebuild();
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.rowData, nextProps.rowData);
  }

  componentDidUpdate() {
    Tooltip.rebuild();
  }

  render() {
    const {
      rowData,
      onEdited,
      onDelete,
      tooltip,
    } = this.props;
    return (
      <div className={style.alignCenter}>
        <Icon
          type={Icon.types.edit}
          size={12}
          className={style.opIcons}
          data-tip={'Edit'}
          data-for={tooltip}
          onClick={() => {
            onEdited(rowData.tdValue);
          }}
        />
        <Icon
          type={Icon.types.delete}
          size={12}
          className={style.opIcons}
          data-tip={'Delete'}
          data-for={tooltip}
          onClick={() => {
            onDelete(rowData.tdValue);
          }}
        />
      </div>
    );
  }
}

OperationPanel.propTypes = {
  rowData: PropTypes.shape({}),
  onEdited: PropTypes.func,
  onDelete: PropTypes.func,
  tooltip: PropTypes.string,
};

export default OperationPanel;
