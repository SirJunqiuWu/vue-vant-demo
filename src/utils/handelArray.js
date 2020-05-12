/**
 * 根据索引和目标数组获取对应索引的元素
 * @param idx
 * @param arr
 * @returns {{}|*}
 */
const getObjectAtIndex = (idx, arr) => {
    if (idx >= arr.length) {
        return null;
    }
    return arr[idx];
};

/**
 * 在数组中某个索引处插入一个元素
 * @param idx 指定索引
 * @param obj 要插入的元素
 * @param arr 目标数组
 * @returns {any[]|*} 插入对象后的数组
 */
const insertObjAtIndex = (idx, obj, arr) => {
    if (idx >= arr.length) return arr;
    return arr.splice(idx, 0, obj);
}

/**
 * 删除数组中指定索引的元素
 * @param idx 当前要删除的对象索引
 * @param arr 目标数据源
 * @returns {any[]} 删除后的数组
 */
const deleteObjAtIndex = (idx, arr) => {
    if (idx >= arr.length) return arr;
    // 删除索引为idx的元素 第二个参数为idx索引开始，删除几个元素
    return arr.splice(idx, 1);
};

/**
 * 更新数组中某个索引位置的元素
 * @param idx 当前要编辑的对象索引
 * @param obj 新的对象
 * @param arr 目标数据源
 * @returns {any[]|*} 更换对应索引后的数组
 */
const replaceObjAtIndex = (idx, obj, arr) => {
    if (idx >= arr) return arr;
    return arr.splice(idx, 1, obj);
};

/**
 * 对数组进行增删改的操作类 通过handelArray调用
 * @type {{}} 注册的方法
 */
export const handelArray = {
    getObjectAtIndex,
    deleteObjAtIndex,
    replaceObjAtIndex,
    insertObjAtIndex,
};