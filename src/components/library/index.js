// 插件就是拓展vue原有的功能：全局组件，自定义指令，挂载原型对象，注意：没有全局过滤器
// vue2.0插件要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上拓展
// vue3.0插件要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上拓展

import XtxSkeleton from "./xtx-skeleton";
import XtxCarousel from "./xtx-carousel";
import XtxMore from "./xtx-more";
import defaultImg from "@/assets/images/200.png";
export default {
    install(app) {
        app.component(XtxSkeleton.name, XtxSkeleton);
        app.component(XtxCarousel.name, XtxCarousel);
        app.component(XtxMore.name, XtxMore);
        defineDirective(app);
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
