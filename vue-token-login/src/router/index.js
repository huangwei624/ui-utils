import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Registe from '../components/Registe.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 默认路由
    path: '/',
    name: 'default',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registe',
    name: 'Registe',
    component: Registe
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
