<template>
    <!-- 顶部通栏 -->
    <AppTopnav />
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 吸顶导航组件 -->
    <AppHeaderNav />
    <!-- 内容容器 -->
    <div class="main">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <AppFooter />
</template>
<script>
import AppTopnav from "@/components/layout-navbar";
import AppHeader from "@/components/layout-header";
import AppFooter from "@/components/layout-footer";
import AppHeaderNav from "@/components/layout-header-sticky";
import { useStore } from "vuex";
export default {
    name: "Layout",
    components: { AppTopnav, AppHeader, AppFooter, AppHeaderNav },
    setup() {
        const store = useStore();
        store.dispatch("category/getCategoryList");
    },
};
</script>
<style lang="less">
.main {
    min-height: 600px;
}
</style>
