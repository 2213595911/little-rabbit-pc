import { createRouter, createWebHashHistory } from "vue-router";

// 路由懒加载
const Layout = () => import("@/views/Layout");
const Home = () => import("@/views/home/Home");
const routes = [
    {
        path: "/",
        component: Layout,
        children: [{ path: "/", component: Home }],
    },
];

// vue2.0中通过使用 new VurRouter({}) 来创建路由配置对象
// vue3.0中通过使用 createRouter({}) 来创建路由配置对象
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
