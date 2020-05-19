import {isEmptyString, utils} from "../utils/utils";

export class WJQTitleSubTitle {
    /**
     * 左侧标题
     */
    title;
    /**
     * 右侧描述
     */
    des;
    /**
     * 图标
     */
    icon;
    /**
     * 占位提示文本
     */
    placeholder;
    /**
     * 属性标记 eg:sex性别 birth生日 方便更新对应值
     */
    identify;
    /**
     * 文本框标记 eg: text纯文本编辑  tel手机号验证  textarea可以多行编辑
     */
    type;

    constructor(args) {
        args = args || {};
        this.title = utils.nullStr(args.title);
        this.des = utils.nullStr(args.des);
        this.icon = utils.nullStr(args.icon);
        this.placeholder = utils.nullStr(args.placeholder);
        this.identify = utils.nullStr(args.identify);
        this.type = utils.nullStr(args.type);
    }
}

export function getTitleSubTitleObj(title, des, placeholder, identify, icon, type) {
    const obj = {};
    obj.title = utils.nullStr(title);
    obj.des = utils.nullStr(des);
    obj.icon = utils.nullStr(icon);
    obj.placeholder = utils.nullStr(placeholder);
    obj.identify = utils.nullStr(identify);
    obj.type = utils.isEmptyString(type) ? utils.nullStr(type): 'text';
    return obj;
}