const state = {
  selfLocation:true
}
const mutations = {
  SELF_LOCATION(){
    state.selfLocation = !state.selfLocation;
  }
}
export default {
  namespaced: true,
  state,
  mutations
};