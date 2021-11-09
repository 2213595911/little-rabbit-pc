<template>
    <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
            <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`" :key="category.top.id">{{ category.top.name }}</XtxBreadItem>
        </transition>
        <Transition name="fade-right" mode="out-in">
            <XtxBreadItem v-if="category.sub" :key="category.sub.id">{{ category.sub.name }}</XtxBreadItem>
        </Transition>
    </XtxBread>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";

export default {
    name: "SubBread",
    setup() {
        const store = useStore();
        const route = useRoute();
        const category = computed(() => {
            const cate = {};
            store.state.category.categoryList.forEach((top) => {
                // 有的商品会没有children属性所以我们要进行判断处理
                if (!top.children) return;
                const subCate = top.children.find((sub) => sub.id === route.params.id);
                // 如果没有查询到具体的二级分类就终止
                if (!subCate) return;
                cate.top = {
                    id: top.id,
                    name: top.name,
                };
                cate.sub = {
                    id: subCate.id,
                    name: subCate.name,
                };
            });
            return cate;
        });
        return { category };
    },
};
</script>

<style scoped></style>
