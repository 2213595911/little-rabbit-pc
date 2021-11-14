<template>
    <div class="goods-sku" v-if="goods.specs">
        <dl v-for="item in goods.specs" :key="item.id">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="val in item.values" :key="val.id">
                    <img
                        :class="{ selected: val.selected, disabled: val.disabled }"
                        @click="changeSku(item, val)"
                        v-if="val.picture"
                        :src="val.picture"
                        :title="val.name"
                    />
                    <span :class="{ selected: val.selected, disabled: val.disabled }" @click="changeSku(item, val)" v-else>{{ val.name }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>
<script>
import powerSet from "@/vender/power-set";
// 1. 根据后台返回的sku数据得到有效的sku组合
// 2. 根据有效的sku组合得到所有的子集集合（幂集）
// 3. 根据子集集合组成一个路径字典（对象）
const spliter = "★";
// 路径字典
function getPathMap(skus) {
    const pathMap = {};
    skus.forEach((item) => {
        if (item.inventory) {
            const sku = item.specs.map((sku) => sku.valueName);
            // 通过密集算法求出子集集合 ['user',18] => [[],['user'],[18],['user',18]]
            const powerChildren = powerSet(sku);
            // 将数组中的每一个二维数组存储的数据转换为字符串作为路径词典的属性，值是sku组合的id
            powerChildren.forEach((set) => {
                set = set.join(spliter);
                if (pathMap[set]) {
                    pathMap[set].push(item.id);
                } else {
                    pathMap[set] = [item.id];
                }
            });
        }
    });
    return pathMap;
}
// 获取选中的参数数组
function getSelectedArr(specs) {
    const arr = [];
    specs.forEach((item) => {
        const selectVal = item.values.find((val) => val.selected);
        arr.push(selectVal ? selectVal.name : undefined);
    });
    return arr;
}
// 更新按钮的禁用状态
function updatedisabled(specs, pathMap) {
    specs.forEach((item, i) => {
        const selectedVal = getSelectedArr(specs);
        item.values.forEach((value) => {
            // 如果是已经选中的就不需要进行判断
            if (value.selected) return;
            // 没有选中的按照顺序添加到选中数组中
            selectedVal[i] = value.name;
            // 筛选掉undefined
            const key = selectedVal.filter((val) => val).join(spliter);
            // 在路径字典中找不到的就禁用掉
            value.disabled = !pathMap[key];
        });
    });
}
// 默认选中的sku组合
function defaultSelected(goods, skuId) {
    // 找到符合传入id的sku组合
    const sku = goods.skus.find((item) => item.id === skuId);
    // 根据sku组合中的参数遍历数据然后将符合条件的设为选中状态
    if (sku) {
        goods.specs.forEach((val, i) => {
            val.values.find((value) => (value.selected = value.name === sku.specs[i].valueName));
        });
    }
}
export default {
    name: "GoodSku",
    props: {
        goods: {
            type: Object,
            default: () => {},
        },
        skuId: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        // 初始化的时候进行默认选择地址
        if (props.skuId) {
            defaultSelected(props.goods, props.skuId);
        }
        // 获取路径地图导航
        const pathMap = getPathMap(props.goods.skus);
        // 初始化调用
        updatedisabled(props.goods.specs, pathMap);
        function changeSku(item, val) {
            // 如果本身是禁用状态不需要处理
            if (val.disabled) return;
            // 在选择规格之前需要先把对应一行的全部规格selected清空，然后再把点击的修改为true
            if (val.selected) {
                val.selected = false;
            } else {
                item.values.forEach((item) => (item.selected = false));
                val.selected = true;
            }
            updatedisabled(props.goods.specs, pathMap);
            const validSelectedArr = getSelectedArr(props.goods.specs).filter((v) => v);
            if (validSelectedArr.length === props.goods.specs.length) {
                // 根据路径字典获得选中的sku组合id
                const skuIds = pathMap[validSelectedArr.join(spliter)];
                // 从sku组中找到对应的数据
                const sku = props.goods.skus.find((sku) => sku.id === skuIds[0]);
                // 父组件需要的数据是 {skuId,price,oldPrice,inventory,specsText}
                emit("change", {
                    skuId: sku.id,
                    price: sku.price,
                    oldPrice: sku.oldPrice,
                    inventory: sku.inventory,
                    // 需要拼接出一条完整信息的字符串
                    specsText: sku.specs.reduce((p, c) => (p += ` ${c.name}:${c.valueName}`), "").trim(),
                });
            } else {
                emit("change", {});
            }
        }

        return { changeSku };
    },
};
</script>
<style scoped lang="less">
.sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;
    &.selected {
        border-color: @xtxColor;
    }
    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}
.goods-sku {
    padding-left: 10px;
    padding-top: 20px;
    dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;
        dt {
            width: 50px;
            color: #999;
        }
        dd {
            flex: 1;
            color: #666;
            > img {
                width: 50px;
                height: 50px;
                .sku-state-mixin ();
            }
            > span {
                display: inline-block;
                height: 30px;
                line-height: 28px;
                padding: 0 20px;
                .sku-state-mixin ();
            }
        }
    }
}
</style>
