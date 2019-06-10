import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as _ from 'lodash';
import Calendar from 'rc-calendar';
import Picker from 'rc-calendar/lib/Picker';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import enUS from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';
import 'moment/src/locale/en-gb';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import style from './datePicker.css';
import Icon from '../Icon/Icon';
import { icons } from '../constants/enums';

const getDisableLargeArrary = (base, max) => {
  let current = base;
  const arr = [];
  while (current < max) {
    current += 1;
    arr.push(current);
  }
  return arr;
};


const disabledTime = (date, startDate = undefined, endDate = undefined) => {
  if (!date) {
    // allow empty select
    return {};
  }
  const disabledHour = [];
  const disabledMinutes = [];
  const disabledSeconds = [];

  if (startDate !== undefined) {
    if (date.year() === startDate.getFullYear()
      && date.month() === startDate.getMonth()
      && date.date() === startDate.getDate()) {
      const hour = startDate.getHours();
      _.merge(disabledHour, (getDisableLargeArrary(0, hour)));
      if (date.hours() === startDate.getHours()) {
        const minutes = startDate.getMinutes();
        _.merge(disabledMinutes, (getDisableLargeArrary(0, minutes)));
        if (date.minute() === startDate.getMinutes()) {
          const seconds = startDate.getSeconds();
          _.merge(disabledSeconds, (getDisableLargeArrary(0, seconds)));
        }
      }
    }
  }

  if (endDate !== undefined) {
    if (date.year() === endDate.getFullYear()
      && date.month() === endDate.getMonth()
      && date.date() === endDate.getDate()) {
      const hour = endDate.getHours();
      _.merge(disabledHour, (getDisableLargeArrary(hour, 24)));
      if (date.hours() === endDate.getHours()) {
        const minutes = endDate.getMinutes();
        _.merge(disabledMinutes, (getDisableLargeArrary(minutes, 60)));
        if (date.minutes() === endDate.getMinutes()) {
          const seconds = endDate.getSeconds();
          _.merge(disabledSeconds, (getDisableLargeArrary(seconds, 60)));
        }
      }
    }
  }

  return {
    disabledHours() { return disabledHour; },
    disabledMinutes() { return disabledMinutes; },
    disabledSeconds() { return disabledSeconds; },
  };
};


const disabledDate = (current, startDate = undefined, endDate = undefined) => {
  if (!current) {
    // allow empty select
    return false;
  }
  const attemp = new Date(current.year(),
    current.month() + 1,
    current.date());
  return ((startDate !== undefined && attemp.getTime() < startDate.getTime())
    || ((endDate !== undefined && attemp.getTime() > endDate.getTime())));
};


class DatePicker extends Component {


  constructor(props) {
    super(props);
    if (props.minDateTime !== undefined) {
      console.log('7899789798798789789798798798789798798', props.minDateTime);
      this.minDateTime = new Date(props.minDateTime);
      this.minDate = new Date(props.minDateTime.getFullYear(),
        props.minDateTime.getMonth() + 1,
        props.minDateTime.getDate());
    }
    if (props.minDateTime !== undefined) {
      this.maxDateTime = new Date(props.maxDateTime);
      this.maxDate = new Date(props.maxDateTime.getFullYear(),
        props.maxDateTime.getMonth() + 1,
        props.maxDateTime.getDate());
    }
    this.onChange = this.onChange.bind(this);
    this.getFormat = this.getFormat.bind(this);
    this.funcDisableDate = this.funcDisableDate.bind(this);
    this.funcDisabledTime = this.funcDisabledTime.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }
  onChange(value) {
    this.props.input.onChange(value);
  }

  getFormat() {
    return this.props.dateFormatter;
  }

  funcDisableDate(date) {
    return disabledDate(date, this.minDate, this.maxDate);
  }

  funcDisabledTime(date) {
    return disabledTime(date, this.minDateTime, this.maxDateTime);
  }

  render() {
    const timePickerElement = <TimePickerPanel />;

    return (
      <div className={style.dateDiv}>
        <Picker
          animation="slide-up"
          disabled={false}
          ref={(picker) => this.datePicker = picker}
          calendar={
            (<Calendar
              locale={enUS}
              style={{ zIndex: 1000 }}
              dateInputPlaceholder="please input"
              formatter={'yyyy-MM-dd HH:mm:ss'}
              timePicker={this.props.isShowTime ? timePickerElement : null}
              defaultValue={this.props.input.value || moment()}
              showDateInput={false}
              disabledDate={this.funcDisableDate}
              disabledTime={this.funcDisabledTime}
            />)
          }
          value={this.props.input.value || null}
          onChange={this.onChange}
        >
          {
            ({ value }) =>
              (
                <span tabIndex="0">
                  <input
                    type="text"
                    placeholder="please select"
                    disabled={false}
                    readOnly
                    tabIndex="-1"
                    className={classnames(
                      style.input,
                      this.props.className,
                      this.props.meta.touched && this.props.meta.invalid && style.error
                    )}
                    value={(value && value.format(this.getFormat(null))) || ''}
                  />
                </span>
              )
          }
        </Picker>
        <Icon
          type={icons.date}
          size={16}
          className={style.dateicon}
          onClick={() => { this.datePicker.open() }} /></div>);
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  isShowTime: PropTypes.bool,
  minDateTime: PropTypes.instanceOf(moment),
  maxDateTime: PropTypes.instanceOf(moment),
  dateFormatter: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(moment),
    ]),
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    invalid: PropTypes.bool,
  }),
};
DatePicker.defaultProps = {
  isShowTime: false,
};
export default DatePicker;
