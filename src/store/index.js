import { createStore } from "vuex";

const moduleA = {
  state: {
    username: "modulea",
  },
  getters: {
    newUser(state) {
      return state.username + "-houdunren.com";
    },
  },
};

const moduleB = {
  namespaced: true,
  state: {
    username: "moduleb",
  },
  getters: {
    newUser(state) {
      return state.username + "-houdunren.com";
    },
  },
  mutations: {
    UPDATE(state) {
      state.username = "后盾人";
    },
  },
  actions: {
    update(context) {
      setTimeout(() => {
        context.commit("UPDATE");
      }, 1000);
    },
  },
};

export default createStore({
  modules: { moduleA, moduleB },
});
// vue2.0中通过new Vuex.store({}) 来创建store管理
// vue3.0中通过createStore({}) 来创建store管理

// export default createStore({
//   state: {
//     userName: "张三",
//   },
//   getters: {
//     newName(state) {
//       return state.userName + "-houdunren.com";
//     },
//   },
//   mutations: {
//     UPDATE(state) {
//       state.userName = "后盾人";
//     },
//   },
//   actions: {
//     update(context) {
//       setTimeout(() => {
//         context.commit("UPDATE");
//       }, 1000);
//     },
//   },
//   modules: {},
// });
