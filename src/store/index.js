import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cid:0,
    searchKws:"",
    uname:"",
    islogin:false
  },
  mutations: {
    setUname(state,uname){
      state.uname=uname;
    },
    setIslogin(state,islogin){
      state.islogin=islogin;
    },
    cityAlert:(state,cid)=>{
      state.cid=cid;
      localStorage.setItem('cid',cid);
    },
    search(state,searchKws){
      state.searchKws=searchKws;
    }
  },
  actions: {
  },
  modules: {
  }
})
