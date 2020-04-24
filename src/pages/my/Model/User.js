import {isNullStr} from "../../../utils/utils";

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
        args = args ? args : {};
        this.userId = isNullStr(args.userId)
        this.userName = isNullStr(args.userName);
        this.userAvatar = isNullStr(args.userAvatar);
        this.nickName = isNullStr(args.nickName);
        this.mobile = isNullStr(args.mobile);
        this.sex = isNullStr(args.sex);
        this.birth = isNullStr(args.birth);
        this.interest = isNullStr(args.interest);
    }
}

export function Singleton() {
    this.data = 'singleton';
}

export function getSingleton () {
    var instance;
    return  instance ? instance : new Singleton()
}