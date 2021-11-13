import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

/**
 *
 * @param {Function} apiFn - 接受到的请求后台api函数
 */
function useLazyData(apiFn) {
    const target = ref(null);
    const result = ref([]);
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            if (isIntersecting) {
                // 停止监听
                stop();
                apiFn().then((value) => (result.value = value.result));
            }
        },
        // 配置项，如果相交的尺寸大于0就触发
        { threshold: 0 }
    );
    return { target, result };
}

export { useLazyData };
