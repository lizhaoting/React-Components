import moment from 'moment';
import * as _ from 'lodash';

export function format(date) { // temp
  const seperator1 = '-';
  const seperator2 = ':';
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`;
  }
  const currentdate = `${date.getFullYear() + seperator1 + month + seperator1 + strDate
  } ${date.getHours()}${seperator2}${date.getMinutes()}`;
  return currentdate;
}

export function newDate(strDate) {
  const parts = strDate.split(/[- :]/);
  if (parts.length === 5) {
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4]);
  } else if (parts.length === 3) {
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return '';
}

export function getChoiceDate(strDate) {
  if (_.isString(strDate) && /^(\d{2,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})\s(\d{1,2}):(\d{1,2})|(\d{2,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/.test(strDate)) {
    return moment(newDate(strDate));
  }
  return moment(new Date(_.now()));
}
