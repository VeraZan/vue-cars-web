//api
import { Register,Login,Forget } from "@/api/account";
//cookies
import { setToken,setUsername,removeToken,removeUsername,getToken,getUsername } from "@/utils/cookiesCars"; 

const state = {
  token:"" || getToken(),
  username:"" || getUsername()
}
const mutations = {
  SET_TOKEN(state,value){
    state.token = value;
  },
  SET_USERNAME(state,value){
    state.username = value;
  }
}
const actions = {
  registerAction(context,requestData){
    return new Promise((resolve,reject) => {
      Register(requestData).then(response => {             
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  },
  loginAction(context,requestData){
    return new Promise((resolve,reject) => {
      Login(requestData).then(response => {   
        const data = response.data;
        context.commit("SET_TOKEN",data.token);
        context.commit("SET_USERNAME",data.username);
        setToken(data.token);
        setUsername(data.username);
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  },
  logoutAction(context){
    return new Promise((resolve,reject) => {
      context.commit("SET_TOKEN","");
      context.commit("SET_USERNAME","");
      removeToken();
      removeUsername();
      resolve();
    })
  },
  forgetAction(context,requestData){
    return new Promise((resolve,reject) => {
      Forget(requestData).then(response => {             
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
};