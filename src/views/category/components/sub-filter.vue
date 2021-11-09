<template>
    <!-- 筛选区 -->
    <div class="sub-filter" v-if="filterData && !loading">
        <!--品牌区域-->
        <div class="item">
            <div class="head">品牌：</div>
            <div class="body">
                <a
                    @click="changeBrand(brand.id)"
                    :class="{ active: filterData.selectedBrand === brand.id }"
                    href="javascript:;"
                    v-for="brand in filterData.brands"
                    :key="brand.id"
                    >{{ brand.name }}</a
                >
            </div>
        </div>
        <div class="item" v-for="attr in filterData.saleProperties" :key="attr.id">
            <div class="head">{{ attr.name }}：</div>
            <div class="body">
                <a
                    @click="changeProp(attr, prop.id)"
                    :class="{ active: attr.selectedProp === prop.id }"
                    href="javascript:;"
                    v-for="prop in attr.properties"
                    :key="prop.id"
                    >{{ prop.name }}</a
                >
            </div>
        </div>
    </div>
    <!--加载动画-->
    <div v-else class="sub-filter">
        <XtxSkeleton class="item" width="800px" height="40px" animated />
        <XtxSkeleton class="item" width="800px" height="40px" animated />
        <XtxSkeleton class="item" width="600px" height="40px" animated />
        <XtxSkeleton class="item" width="600px" height="40px" animated />
        <XtxSkeleton class="item" width="600px" height="40px" animated />
    </div>
</template>
<script>
import { findFilterData } from "@/api/category";
import { useRoute } from "vue-router";
import { watch, ref } from "vue";

export default {
    name: "SubFilter",
    setup(props, { emit }) {
        const route = useRoute();
        const filterData = ref(null);
        const loading = ref(false);
        watch(
            () => route.params.id,
            (newValue) => {
                if (newValue && route.path === `/category/sub/${newValue}`) {
                    loading.value = true;
                    findFilterData(route.params.id).then((value) => {
                        console.log(value);
                        // 设置默认选中全部的属性
                        value.result.selectedBrand = null;
                        filterData.value = value.result;
                        // 品牌前面需要有全部选项
                        filterData.value.brands.unshift({
                            id: null,
                            name: "全部",
                        });
                        // 每一个规格的第一个添加全部选项
                        filterData.value.saleProperties.forEach((item) => {
                            // 为每一个规格添加一个控制选中全选的属性
                            item.selectedProp = null;
                            item.properties.unshift({
                                id: null,
                                name: "全部",
                            });
                        });
                        loading.value = false;
                    });
                }
            },
            { immediate: true }
        );

        // 我们后台需要的筛选数据是{brandId:'',attrs:[{groupName:'',propertyName:''}]}
        function filterParams() {
            // 将选择好的品牌id保存起来
            let attrs = [];
            let filterParams = {};
            filterParams.brandId = filterData.value.selectedBrand;
            filterData.value.saleProperties.forEach((attr) => {
                const prop = attr.properties.find((item) => attr.selectedProp === item.id);
                if (attr && attr.id !== undefined) {
                    attrs.push({
                        groupName: attr.name,
                        propertyName: prop.name,
                    });
                }
            });
            if (attrs.length) filterParams.attrs = attrs;
            return filterParams;
        }

        // 选择品牌之后
        function changeBrand(BrandId) {
            filterData.value.selectedBrand = BrandId;
            emit("filter-change", filterParams());
        }

        // 选择筛选参数之后
        function changeProp(item, PropId) {
            item.selectedProp = PropId;
            emit("filter-change", filterParams());
        }

        return {
            filterData,
            loading,
            changeBrand,
            changeProp,
        };
    },
};
</script>
<style scoped lang="less">
.xtx-skeleton {
    padding: 10px 0;
}

// 筛选区
.sub-filter {
    background: #fff;
    padding: 25px;

    .item {
        display: flex;
        line-height: 40px;

        .head {
            width: 80px;
            color: #999;
        }

        .body {
            flex: 1;

            a {
                margin-right: 36px;
                transition: all 0.3s;
                display: inline-block;

                &.active,
                &:hover {
                    color: @xtxColor;
                }
            }
        }
    }
}
</style>
