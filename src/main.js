import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import myBread from '@/components/custom/myBread.vue'
import moment from 'moment'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

const Axios=axios.create({
  baseURL:'http://127.0.0.1:8888/api/private/v1/',
  withCredentials:true
})
Axios.interceptors.request.use(config=>{
  console.log('进入拦截器');
  if(config.method=='post'){
    config.data=qs.stringify(config.data)
    // console.log(config.data)
  }
  if(localStorage.getItem("token")){
    // console.log(localStorage.getItem('token'))
    config.headers.common['Authorization']=localStorage.getItem("token");
  }
  if(sessionStorage.getItem("token")){
    config.headers.token=sessionStorage.getItem("token");
  }
  return config
},
  error=>{
    console.log("===发送请求拦截器报错===")
    console.log(error);
    console.log("===end===");
    Promise.reject(error);
})
Axios.interceptors.response.use(
  res=>{
    console.log("触发响应拦截器...")
    // console.log(res)
    if(res.data.meta.status==403){
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      store.commit("setIslogin",false);
      store.commit("setUname","");
    }else if(res.data.meta.status==401){
      store.commit("setIslogin",false);
      store.commit("setUname","");
      alert(res.data.meta.msg+" 请先登录 !");
    }else if(res.data.data){
      if(res.data.data.token){
      console.log('token拿到了')
      store.commit("setUname",res.data.data.username);
      store.commit("setIslogin",true);
      // if(res.data.remember){
      localStorage.setItem("token",res.data.data.token);
      // }else{
      //   sessionStorage.setItem("token",res.data.token);
      // }
      }
    }
    return res;
  },
  error=>{
    
  }
)

Vue.filter('setLevel',val=>{
  let level='';
  if(val==0) level='一级';
  else if(val==1) level='二级'
  else if(val==2) level='三级'
  return level
});
Vue.filter('date',(val)=>{
  return moment(val).format("YYYY-MM-DD,HH:mm:ss")
})
Vue.prototype.axios=Axios;
Vue.use(ElementUi)
Vue.config.productionTip = false

Vue.component('my-bread',myBread)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
