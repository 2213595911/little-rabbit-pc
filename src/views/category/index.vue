<template>
    <div class="top-category">
        <div class="container">
            <!-- 面包屑 -->
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <transition name="fade-right" mode="out-in">
                    <XtxBreadItem v-if="topCategory" :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
                </transition>
            </XtxBread>
            <!-- 轮播图 -->
            <XtxCarousel :slider="slider" style="height: 500px" />
            <!-- 所有二级分类 -->
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="sub in topCategory.children" :key="sub.id">
                        <a href="javascript:;">
                            <img :src="sub.picture" />
                            <p>{{ sub.name }}</p>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- 分类关联商品 -->
            <div class="ref-goods" v-for="sub in subList.children" :key="sub.id">
                <div class="head">
                    <h3>- {{ sub.name }} -</h3>
                    <p class="tag">温暖柔软，品质之选</p>
                    <XtxMore />
                </div>
                <div class="body">
                    <GoodsItem v-for="good in sub.goods" :key="good.id" :good="good" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { findBanner } from '@/api/home'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import GoodsItem from './components/goods-item'
import { findTopCategory } from '@/api/category'

export default {
    name: 'TopCategory',
    components: { GoodsItem },
    setup () {
        const slider = ref([])
        const route = useRoute()
        const store = useStore()
        // 获取轮播图数据
        findBanner().then((value) => (slider.value = value.result))
        // 获取id对应的商品分类
        // let topCategory = computed(() => store.state.category.categoryList.find((item) => item.id === route.params.id))
        // if (!topCategory.value) topCategory = []
        const topCategory = computed(() => {
            let cate = {}
            const item = store.state.category.categoryList.find(item => item.id === route.params.id)
            if (item) cate = item
            return cate
        })
        // 获取一级分类的二级类目推荐商品列表
        let subList = ref([])
        watch(
            () => route.params.id,
            (newValue) => {
                // 只有在跳转顶级类目的时候才请求数据
                if (`/category/${newValue}` === route.path) getSubList()
            },
            { immediate: true }
        )

        function getSubList () {
            findTopCategory(route.params.id).then((value) => (subList.value = value.result))
        }

        return {
            slider,
            topCategory,
            subList
        }
    }
}
</script>

<style scoped lang="less">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;

                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: @xtxColor;
                    }
                }
            }
        }
    }
}

// 分类关联商品
.ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
        .xtx-more {
            position: absolute;
            top: 20px;
            right: 20px;
        }

        .tag {
            text-align: center;
            color: #999;
            font-size: 20px;
            position: relative;
            top: -20px;
        }
    }

    .body {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 65px 30px;
    }
}
</style>
