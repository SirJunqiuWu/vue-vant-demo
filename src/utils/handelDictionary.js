/**
 * 获取字典的所有key
 * @param obj
 * @returns {*}
 */
const allKeys = (obj) => {
    obj = !obj ? {} : obj;
    return Object.keys(obj);
};

/**
 * 获取字典的所有values
 * @param obj
 * @returns {*}
 */
const allValues = (obj) => {
    obj = !obj ? {} : obj;
    return Object.values(obj);
};

/**
 * 判断是否为空字典 true是 反之不是
 * @param obj
 * @returns {boolean}
 */
const isEmptyObj = (obj) => {
    obj = !obj ? {} : obj;
    const keys = Object.keys(obj);
    return !keys|| keys.length === 0;
};

/**
 * 判断字典是否有某个key
 * @param key
 * @param obj
 * @returns {boolean}
 */
const isHaskey = (key, obj) => {
    key = !key ? '' : key;
    obj = !obj ? {} : obj;
    const has = key in obj || obj.hasOwnProperty(key);
    return has;
};

/**
 * 从字典中获取对应key的值
 * @param obj
 * @param key
 * @param defaultValue
 */
const getStringWithKey = (obj, key, defaultValue) => {
    const keys = Object.keys(obj);
    const defaultStr = !defaultValue ? undefined : defaultValue;
    if (!keys|| keys.length === 0) {
        return defaultStr;
    }
    const has = key in obj || obj.hasOwnProperty(key);
    if (has) return obj[key];
    return defaultStr;
};

/**
 * 删除字典中某个key对应的值
 * @param key
 * @param obj
 * @returns {{}|boolean}
 */
const deleteValueByKey = (key, obj) => {
    key = key ? key : '';
    obj = !obj ? {} : obj;
    if (isEmptyObj(obj)) {
        return {};
    }
    if (isHaskey(key, obj)) {
        const hasDelete = delete obj[key];
        if (hasDelete) {
            return obj;
        }
    }
    return {};
};

export const handelDictionary = {
    allKeys,
    allValues,
    isEmptyObj,
    isHaskey,
    deleteValueByKey,
    getStringWithKey,
};