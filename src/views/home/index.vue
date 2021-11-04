<template>
    <div class="home-entry">
        <div class="container">
            <!-- 左侧分类菜单组件 -->
            <HomeCategory />
            <!-- 轮播图组件 -->
            <HomeBanner />
        </div>
        <!-- 新鲜好物 -->
        <HomePanel />
        <!-- 人气推荐 -->
        <HomeHot />
        <!-- 热门品牌 -->
        <HomeBrand />
        <!-- 产品 -->
        <HomeProduct />
        <!-- 最新专题 -->
        <HomeSpecial />
    </div>
</template>
<script>
import HomeCategory from "./components/home-category";
import HomeBanner from "./components/home-banner";
import HomePanel from "./components/home-news";
import HomeHot from "./components/home-hot";
import HomeBrand from "./components/home-brand";
import HomeProduct from "./components/home-product";
import HomeSpecial from "./components/home-special";
export default {
    name: "Home",
    components: { HomeCategory, HomeBanner, HomePanel, HomeHot, HomeBrand, HomeProduct, HomeSpecial },
};
</script>
<style lang="less" scoped></style>
