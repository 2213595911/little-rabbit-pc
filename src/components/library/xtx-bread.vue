<script>
import { h } from "vue";
export default {
    name: "XtxBread",
    render() {
        const items = this.$slots.default();
        const dymanicItems = [];
        items.forEach((item, i) => {
            dymanicItems.push(item);
            // 判断是否是最后一个，如果是的话我们就不需要往最后一个添加i标签
            i == items.length - 1 ? "" : dymanicItems.push(h("div", { class: "iconfont icon-angle-right" }));
        });
        return h("div", { class: "xtx-bread" }, dymanicItems);
    },
};
</script>

<style lang="less">
// 不需要加scoped，因为我们需要让样式在bread-item中生效
.xtx-bread {
    display: flex;
    padding: 25px 10px;
    &-item {
        a {
            color: #666;
            transition: all 0.4s;
            &:hover {
                color: @xtxColor;
            }
        }
    }
    i {
        font-size: 12px;
        margin-left: 5px;
        margin-right: 5px;
        line-height: 22px;
        &:last-of-type {
            display: none;
        }
    }
}
</style>
