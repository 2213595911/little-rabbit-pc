// 商品相关的api
import request from "@/utils/request";
/**
 * 请求商品的详细信息
 * @param {String} id 单独商品的id
 * @returns
 */
export function findGoods(id) {
    return request("/goods", "get", { id });
}
