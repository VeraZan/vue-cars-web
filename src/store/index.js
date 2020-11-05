import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import location from "./modules/location";
import app from "./modules/app";
import router from "./modules/router";
export default new Vuex.Store({
  modules:{
    location,
    app,
    router
  }
});
