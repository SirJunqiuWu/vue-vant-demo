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
        this.goodsArr = [];
        for (const temp of args.goodsArr) {
            // 商品对象
            const goods = new WJQGoods(temp);
            this.goodsArr.push(goods);
        }
    }
}

export function getAllShopsWithArray(array) {
    allShopArray = allShopArray ? allShopArray : [];
    array = array ? array : [];
    utils.log('array', array)
    for (const temp of array) {
        // 店铺对象
        const shop = new WJQShops(temp);
        allShopArray.push(shop);
    }
    return allShopArray;
}
