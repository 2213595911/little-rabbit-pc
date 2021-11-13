<template>
    <div class="sub-category">
        <div class="container">
            <!--面包屑-->
            <SubBread />
            <!--筛选属性-->
            <SubFilter @filter-change="filterChange" />
            <!--排序商品区域-->
            <div class="goods-list">
                <!--过滤区域-->
                <SubSort @sort-change="sortChange" />
                <!--商品区域-->
                <ul>
                    <li v-for="good in goodsList" :key="good.id">
                        <GoodsItem :good="good" />
                    </li>
                </ul>
                <!--加载更多组件-->
                <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
            </div>
        </div>
    </div>
</template>

<script>
import SubBread from "./components/sub-bread";
import SubFilter from "./components/sub-filter";
import SubSort from "./components/sub-sort";
import GoodsItem from "./components/goods-item";
import { findGoodsList } from "@/api/category";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

export default {
    name: "SubCategory",
    components: {
        SubBread,
        SubFilter,
        SubSort,
        GoodsItem,
    },
    setup() {
        const loading = ref(false);
        const finished = ref(false);
        // 商品列表数据
        const goodsList = ref([]);
        // 请求数据的时候携带的参数
        let reqParams = {
            page: 1,
            pageSize: 20,
        };
        const route = useRoute();

        function getData() {
            loading.value = true;
            // 将品牌的id存储到请求数据中
            reqParams.categoryId = route.params.id;
            findGoodsList(reqParams).then(({ result }) => {
                // 如果有数据就渲染页面
                if (result.items.length) {
                    // 将返回到的数据push到数据中,因为我们还需要加载更多所以不能直接替换掉
                    goodsList.value.push(...result.items);
                    // 每一次请求之后都需要让当前页数加一
                    reqParams.page++;
                } else {
                    // 如果没有数据那么就将请求完毕状态打开
                    finished.value = true;
                }
                // 将laoding动画取消
                loading.value = false;
            });
            // 监视路由id的变化
            watch(
                () => route.params.id,
                (newValue) => {
                    // 判断是否是处于二级分类
                    if (`/category/sub/${newValue}` === route.path) {
                        // 切换路由之前需要先将之前的数据清空
                        goodsList.value = [];
                        // 将页码设置会初始值
                        reqParams = {
                            page: 1,
                            pageSize: 20,
                        };
                        // 将加载完毕动画关闭
                        finished.value = false;
                    }
                }
            );
        }

        function sortChange(sortParams) {
            reqParams = { ...reqParams, ...sortParams };
            reqParams.page = 1;
            goodsList.value = [];
            finished.value = false;
            getData();
        }

        function filterChange(filterParams) {
            reqParams = { ...reqParams, ...filterParams };
            reqParams.page = 1;
            goodsList.value = [];
            finished.value = false;
        }

        return {
            loading,
            finished,
            getData,
            goodsList,
            sortChange,
            filterChange,
        };
    },
};
</script>

<style lang="less" scoped>
.goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;

    ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 5px;

        li {
            margin-right: 20px;
            margin-bottom: 20px;

            &:nth-child(5n) {
                margin-right: 0;
            }
        }
    }
}
</style>
