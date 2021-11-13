<template>
    <div class="goods-image">
        <!-- 大图片 -->
        <div v-if="show" class="large" :style="[{ backgroundImage: `url(${images[currIndex]})`, ...largePosition }]"></div>
        <!-- 中间层 -->
        <div class="middle" ref="target">
            <!-- 遮罩层 -->
            <div v-if="show" class="layer" :style="layerPosition"></div>
            <!-- 中间层图片 -->
            <img :src="images[currIndex]" alt="" />
        </div>
        <!-- 小图片列表 -->
        <ul class="small">
            <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
                <img @mouseenter="currIndex = i" :src="img" alt="" />
            </li>
        </ul>
    </div>
</template>
<script>
import { ref, reactive, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
export default {
    name: "GoodsImage",
    props: {
        images: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const currIndex = ref(0);
        // 控制遮罩层的显示隐藏
        const show = ref(false);
        // 控制遮罩层的坐标
        const layerPosition = reactive({
            top: 0,
            left: 0,
        });
        // 控制大图片的背景图像坐标
        const largePosition = reactive({
            backgroundPositionX: 0,
            backgroundPositionY: 0,
        });
        // 监听的容器
        const target = ref(null);
        const { elementX, elementY, isOutside } = useMouseInElement(target);
        // 监听坐标的改变
        const position = {
            x: 0,
            y: 0,
        };
        watch([elementX, elementY, isOutside], () => {
            show.value = !isOutside.value;
            // 判断x轴
            if (elementX.value > 100 && elementX.value < 300) position.x = elementX.value - 100;
            // 判断x轴
            if (elementY.value > 100 && elementY.value < 300) position.y = elementY.value - 100;
            // 遮罩层样式
            layerPosition.left = position.x + "px";
            layerPosition.top = position.y + "px";
            // 大图片样式
            largePosition.backgroundPositionX = -2 * position.x + "px";
            largePosition.backgroundPositionY = -2 * position.y + "px";
        });
        return { currIndex, show, layerPosition, largePosition, target };
    },
};
</script>
<style scoped lang="less">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    z-index: 500;
    // 大图片样式
    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }
    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
        position: relative;
        cursor: move;
        // 遮罩层
        .layer {
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.2);
            left: 0;
            top: 0;
            position: absolute;
        }
    }
    .small {
        width: 80px;
        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;
            &:hover,
            &.active {
                border: 2px solid @xtxColor;
            }
        }
    }
}
</style>
