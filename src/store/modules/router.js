const state = {
  routerName: ""
}
const mutations = {
  SET_ROUTER_NAME(state, value){
    state.routerName = value;
  }
}
export default {
  namespaced: true,
  state,
  mutations
};