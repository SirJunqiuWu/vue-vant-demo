import {isNullStr} from "../../../utils/utils";

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
        this.userId = isNullStr(args.userId)
        this.userName = isNullStr(args.userName);
        this.userAvatar = isNullStr(args.userAvatar);
        this.nickName = isNullStr(args.nickName);
        this.mobile = isNullStr(args.mobile);
        this.sex = isNullStr(args.sex);
        this.birth = isNullStr(args.birth);
        this.interest = isNullStr(args.interest);
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
    currentUser.userId = isNullStr(obj.userId)
    currentUser.userName = isNullStr(obj.userName);
    currentUser.userAvatar = isNullStr(obj.userAvatar);
    currentUser.nickName = isNullStr(obj.nickName);
    currentUser.mobile = isNullStr(obj.mobile);
    currentUser.sex = isNullStr(obj.sex);
    currentUser.birth = isNullStr(obj.birth);
    currentUser.interest = isNullStr(obj.interest);
    return currentUser;
}

/**
 * 获取当前用户
 * @returns {null}
 */
export function getCurrentUser() {
    return currentUser;
}
