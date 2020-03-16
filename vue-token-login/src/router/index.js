import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'

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
    component: () => import('../components/Registe.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../components/Index.vue')
  },
]

const router = new VueRouter({
  routes
})

// 配置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path=="/registe") {
    next();
  } else {
    var token = localStorage.getItem('token');
    if (token == null || token == '') {
      next("/login");
    } else {
      next();
    }
  }
});

export default router
