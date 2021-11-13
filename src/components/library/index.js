// 插件就是拓展vue原有的功能：全局组件，自定义指令，挂载原型对象，注意：没有全局过滤器
import defaultImg from '@/assets/images/200.png'
const importFn = require.context("./", false, /\.vue$/);
export default {
    install(app) {
        // 通过函数身上的keys方法可以获取所有符合正则的文件路径
        importFn.keys().forEach((path) => {
            const component = importFn(path).default // 获取组件的实例对象
            app.component(component.name, component)
        })
        defineDirective(app)
    },
};
function defineDirective(app) {
    app.directive("lazy", {
        // 在vue3中表示dom加载完毕的是mounted
        mounted(element, { value }) {
            const observer = new IntersectionObserver(
                ([{ isIntersecting }]) => {
                    if (isIntersecting) {
                        observer.unobserve(element);
                        element.onerror = () => (element.src = defaultImg);
                        element.src = value;
                    }
                },
                { threshold: 0 }
            );
            observer.observe(element);
        },
        // 创建监视对象
    });
}
