<template>
    <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
        <ul class="carousel-body">
            <li :class="{ fade: i === index }" class="carousel-item" v-for="(item, i) in slider" :key="item.id">
                <RouterLink :to="item.hrefUrl">
                    <img :src="item.imgUrl" alt="" />
                </RouterLink>
            </li>
        </ul>
        <a href="javascript:;" class="carousel-btn prev" @click="previous"><i class="iconfont icon-angle-left"></i></a>
        <a href="javascript:;" class="carousel-btn next" @click="next"><i class="iconfont icon-angle-right"></i></a>
        <div class="carousel-indicator">
            <span :class="{ active: index === i }" v-for="(item, i) in slider" :key="item.id" @click="index = i"></span>
        </div>
    </div>
</template>

<script>
import { ref, watch, onUnmounted } from "vue";
export default {
    name: "XtxCarousel",
    props: {
        slider: {
            type: Array,
            default: [],
        },
        duration: {
            type: Number,
            default: 3000,
        },
        autoPlay: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        let index = ref(0);
        const next = () => (index.value >= props.slider.length - 1 ? (index.value = 0) : index.value++);
        const previous = () => (index.value == 0 ? (index.value = props.slider.length - 1) : index.value--);

        let timer = null;
        // 当鼠标在失去焦点的时候触发
        function start() {
            if (props.autoPlay && props.slider.length) {
                clearInterval(timer);
                timer = setInterval(() => {
                    next();
                }, props.duration);
            }
        }
        // 当鼠标进入到轮播图内
        function stop() {
            if (timer) clearInterval(timer);
        }
        // 当数据有的时候并且输入了自动播放那么久开始自动播放
        watch(
            () => props.slider,
            () => {
                if (props.slider.length && props.autoPlay) start();
            }
        );
        onUnmounted(() => clearInterval(timer));
        return { index, next, previous, start, stop };
    },
};
</script>
<style scoped lang="less">
.xtx-carousel {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;
    .carousel {
        &-body {
            width: 100%;
            height: 100%;
        }
        &-item {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            transition: opacity 0.5s linear;
            &.fade {
                opacity: 1;
                z-index: 1;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        &-indicator {
            position: absolute;
            left: 0;
            bottom: 20px;
            z-index: 2;
            width: 100%;
            text-align: center;
            span {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                cursor: pointer;
                ~ span {
                    margin-left: 12px;
                }
                &.active {
                    background: #fff;
                }
            }
        }
        &-btn {
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, 0.2);
            color: #fff;
            border-radius: 50%;
            position: absolute;
            top: 228px;
            z-index: 2;
            text-align: center;
            line-height: 44px;
            opacity: 0;
            transition: all 0.5s;
            &.prev {
                left: 20px;
            }
            &.next {
                right: 20px;
            }
        }
    }
    &:hover {
        .carousel-btn {
            opacity: 1;
        }
    }
}
</style>
