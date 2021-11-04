// 提供首页相关的api函数
import request from "@/utils/request";
/**
 * 获取品牌
 * @param {Integer} limit 品牌个数
 * @returns promise
 */
function findBrand(limit = 6) {
    return request("/home/brand", "get", { limit });
}
// 获取轮播图图片
function findBanner() {
    return request("/home/banner", "get");
}
// 获取新鲜好物
function findNews(limit = 4) {
    return request("/home/new", "get", { limit });
}
// 获得人气推荐
function findHot() {
    return request("/home/hot", "get");
}
// 产品区块
function findProduct() {
    return request("/home/goods", "get");
}
// 最新专题
function findSpecial() {
    return request("/home/special", "get");
}
export { findBrand, findBanner, findNews, findHot, findProduct, findSpecial };
