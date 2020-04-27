import {isNullStr} from "../utils/utils";

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

    constructor(args) {
        args = args || {};
        this.title = isNullStr(args.title);
        this.des = isNullStr(args.des);
        this.icon = isNullStr(args.icon);
        this.placeholder = isNullStr(args.placeholder);
        this.identify = isNullStr(args.identify);
    }
}

export function getTitleSubTitleObj(title, des, placeholder, identify, icon) {
    const obj = {};
    obj.title = isNullStr(title);
    obj.des = isNullStr(des);
    obj.icon = isNullStr(icon);
    obj.placeholder = isNullStr(placeholder);
    obj.identify = isNullStr(identify);
    return obj;
}