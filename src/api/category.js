// 商品分类接口api
import request from "@/utils/request";

/**
 * 获取一级分类、二级分类、以及所有商品
 * @returns promise
 */

export function findAllCategory() {
    return request("/home/category/head", "get");
}
