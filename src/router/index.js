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
    meta:{
      title:"在线租车"
    },
    children:[
      {
        path: "/user",
        name: "User",
        meta:{
          title:"用户中心"
        },
        component: ()=>import("../views/user")
      },
      {
        path: "/login",
        name: "Login",
        meta:{
          title:"登录"
        },
        component: ()=>import("../views/account/login")
      },
      {
        path: "/register",
        name: "Register",
        meta:{
          title:"注册"
        },
        component: ()=>import("../views/account/register")
      },
      {
        path: "/forget",
        name: "Forget",
        meta:{
          title:"忘记密码"
        },
        component: ()=>import("../views/account/forget")
      },
      {
        path: "/safe",
        name: "Safe",
        meta:{
          title:"安全设置"
        },
        component: ()=>import("../views/safe")
      },
      {
        path: "/password",
        name: "Password",
        meta:{
          title:"修改登录密码"
        },
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
