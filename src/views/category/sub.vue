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
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { findGoodsList } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
    name: 'SubCategory',
    components: {
        SubBread,
        SubFilter,
        SubSort,
        GoodsItem
    },
    setup () {
        const loading = ref(false)
        const finished = ref(false)
        // 商品列表数据
        const goodsList = ref([])
        // 请求数据的时候携带的参数
        let reqParams = {
            page: 1,
            pageSize: 20
        }
        const route = useRoute()

        function getData () {
            loading.value = true
            reqParams.categoryId = route.params.id
            findGoodsList(reqParams).then(({ result }) => {
                if (result.items.length) {
                    // 将返回到的数据push到数据中,因为我们还需要加载更多所以不能直接替换掉
                    goodsList.value.push(...result.items)
                    reqParams.page++
                } else {
                    finished.value = true
                }
                loading.value = false
            })
            watch(() => route.params.id, (newValue) => {
                if (`/category/sub/${newValue}` === route.path) {
                    goodsList.value = []
                    reqParams = {
                        page: 1,
                        pageSize: 20
                    }
                    finished.value = false
                }
            })
        }

        function sortChange (sortParams) {
            reqParams = { ...reqParams, ...sortParams }
            reqParams.page = 1
            goodsList.value = []
            finished.value = false
            getData()
        }

        function filterChange (filterParams) {
            reqParams = { ...reqParams, ...filterParams }
            reqParams.page = 1
            goodsList.value = []
            finished.value = false
        }

        return {
            loading,
            finished,
            getData,
            goodsList,
            sortChange,
            filterChange
        }
    }
}
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
