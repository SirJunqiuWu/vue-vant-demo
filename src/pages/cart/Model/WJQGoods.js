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

    constructor(args) {
        args = args ? args : {};
        this.goodsId = utils.nullStr(args.id);
        this.goodsName = utils.nullStr(args.name);
        this.goodsPrice = utils.nullStr(args.price);
        this.goodsImageUrl = utils.nullStr(args.image);
    }
}