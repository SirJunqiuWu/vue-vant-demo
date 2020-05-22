import {utils} from "../../../utils/utils";

export class WJQGoods {
    /**
     * 商品id
     */
    goodsId;

    /**
     * 商品名
     */
    goodsName;

    /**
     * 商品价格
     */
    goodsPrice;

    /**
     * 商品图标
     */
    goodsImageUrl;

    /**
     * 是否被选择 true选中 默认false
     */
    isSelected;

    constructor(args) {
        args = args ? args : {};
        this.goodsId = utils.nullStr(args.id);
        this.goodsName = utils.nullStr(args.name);
        this.goodsPrice = utils.nullStr(args.price);
        this.goodsImageUrl = utils.nullStr(args.image);
        this.isSelected = false;
    }
}