import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//高德地图
import "./plugin/aMap";
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 守卫路由
import "./router/permit";
//全局组件
import "@c/back/index";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
