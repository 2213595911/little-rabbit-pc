// 商品分类接口api
import request from "@/utils/request";

/**
 * 获取一级分类、二级分类、以及所有商品
 * @returns promise
 */
export function findAllCategory () {
    return request('/home/category/head', 'get')
}

/**
 * 获取顶级分类下子类目的推荐商品
 * @param {String} 顶级分类的id
 * @returns
 */
export function findTopCategory (id) {
    return request('/category', 'get', { id })
}
