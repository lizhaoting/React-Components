// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1
                ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};

// 一些私有变量

// 一些公有变量、函数

/**
 *
 * 判断这一年是闰年还是平年
 * @param year {String/Number} 年份
 * @returns {boolean}
 */

export const isLeapYear = function (year) {
    if (!typeof +year === 'number') {
        throw new Error('Year format is incorrect');
    }

    if (+year < 1790) {
        throw new Error('No less than 1790');
    }

    // 计算闰年方法
    // 1.能被4整除而不能被100整除
    // 2.能被400整除

    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};

/**
 * 返回月份中的第一天是星期几
 * @returns {number}
 * 1 星期一
 * 2 星期二
 * 3 星期三
 * 4 星期四
 * 5 星期五
 * 6 星期六
 * 0 星期天
 */
export const weekOfMonth = function (date) {
    if (!date) {date = new Date();}
    return new Date(getFullYear(date), getMonth(date), 1).getDay();
};

/**
 * 获取月份
 * @param date
 * @returns {*|number}
 */
export const getMonth = function (date) {
    if (!date) {date = new Date();}
    return date.getMonth();
};

/**
 * 获取年份
 * @param date
 * @returns {number}
 */
export const getFullYear = function (date) {
    if (!date) {date = new Date();}
    return date.getFullYear();
};

/**
 * 获取一月中的某一天
 * @param date
 * @returns {number}
 */
export const getDate = function (date) {
    if (!date) {date = new Date();}
    return date.getDate();
};

export default {
    isLeapYear,
    weekOfMonth,
    getMonth,
    getFullYear,
    getDate,
};
