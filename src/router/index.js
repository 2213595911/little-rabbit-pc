import { createRouter, createWebHashHistory } from 'vue-router'

// 路由懒加载
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub')

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: Home
            },
            {
                path: 'category/:id',
                component: TopCategory
            },
            {
                path: 'category/sub/:id',
                component: SubCategory
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 切换路由之后的行为
    scrollBehavior () {
        return {
            top: 0,
            left: 0
        }
    }
})

export default router
