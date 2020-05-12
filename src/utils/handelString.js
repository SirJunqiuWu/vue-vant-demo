import md5 from 'md5';

/**
 * 判断指定字符串是否在目标字符串中
 * @param str 要被检测的字符串
 * @param sourceStr 字符串源
 * @returns {boolean} ture在 反之不在
 */
const isInStr = (str, sourceStr) => {
    if (!sourceStr || sourceStr.length === 0 || !str || str.length === 0) return false;
    return sourceStr.indexOf(str) != -1;
};

/**
 * 字符串根据某个字符进行分割为数组
 * @param str
 * @param sourceStr
 * @returns {null|string[]}
 */
const componentsSeparatedByString = (str, sourceStr) => {
    if (!sourceStr || sourceStr.length === 0 || !str || str.length === 0) return null;
    return sourceStr.split(str);
};

/**
 * 将目标字符串转化为小写字母
 * @param str
 * @returns {string}
 */
const toLowerCase = (str) => {
    return str.toLowerCase();
}

/**
 * 将目标字符串转化为大写字母
 * @param str
 * @returns {string}
 */
const toUpperCase = (str) => {
    return str.toUpperCase();
}

/**
 * 将字符串md5加密
 * @param str
 */
const md5Str = (str) => {
    return md5(str);
}

/**
 * 字符串操作方法文件 通过handelString调用
 * @type {{}}
 */
export const handelString = {
    isInStr,
    componentsSeparatedByString,
    toLowerCase,
    toUpperCase,
    md5Str,
};