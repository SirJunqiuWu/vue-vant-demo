import {utils} from "../../../utils/utils";
import {WJQGoods} from "./WJQGoods";
import {handelArray} from "../../../utils/handelArray";

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

    /**
     * 是否被选择 true选中 默认false
     */
    isSelected;

    constructor(args) {
        args = args ? args : {};
        this.shopId = utils.nullStr(args.id);
        this.shopName = utils.nullStr(args.shopName);
        this.goodsArr = [];
        this.isSelected = false;
        for (const temp of args.goodsArr) {
            // 商品对象
            const goods = new WJQGoods(temp);
            this.goodsArr.push(goods);
        }
    }
}

/**
 * 获取所有选择过商品的店铺
 * @param array
 * @returns {Array}
 */
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

/**
 * 选中或者取消选中购物车某个店铺时 更新店铺下的商品选中状态
 * @param select
 * @param idx
 * @returns {Array}
 */
export function updateShopsBySelected(isSelected, idx) {
    if (idx >= allShopArray.length) return allShopArray;
    const shop = allShopArray[idx];
    shop.isSelected = isSelected;
    const goodsArr = shop.goodsArr;
    for (const goods of goodsArr) {
        goods.isSelected = isSelected;
    }
    return handelArray.replaceObjAtIndex(idx, shop, allShopArray);
}

/**
 * 选中某个店铺下的商品
 * @param isSelected 是否选中
 * @param shopIdx 店铺在数组中的索引
 * @param goodsIdx 商品在商品数组中的索引
 * @returns {any[]|*|Array}
 */
export function updateGoodsBySelected(isSelected, shopIdx, goodsIdx) {
    if (shopIdx >= allShopArray.length) return allShopArray;
    const shop = allShopArray[shopIdx];
    const goodsArr = shop.goodsArr;
    if (goodsIdx >= goodsArr.length) return allShopArray;
    goodsArr[goodsIdx].isSelected = isSelected;
    shop.isSelected = isAllGoodsInShopSelected(goodsArr);
    return handelArray.replaceObjAtIndex(shopIdx, shop, allShopArray);
}

/**
 * 购物车全选按钮点击
 * @param isSelected
 * @returns {[]}
 */
export function updateAllShopSelected(isSelected) {
    const result = [];
    for (const shop of allShopArray) {
       shop.isSelected = isSelected;
       for (const goods of shop.goodsArr) {
           goods.isSelected = isSelected;
       }
       result.push(shop);
    }
    allShopArray = result;
    return allShopArray;
}

/**
 * 获取已经选中商品的总价
 * @returns {number}
 */
export function getSelectGoodsTotalMoney() {
    let result = 0;
    for (const shop of allShopArray) {
        const goodsArr = shop.goodsArr;
        for (const goods of goodsArr) {
            result += goods.isSelected ? goods.goodsPrice * goods.goodsNum * 100 : 0;
        }
    }
    return result;
}

/**
 * 是否某个店铺下的商品全部选中
 * @param arr
 * @returns {boolean}
 */
function isAllGoodsInShopSelected(arr) {
    // 如果该店铺下商品均选中 该店铺也选中
    let res = (arr.every((item) => {
        return item.isSelected;
    }));
    return res;
}

/**
 * 是否所有店铺均选中
 * @param arr
 * @returns {boolean}
 */
export function isAllGoodsSelected() {
    // 如果商品均选中 店铺也选中
    let res = (allShopArray.every((item) => {
        return item.isSelected;
    }));
    return res;
}