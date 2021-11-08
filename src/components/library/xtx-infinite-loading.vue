<template>
    <div class="xtx-infinite-loading" ref="target">
        <div class="loading" v-if="loading">
            <span class="img"></span>
            <span class="text">正在加载...</span>
        </div>
        <div class="none" v-if="finished">
            <span class="img"></span>
            <span class="text">亲，没有更多了</span>
        </div>
    </div>
</template>

<script>
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export default {
    name: 'XtxInfiniteLoading',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        finished: {
            type: Boolean,
            default: false
        }
    },
    setup (props, { emit }) {
        const target = ref(null)
        useIntersectionObserver(target, ([{ isIntersecting }]) => {
            if (isIntersecting) {
                // 只有在loading是false和finished是false的时候才去触发请求数据的函数
                if (props.loading === false && props.finished === false) {
                    console.log('houdunren.com')
                    emit('infinite')
                }
            }
        }, { threshold: 0 })
        return { target }
    }
}
</script>

<style scoped lang="less">
.xtx-infinite-loading {
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;

        .img {
            width: 50px;
            height: 50px;
            background: url(../../assets/images/load.gif) no-repeat center / contain;
        }

        .text {
            color: #999;
            font-size: 16px;
        }
    }

    .none {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;

        .img {
            width: 200px;
            height: 134px;
            background: url(../../assets/images/none.png) no-repeat center / contain;
        }

        .text {
            color: #999;
            font-size: 16px;
        }
    }
}
</style>
