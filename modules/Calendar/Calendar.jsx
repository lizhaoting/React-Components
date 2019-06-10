import React, {Component, PropTypes } from 'react';
import Style from './calendar.css';
import classnames from 'classnames';
import H from '../utils/dateHelper.js';


class Calendar extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
        this._initMonthDayNumber = this._initMonthDayNumber.bind(this);
        this.selectDate = this.selectDate.bind(this);
        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
    }

    /**
   * 组件初始化状态
   */
    getInitialState () {
        return {
            currentYear: H.getFullYear(),
            currentMonth: H.getMonth(),
            currentDay: H.getDate(),
            selectYear: H.getFullYear(),
            selectMonth: H.getMonth(),
            selectDay: H.getDate(),
            historyYear: undefined,
            historyMonth: undefined,
            historyDay: undefined,
        };
    }

    componentWillReceiveProps (nextProps) {
        // todo
    }

    /**
   * 组件渲染完后执行
   */
    componentDidMount () {
        let { year, month, day} = this.props;

        // 初始化状态
        if (year && month && day) {
            let dateNumArray = this._initMonthDayNumber(year);
            let firstDay = H.weekOfMonth(new Date(year, month - 1));

            this.setState({
                selectYear: year,
                selectMonth: month - 1,
                selectDay: day,
                dateNumArray: dateNumArray,
                firstDay: firstDay,
            });
        }
    }

    /**
   * 给月份数组附上每月天数
   * @param year 年份
   * @private
   */
    _initMonthDayNumber (year) {
        let dateArray = [];
        for (var i = 0; i < 12; i++) {
            switch (i + 1) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    dateArray.push(31);
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    dateArray.push(30);
                    break;
                case 2:
                    if (H.isLeapYear(year)) {
                        dateArray.push(29);
                    } else {
                        dateArray.push(28);
                    }
                    break;
                default:
                    break;
            }
        }
        return dateArray;
    }

    /**
   * 组件将要挂载
   * 设置月份数组以及计算出每月的第一天星期几
   */
    componentWillMount () {
        this.setState({
            currentYear: H.getFullYear(),
            currentMonth: H.getMonth(),
            currentDay: H.getDate(),
            selectYear: H.getFullYear(),
            selectMonth: H.getMonth(),
            selectDay: H.getDate(),
            historyYear: undefined,
            historyMonth: undefined,
            historyDay: undefined,
        });
        const dateNumArray = this._initMonthDayNumber(this.state.currentYear);
        const firstDay = H.weekOfMonth();
        this.setState({
            dateNumArray: dateNumArray,
            firstDay: firstDay});
    }

    /**
   * 日期选择
   * @param sDay
   */
    selectDate (sDay) {
        let { selectYear, selectMonth} = this.state;
        this.setState({
            historyYear: selectYear,
            historyMonth: selectMonth,
            historyDay: sDay,
            selectDay: sDay,
        }, () => {
            this.props.onDateChanged(selectYear, selectMonth, sDay);
        });
    }

    /**
   * 前一个月
   */
    previousMonth () {
        let { currentYear, currentMonth, currentDay,
            selectYear, selectMonth, selectDay, dateNumArray, firstDay} = this.state;

        if (selectMonth === 0) {
            selectYear = +selectYear - 1;
            selectMonth = 11;
            dateNumArray = this._initMonthDayNumber(selectYear);
        } else {
            selectMonth = +selectMonth - 1;
        }

        firstDay = H.weekOfMonth(new Date(selectYear, selectMonth));

        if (currentYear === selectYear &&
          currentMonth === selectMonth) {
            selectDay = currentDay;
        } else {
            selectDay = undefined;
        }

        this.setState({
            selectYear: selectYear,
            selectMonth: selectMonth,
            selectDay: selectDay,
            dateNumArray: dateNumArray,
            firstDay: firstDay,
        }, () => {
            // this.props.onDateChanged(selectYear, selectMonth + 1, 1);
        });
    }

    /**
   * 之后一个月
   */
    nextMonth () {
        let { currentYear, currentMonth, currentDay,
            selectYear, selectMonth, selectDay, dateNumArray, firstDay} = this.state;

        if (selectMonth === 11) {
            selectYear = +selectYear + 1;
            selectMonth = 0;
            dateNumArray = this._initMonthDayNumber(selectYear);
        } else {
            selectMonth = +selectMonth + 1;
        }

        firstDay = H.weekOfMonth(new Date(selectYear, selectMonth));

        if (currentYear === selectYear &&
          currentMonth === selectMonth) {
            selectDay = currentDay;
        } else {
            selectDay = undefined;
        }

        this.setState({
            selectYear: selectYear,
            selectMonth: selectMonth,
            selectDay: selectDay,
            dateNumArray: dateNumArray,
            firstDay: firstDay,
        }, () => {
            // this.props.onDateChanged(selectYear, selectMonth + 1, 1);
        });
    }


    /**
     * 渲染页面
     * @returns {XML}
     */
    render () {
        const rowNumber = 6;
        const colNumber = 7;
        const { tags } = this.props;
        const { currentYear, currentMonth, currentDay,
            selectYear, selectMonth, selectDay,
            historyYear, historyMonth, historyDay,
            dateNumArray, firstDay} = this.state;

        const monthDay = dateNumArray[selectMonth];
        const nDay = rowNumber * colNumber - firstDay - monthDay;
        let previousMonthDays;
        let previousDays = [];
        let currentDays = [];
        let nextDays = [];
        let totalDays = [];
        let previousMonth;

        if (selectMonth === 0) {
            previousMonth = 11;
        } else {
            previousMonth = selectMonth - 1;
        }

        previousMonthDays = dateNumArray[previousMonth];
        for (let i = 0; i < firstDay; i++) {
            let previousLink = <li className={Style.itemGray} key={'previous' + i}>
                <a href="javascript:;">{previousMonthDays - (firstDay - i) + 1}</a>
            </li>;
            previousDays.push(previousLink);
        }

        let currentClassName = '';
        let isTag = false;
        let currentText = '';
        for (let i = 0; i < monthDay; i++) {

            // 今天样式
            if (currentYear === selectYear &&
               currentMonth === selectMonth &&
               currentDay === i + 1) {
                currentClassName = 'itemCurrent';
                currentText = 'TD';
            } else {
                currentText = i + 1;

                // 判断选择样式与历史样式是否相等，相等激活
                if (selectYear === historyYear && selectMonth === historyMonth && historyDay === i + 1) {
                    currentClassName = 'itemActive';
                } else {
                    currentClassName = '';
                }
            }
            isTag = false;
            // 添加tag样式
            if (tags && tags.length > 0) {
                for (let j = 0; j < tags.length; j++) {
                    if (i + 1 === tags[j]) {
                        isTag = true;
                        break;
                    }
                }
            }

            let currentLink = <li
                className={classnames(Style[currentClassName], isTag ? Style.itemTag : '')}
                key={'current' + i}>
                <a href="javascript:;" onClick={this.selectDate.bind(this, i + 1)}>
                    {currentText}
                </a>
            </li>;
            currentDays.push(currentLink);
        }

        for (let i = 0; i < nDay; i++) {
            let nextLink = <li className={Style.itemGray} key={'next' + i}>
                <a href="javascript:;">{i + 1}</a>
            </li>;
            nextDays.push(nextLink);
        }

        totalDays = previousDays.concat(currentDays, nextDays);

        let ulList = [];
        if (totalDays.length > 0) {
            for (let i = 0; i < rowNumber; i++) {
                let liList = [];
                let startIndex = i * colNumber;
                let endIndex = (i + 1) * colNumber;
                for (let j = startIndex; j < endIndex; j++) {
                    liList.push(totalDays[j]);
                }
                ulList.push(liList);
            }
        }

        return (
            <div
                className={Style.calendar}
            >
                <div className={Style.calendarHeader}>
                    <i className={Style.iconLeft} onClick={this.previousMonth}></i>
                    <span>{selectYear} 年 {selectMonth + 1} 月</span>
                    <i className={Style.iconRight} onClick={this.nextMonth}></i>
                </div>
                <div className={Style.calendarBody}>
                    <ul className={Style.cBodyHead}>
                        <li>Su</li>
                        <li>Mo</li>
                        <li>Tu</li>
                        <li>We</li>
                        <li>Th</li>
                        <li>Fr</li>
                        <li>Sa</li>
                    </ul>
                    <div className={Style.cBodyContent}>
                        {
                            ulList.map((u, index) =>
                                <ul key={'ul' + index} className={Style.contentRow}>{u}</ul>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}


Calendar['default'] = {
    rowNumber: 6,
    colNumber: 7,
};

Calendar.propTypes = {
};

export default Calendar;
