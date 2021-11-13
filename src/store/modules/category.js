import constants from "@/api/constants";
import { findAllCategory } from "@/api/category";
export default {
    namespaced: true,
    state() {
        return {
            categoryList: constants.map((item) => ({ name: item })),
        };
    },
    mutations: {
        setCategoryList(state, payload) {
            state.categoryList = payload;
        },
        // 控制二级菜单的显示
        show(state, id) {
            const currentCat = state.categoryList.find((item) => item.id === id);
            currentCat.open = true;
        },
        // 控制二级菜单的隐藏
        hide(state, id) {
            const currentCat = state.categoryList.find((item) => item.id === id);
            currentCat.open = false;
        },
    },
    actions: {
        async getCategoryList({ commit }) {
            const { result } = await findAllCategory();
            // 为每一个一级分类追加一个控制二级菜单显示隐藏的属性
            result.forEach((item) => (item.open = false));
            commit("setCategoryList", result);
        },
    },
};
