<template>
    <!-- 顶部通栏 -->
    <!-- <nav>顶部通栏</nav> -->
    <AppTopnav />
    <!-- 头部组件 -->
    <header>头部组件</header>
    <!-- 内容容器 -->
    <div class="mian">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <footer>底部组件</footer>
</template>
<script>
import AppTopnav from "@/components/layout-navbar";
export default {
    name: "Layout",
    components: { AppTopnav },
};
</script>
<style lang="less"></style>
