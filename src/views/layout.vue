<template>
    <!-- 顶部通栏 -->
    <AppTopnav />
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 内容容器 -->
    <div class="mian">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <AppFooter />
</template>
<script>
import AppTopnav from "@/components/layout-navbar";
import AppHeader from "@/components/layout-header";
import AppFooter from "@/components/layout-footer";
export default {
    name: "Layout",
    components: { AppTopnav, AppHeader, AppFooter },
};
</script>
<style lang="less"></style>
