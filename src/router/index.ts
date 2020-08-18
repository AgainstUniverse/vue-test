import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',  
    name: 'Home',
    component:Home
  },
  {
    path:'/login',
    name:'login',
    component:() => import(/* webpackChunkName:"login" */ '@/views/login.vue')
  },
  {
    path:'/register',
    name:'register',
    component:() => import(/* webpackChunkName:"register" */ '@/views/register.vue')
  },
  {
    path:'/garden/:category',
    name:'garden',
    component:() => import(/* webpackChunkName:"index" */ '@/views/garden.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    path:'*',
    redirect:'/'
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
  mode:'history',
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.requireAuth)){
    if(localStorage.getItem('token')){
      next();
    }else{
      next({path:'/login',query:{redirect:to.fullPath}})
    }
  }
  next()
})

export default router
