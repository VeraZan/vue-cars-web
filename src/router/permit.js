import router from "./index";
import store from "../store";

//守卫路由
router.beforeEach((to,from,next) => {
  if(to.meta && to.meta.title){
    const routerName = to.meta.title;
    document.title = routerName;
    store.commit("router/SET_ROUTER_NAME",routerName);
  }
  next()
})