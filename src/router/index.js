import { createRouter, createWebHashHistory } from "vue-router";

const routes = [];

// vue2.0中通过使用 new VurRouter({}) 来创建路由配置对象
// vue3.0中通过使用 createRouter({}) 来创建路由配置对象
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
