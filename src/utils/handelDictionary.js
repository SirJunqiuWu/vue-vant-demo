/**
 * 获取字典的所有key
 * @param obj
 * @returns {*}
 */
const allKeys = (obj) => {
    return obj.keys();
};

/**
 * 获取字典的所有values
 * @param obj
 * @returns {*}
 */
const allValues = (obj) => {
    return obj.values();
};

/**
 * 判断是否为空字典 true是 反之不是
 * @param obj
 * @returns {boolean}
 */
const isEmptyObj = (obj) => {
    obj = obj ? obj : {};
    return obj.keys().length === 0;
};

/**
 * 判断字典是否有某个key
 * @param key
 * @param obj
 * @returns {boolean}
 */
const isHaskey = (key, obj) => {
    obj = obj ? obj : {};
    return key in obj.keys();
};

/**
 * 删除字典中某个key对应的值
 * @param key
 * @param obj
 * @returns {{}|boolean}
 */
const deleteValueByKey = (key, obj) => {
    key = key ? key : '';
    obj = obj ? obj : {};
    if (isEmptyObj(obj)) {
        return {};
    }
    if (isHaskey(key, obj)) {
        return delete obj[key];
    }
    return {};
};

export const handelDictionary = {
    allKeys,
    allValues,
    isEmptyObj,
    isHaskey,
    deleteValueByKey,
};