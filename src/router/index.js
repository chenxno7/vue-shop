import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/components/Login/Login.vue'
import Users from '@/components/Users/Users.vue'
import Rights from '@/components/Rights/Rights.vue'
import SetRole from '@/components/Rights/SetRole'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {name:"users",path:'/users',component:Users},
      {name:"rights",path:'/rights',component:Rights},
      {name:"setrole",path:'/setrole',component:SetRole}
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

export default router
