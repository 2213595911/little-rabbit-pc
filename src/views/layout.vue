<template>
    <!-- 顶部通栏 -->
    <!-- <nav>顶部通栏</nav> -->
    <AppTopnav />
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 内容容器 -->
    <div class="mian">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <footer>底部组件</footer>
</template>
<script>
import AppTopnav from "@/components/layout-navbar";
import AppHeader from "@/components/layout-header";
export default {
    name: "Layout",
    components: { AppTopnav, AppHeader },
};
</script>
<style lang="less"></style>
