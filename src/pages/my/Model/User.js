import {isNullStr, utils} from "../../../utils/utils";

/**
 * 当前用户信息:单例获取
 * @type {null}
 */
let currentUser = null;

export class User {
    /**
     * @property {string} userId -用户id
     */
    userId;

    /**
     * @property {string} userName -用户姓名
     */
    userName;

    /**
     * @property {string} userAvatar -用户头像
     */
    userAvatar;

    /**
     * @property {string} nickName -用户昵称
     */
    nickName;

    /**
     * @property {string} mobile -用户手机号
     */
    mobile;

    /**
     * @property {string} sex -用户性别
     */
    sex;

    /**
     * @property {string} birth -用户生日
     */
    birth;

    /**
     * @property {string} interest -用户生日
     */
    interest;

    // 创建对象时默认值
    constructor(args) {
        if (!currentUser) {
            currentUser = this;
        }
        args = args ? args : {};
        this.userId = utils.nullStr(args.userId)
        this.userName = utils.nullStr(args.userName);
        this.userAvatar = utils.nullStr(args.userAvatar);
        this.nickName = utils.nullStr(args.nickName);
        this.mobile = utils.nullStr(args.mobile);
        this.sex = utils.nullStr(args.sex);
        this.birth = utils.nullStr(args.birth);
        this.interest = utils.nullStr(args.interest);
        return currentUser;
    }
}

/**
 * 根据属性key更新当前用户信息
 * @param key 需要更新的用户信息属性key
 * @param value 需要更新的用户信息属性key对应的值
 * @returns {*}
 */
export function updateUserInfoByKey(key, value) {
    if (!key) return  currentUser;
    currentUser[key] = value ? value : '';
    return currentUser;
}

/**
 * 更新整个用户信息
 * @param obj 用户信息完整字典
 * @returns {User}
 */
export function updateUserInfoByObj(obj) {
    obj = obj ? obj : {};
    currentUser.userId = utils.nullStr(obj.userId)
    currentUser.userName = utils.nullStr(obj.userName);
    currentUser.userAvatar = utils.nullStr(obj.userAvatar);
    currentUser.nickName = utils.nullStr(obj.nickName);
    currentUser.mobile = utils.nullStr(obj.mobile);
    currentUser.sex = utils.nullStr(obj.sex);
    currentUser.birth = utils.nullStr(obj.birth);
    currentUser.interest = utils.nullStr(obj.interest);
    return currentUser;
}

/**
 * 获取当前用户
 * @returns {null}
 */
export function getCurrentUser() {
    return currentUser ? currentUser : {};
}
