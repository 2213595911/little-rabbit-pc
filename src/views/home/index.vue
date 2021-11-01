<template>
    <div class="container">
        <!-- 左侧分类菜单组件 -->
        <HomeCategory />
        <!-- 轮播图组件 -->
    </div>
</template>
<script>
import HomeCategory from "./components/home-category";
export default {
    name: "Home",
    components: { HomeCategory },
};
</script>
<style lang="less" scoped></style>
