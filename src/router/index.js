import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/components/Login/Login.vue'
import Users from '@/components/Users/Users.vue'
import Rights from '@/components/Rights/Rights.vue'
import SetRole from '@/components/Rights/SetRole'
import Goods from '@/components/goods/goods'
import GoodsAdd from '@/components/goods/goodsAdd'
import Categories from '@/components/goods/categories'
import Params from '@/components/goods/params'
import Orders from '@/components/orders/orders'
import Reports from '@/components/reports/reports'
import { Message } from 'element-ui'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {name:"users",path:'/users',component:Users},
      {name:"rights",path:'/rights',component:Rights},
      {name:"roles",path:'/roles',component:SetRole},
      {name:"goods",path:'/goods',component:Goods},
      {name:"goodsadd",path:'/goodsadd',component:GoodsAdd},
      {name:"params",path:'/params',component:Params},
      {name:"categories",path:'/categories',component:Categories},
      {name:"orders",path:'/orders',component:Orders},
      {name:"reports",path:'/reports',component:Reports},
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path=='/login')next();
  else{
    if(localStorage.getItem('token')){
      next()
    }else{
      Message({
        type:'warning',
        message:'回到登录页面'
      })
      router.push('/login')
    }
  };
  next()
})

export default router
