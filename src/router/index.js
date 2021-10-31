import { createRouter, createWebHashHistory } from 'vue-router'

// 路由懒加载
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/Home')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [{ path: '/', component: Home }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
