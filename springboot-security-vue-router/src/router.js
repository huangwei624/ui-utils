// 路由配置

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/Login.vue'
import Home from '@/Home.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            component: Login,
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/home",
            component: Home
        }
    ]
})