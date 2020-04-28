import {isNullStr, isEmptyString, utils} from "../utils/utils";

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
        this.title = isNullStr(args.title);
        this.des = isNullStr(args.des);
        this.icon = isNullStr(args.icon);
        this.placeholder = isNullStr(args.placeholder);
        this.identify = isNullStr(args.identify);
        this.type = isNullStr(args.type);
    }
}

export function getTitleSubTitleObj(title, des, placeholder, identify, icon, type) {
    const obj = {};
    obj.title = isNullStr(title);
    obj.des = isNullStr(des);
    obj.icon = isNullStr(icon);
    obj.placeholder = isNullStr(placeholder);
    obj.identify = isNullStr(identify);
    obj.type = utils.isEmptyString(type) ? isNullStr(type): 'text';
    return obj;
}