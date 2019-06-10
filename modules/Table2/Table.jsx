import React, {Component, PropTypes } from 'react';
import classnames from 'classnames';
import Style from './Table.css';
import Paging from '../Paging/Paging.jsx';
import { compare } from '../utils/helper.js';

class Table extends Component {
    constructor (props) {
        super(props);
        this.state = {
            rows: props.rows,
            pageIndex: 0,
            countPerPage: 30,
            sortCol: 0,
            sortUp: false,
        };
        this.sort = this.sort.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({rows: nextProps.rows,
            pageIndex: nextProps.pageIndex,
            countPerPage: nextProps.countPerPage});
    }

    sort (col) {
        let compareValue;
        if (typeof col.sort === 'function') {
            compareValue = col.sort;
        } else if (typeof col.sort === 'string') {
            compareValue = (r) => r[col.sort];
        } else {
            compareValue = (r) => r[col.name];
        }
        this.state.rows.sort((a, b) => {
            let res = compare(compareValue(a), compareValue(b));
            if (this.state.sortUp) {res = -res;}
            return res;
        });
        this.setState({sortUp: !this.state.sortUp, sortCol: col.name, pageIndex: 0 });
    }

    render () {
        const {cols, collectable} = this.props;
        const rows = this.state.rows.slice(this.state.pageIndex * this.state.countPerPage,
            (this.state.pageIndex + 1) * this.state.countPerPage);

        return (
            <div>
                <div className={Style.tablecontainer}>
                    <div
                        id="tb-chatvolume"
                        className={classnames(Style.tablecontainer)}
                        style={{display: 'block'}}
                    >
                        {!rows || rows.length <= 0 && <div className={Style.nodata}>No records were found.</div>}
                        {rows && rows.length > 0 && cols &&
                    <table id="table" className={Style.table} cellSpacing="0" cellPadding="0">
                        <thead name="thead" className={Style.thead}>
                            <tr>
                                {cols.map((col, index) => <th name="th"
                                    key={`th_${index}`}
                                    className={Style.th}>
                                    <span
                                        onClick={() => {this.sort(col);}}
                                        name="td"
                                    >
                                        {col.name}
                                        {col.name === this.state.sortCol &&
                                        <img
                                            src={`/../../Resources/Images/${this.state.sortUp
                                                ? 'sort_up.png' : 'sort_down.png'}`}
                                        />}
                                    </span>
                                </th>)}
                            </tr>
                        </thead>

                        <tbody name="tbody" className={Style.tbody}>
                            {collectable && <tr name="tr colloct" className={Style.doubleLine}>
                                {collectable && cols.map((col, index) =>
                                    <td
                                        key={`collect_${index}`}
                                        name="td" className={Style.td}>
                                        {col.collect(rows)}
                                    </td>)}
                            </tr>}

                            {rows.map((row, index) => <tr
                                key={`tr_${index}`}
                                name="tr"
                                className={index % 2 === 0
                                    ? Style.singleLine : Style.doubleLine}>
                                {cols.map((col, i) =>
                                    <td
                                        key={`td_${index}_${i}`}
                                        name="td" className={Style.td}>
                                        {col.field(row)}
                                    </td>)}
                            </tr>)}
                        </tbody>
                    </table>
                        }

                    </div>
                </div>

                {this.state.rows.length > 30 && <Paging
                    totalData={this.state.rows.length}
                    correctPage={this.state.pageIndex}
                    CountPerPageOption={[30, 50, 100]}
                    CountPerPage={this.state.countPerPage}
                    correctPageChange={(pageIndex, countPerPage) => {
                        this.setState({pageIndex, countPerPage});
                    }
                    }
                />}
            </div>
        );
    }
}
Table.propTypes = {
    cols: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.numberY,
        name: PropTypes.string,
        field: PropTypes.func,
        sort: PropTypes.func,
        collect: PropTypes.func,
        style: PropTypes.shape({}),
    })),
    rows: PropTypes.arrayOf(PropTypes.shape({
    })),
    sortable: PropTypes.bool,
    collectable: PropTypes.bool,
};
export default Table;
