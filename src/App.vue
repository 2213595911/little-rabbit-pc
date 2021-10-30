<template>
  <div>{{ $store.state.moduleA.username }}</div>
  <div>{{ $store.state.moduleB.username }}</div>

  <div>{{ $store.getters.newUser }}</div>
  <div>{{ $store.getters["moduleB/newUser"] }}</div>
  <button @click="changeUser">修改用户名称</button>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    const store = useStore();
    function changeUser() {
      // store.dispatch("moduleB/update");
      store.commit("moduleB/UPDATE");
    }
    return { changeUser };
  },
};
</script>

<style></style>
