<template>
    <div class="home-entry">
        <div class="container">
            <!-- 左侧分类菜单组件 -->
            <HomeCategory />
            <!-- 轮播图组件 -->
            <HomeBanner />
        </div>
    </div>
</template>
<script>
import HomeCategory from "./components/home-category";
import HomeBanner from "./components/home-banner";
export default {
    name: "Home",
    components: { HomeCategory, HomeBanner },
};
</script>
<style lang="less" scoped></style>
