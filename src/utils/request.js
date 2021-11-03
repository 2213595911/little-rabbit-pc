import axios from "axios";
import store from "@/store";
import router from "@/router";
// 1. 创建axios实例
// 2. 设置请求拦截器，携带token请求
// 3. 设置响应拦截器，剥离无用数据，处理token失败的情况
// 4. 返回请求工具
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
const instance = axios.create({
    baseURL,
    timeout: 5000,
});
// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 设置token
        const profile = store.state.user.profile;
        if (profile.token) {
            config.headers.Authorization = `Bearer ${profile.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// 响应拦截器
instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
        if (err.response && err.response.status === 401) {
            // 1. 清除无效用户信息
            store.commit("setUser", {});
            // 2. 跳转到登陆页面,用户登陆成功之后需要返回当前的这个页面,所以我们需要将当前的路由路径传递过去
            // 当前路由地址：
            // 组件中:$route.fullPath
            // js模块中:router.currentRoute.value.fullPath,注意返回的是一个ref对象
            // encodeRUIComponent 转换url编码，防止解析地址错误
            router.push(`/login?redirectUrl=${encodeURIComponent(router.currentRoute.value.fullPath)}`);
        }
    }
);
// 设置请求工具
export default function (url, method, submitData) {
    return instance({
        url,
        method,
        // 在axios中如果是get方式那么需要使用params参数，如果不是那就是data
        [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
    });
}
