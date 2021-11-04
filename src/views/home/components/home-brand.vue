<template>
    <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
        <template v-slot:right>
            <a href="javascript:;" :class="{ disabled: !index }" @click="!index ? index : index--" class="iconfont icon-angle-left prev"></a>
            <a href="javascript:;" :class="{ disabled: index }" @click="index ? index : index++" class="iconfont icon-angle-right next"></a>
        </template>
        <Transition>
            <div v-if="brands.length" class="box" ref="box">
                <ul class="list" :style="{ transform: `translateX(${index * -1240}px) ` }">
                    <li v-for="item in brands" :key="item.id">
                        <RouterLink to="/">
                            <img :src="item.picture" alt="" />
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <HomeSkeleton v-else />
        </Transition>
    </HomePanel>
</template>

<script>
import HomePanel from "@/components/home-panel";
import { findBrand } from "@/api/home";
import { useLazyData } from "@/hooks";
import { ref } from "vue";
import HomeSkeleton from "./home-skeleton";
export default {
    name: "HomeBrand",
    components: { HomePanel, HomeSkeleton },
    setup() {
        const index = ref(0);
        const { result, target } = useLazyData(() => findBrand(10));
        return { brands: result, index, target };
    },
};
</script>

<style scoped lang="less">
.skeleton {
    width: 100%;
    display: flex;
    .item {
        margin-right: 10px;
        &:nth-child(5n) {
            margin-right: 0;
        }
    }
}
.home-panel {
    background: #f5f5f5;
}
.iconfont {
    width: 20px;
    height: 20px;
    background: #ccc;
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: @xtxColor;
    &::before {
        font-size: 12px;
        position: relative;
        top: -2px;
    }
    &.disabled {
        background: #ccc;
        cursor: not-allowed;
    }
}
.box {
    display: flex;
    width: 100%;
    height: 345px;
    overflow: hidden;
    padding-bottom: 40px;
    .list {
        width: 200%;
        display: flex;
        transition: all 1s;
        li {
            margin-right: 10px;
            width: 240px;
            &:nth-child(5n) {
                margin-right: 0;
            }
            img {
                width: 240px;
                height: 305px;
            }
        }
    }
}
</style>
