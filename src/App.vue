<template>
    <div>
        <button @click="fn">测试请求工具</button>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
    name: "App",
    setup() {
        function fn() {
            request("/member/profile", "get", { a: 100 });
        }
        return { fn };
    },
};
</script>

<style></style>
