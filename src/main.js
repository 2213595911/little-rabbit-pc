import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入自己的组件库
import UI from "./components/library";

// 引入重置样式包
import "normalize.css";
// 引入自己的重置样式和共用样式
import "@/assets/styles/common.less";

createApp(App).use(store).use(router).use(UI).mount("#app");
