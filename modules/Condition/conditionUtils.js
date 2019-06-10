import moment from 'moment';
import * as _ from 'lodash';

const conditionManthType = [{
  id: 1,
  name: 'Is',
}, {
  id: 2,
  name: 'Is Not',
}, {
  id: 3,
  name: 'Is More Than',
}, {
  id: 4,
  name: 'Is Less Than',
}, {
  id: 5,
  name: 'Contains',
}, {
  id: 6,
  name: 'Not Contains',
}, {
  id: 7,
  name: 'Before',
}, {
  id: 8,
  name: 'After',
}, {
  id: 9,
  name: 'Between',
}];

export const dataTypeMap = (strType) => {
  switch (_.toLower(strType)) {
    case 1:
    case 'text':
    case 'textarea':
    case 'email':
    case 'url':
    case 'link':
      return 1;
    case 2:
    case 'integer':
    case 'float':
      return 2;
    case 3:
    case 'date':
      return 3;
    case 4:
    case 'operator':
    case 'radio':
    case 'checkbox':
    case 'dropdownlist':
    case 'checkboxlist':
      return 4;
    default:
      return 5;
  }
};

export function conditionOptionOperatorMap(conditionSource, id) {
  /* eslint-disable no-param-reassign */
  if (id === 0) id = 1;
  const con = conditionSource.filter(item => item.id === id);
  let type = 5;
  if (con.length > 0) type = dataTypeMap(con[0].dataType);

  switch (type) {
    case 1: // string
      /* eslint-disable max-len */
      return [conditionManthType[4], conditionManthType[5]];
    case 2: // number
      return [conditionManthType[0], conditionManthType[1], conditionManthType[2], conditionManthType[3]];
    case 3: // datetime
      return [conditionManthType[0], conditionManthType[1], conditionManthType[6], conditionManthType[7]];
    case 4: // option
      return [conditionManthType[0], conditionManthType[1]];
    default:
      return [];
  }
}

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

/* eslint-disable no-else-return */
export function getChoiceDate(strDate) {
  if (_.isString(strDate) && /^(\d{2,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})\s(\d{1,2}):(\d{1,2})|(\d{2,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/.test(strDate)) {
    return moment(newDate(strDate));
  }
  return moment(new Date(_.now()));

  // #region comment for Date Between
  // let dateAry = [];
  // if (_.isString(strDate) && strDate.indexOf('|') >= 0) {
  //   dateAry = strDate.split('|');
  // }
  // if (isBegin) {
  //   if (strDate.indexOf('|') > 0 && dateAry[0] !== '' && _.isDate(newDate(dateAry[0]))) {
  //     return moment(newDate(dateAry[0]));
  //   }
  //   return moment(new Date(_.now()).setDate(new Date(_.now()).getDate() - 7));
  // } else {
  //   /* eslint-disable no-lonely-if */
  //   if (_.isInteger(strDate)) {
  //     return moment(new Date(_.now()));
  //   } else {
  //     if (strDate.indexOf('|') >= 0 && dateAry[1] !== '' && _.isDate(newDate(dateAry[1]))) {
  //       return moment(newDate(dateAry[1]));
  //     } else {
  //       return moment(newDate(strDate));
  //     }
  //   }
  // }
  // #endregion
}

export function getDataType(conditionSource, fieldId) {
  const condition = _.find(conditionSource, con => con.id === fieldId);
  return condition ? dataTypeMap(condition.dataType) : -1;
}

export function getDefaultOption(conditionSource, fieldId) {
  const condition = _.find(conditionSource, con => con.id === fieldId);
  if (condition.options.length > 0) {
    const blank = _.find(condition.options, a => a.value === 'Blank');
    return blank ? blank.value : condition.options[0].value;
  }
  return 0;
}

export const customDateFormat = 'YYYY-MM-DD';
