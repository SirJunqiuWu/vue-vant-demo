import {utils} from "../../../utils/utils";
import {WJQGoods} from "./WJQGoods";

let currentShop = null;
let allShopArray = [];
export class WJQShops {
    /**
     * 店铺id
     */
    shopId;

    /**
     * 店铺名
     */
    shopName;

    /**
     * 店铺下的商品
     */
    goodsArr;

    constructor(args) {
        args = args ? args : {};
        this.shopId = utils.nullStr(args.id);
        this.shopName = utils.nullStr(args.shopName);
        for (const temp of args.goodsArr) {
            const goods = new WJQGoods(temp);
            this.goodsArr.push(goods);
        }
    }
}

export function getAllShopsWithObj(obj) {
    allShopArray = allShopArray ? allShopArray : [];
    obj = obj ? obj : [];
    for (const temp of obj) {
        // 店铺对象
        const shop = new WJQShops(obj);
        allShopArray.push(shop);
    }
}
