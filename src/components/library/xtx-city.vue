<template>
    <div class="xtx-city" ref="target">
        <div class="select" @click="toggle" :class="{ active: active }">
            <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
            <span v-else class="value">{{ fullLocation }}</span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="option" v-if="active">
            <div class="loading" v-if="loading"></div>
            <span v-else class="ellipsis" @click="changeCity(item)" v-for="item in currList" :key="item.code">{{ item.name }}</span>
        </div>
    </div>
</template>
<script>
import { computed, ref, reactive } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
export default {
    name: "XtxCity",
    props: {
        fullLocation: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        let loading = ref(false);
        const active = ref(false);
        // 存储省市信息
        const currentList = ref([]);
        // 控制显示地址框的逻辑
        function open() {
            active.value = true;
            loading.value = true;
            getData().then((value) => {
                // 默认是省
                currentList.value = value;
                loading.value = false;
            });
            // 每次打开的时候都清空之前的数据，这样的话每次打开都是默认省级
            for (const key in changeResult) {
                changeResult[key] = "";
            }
        }
        function close() {
            active.value = false;
        }

        function toggle() {
            active.value ? close() : open();
        }
        const target = ref(null);
        onClickOutside(target, close);
        // 数据地址 https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
        function getData() {
            return new Promise((resolve) => {
                if (window.cityData) {
                    resolve(window.cityData);
                } else {
                    let url = "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
                    axios.get(url).then((res) => {
                        window.cityData = res.data;
                        resolve(res.data);
                    });
                }
            });
        }
        // 通过计算属性获得我们需要的省或市或区
        const currList = computed(() => {
            // 默认返回的是省
            let list = currentList.value;
            // 处理市的数据
            if (changeResult.provinceCode) {
                list = list.find((item) => item.code === changeResult.provinceCode).areaList;
            }
            // 处理区的数据
            if (changeResult.cityCode) {
                list = list.find((item) => item.code === changeResult.cityCode).areaList;
            }
            return list;
        });
        // 存储选择的地区
        const changeResult = reactive({
            provinceCode: "",
            provinceName: "",
            cityCode: "",
            cityName: "",
            countyCode: "",
            countyName: "",
            fullLocation: "",
        });
        // 当点击对话框中的城市时
        function changeCity(item) {
            // 判断当前点击的是省
            if (item.level === 0) {
                changeResult.provinceCode = item.code;
                changeResult.provinceName = item.name;
            }
            // 判断当前点击的是市
            if (item.level === 1) {
                changeResult.cityCode = item.code;
                changeResult.cityName = item.name;
            }
            // 判断当前点击的是区
            if (item.level === 2) {
                changeResult.countyCode = item.code;
                changeResult.countyName = item.name;
                // 点击的是区最后一级关闭对话框
                close();
                // 拼接要显示的地址
                changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
                // 通知父组件修改数据
                emit("change", changeResult);
            }
        }
        return { active, toggle, close, target, loading, currList, changeCity };
    },
};
</script>
<style scoped lang="less">
.xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;
    .select {
        border: 1px solid #e4e4e4;
        height: 30px;
        padding: 0 5px;
        line-height: 28px;
        cursor: pointer;
        &.active {
            background: #fff;
        }
        .placeholder {
            color: #999;
        }
        .value {
            color: #666;
            font-size: 12px;
        }
        i {
            font-size: 12px;
            margin-left: 5px;
        }
    }
    .option {
        width: 542px;
        border: 1px solid #e4e4e4;
        position: absolute;
        left: 0;
        top: 29px;
        background: #fff;
        min-height: 30px;
        line-height: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        .loading {
            height: 290px;
            width: 100%;
            background: url(../../assets/images/loading.gif) no-repeat center;
        }
        > span {
            width: 130px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 3px;
            &:hover {
                background: #f5f5f5;
            }
        }
    }
}
</style>
