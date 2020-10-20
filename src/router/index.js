import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index";

Vue.use(VueRouter);

//以下代码解决路由地址重复的报错 Avoided redundant navigation to current location: "/xxx" 问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children:[
      {
        path: "/user",
        name: "User",
        component: ()=>import("../views/user")
      },
      {
        path: "/safe",
        name: "Safe",
        component: ()=>import("../views/safe")
      },
      {
        path: "/password",
        name: "Password",
        component: () => import("../views/safe/password")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
