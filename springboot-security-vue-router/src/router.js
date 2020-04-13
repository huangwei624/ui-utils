// 路由配置

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/Login.vue'
import Home from '@/Home.vue'
import Comment from "@/components/learn/Comment.vue"
import Communi from "@/components/learn/Communi.vue"
import Material from "@/components/learn/Material.vue"
import Student from "@/components/user/Student.vue"
import Teacher from "@/components/user/Teacher.vue"
import CommentM from "@/components/info/CommentM.vue"
import DataTable from "@/components/info/DataTable.vue"
import MaterialM from "@/components/info/MaterialM.vue"
import Notify from "@/components/info/Notify.vue"
import Role from "@/components/sys/Role.vue"
import Menu from "@/components/sys/Menu.vue"
import User from "@/components/sys/User.vue"

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
            component: Home,
            redirect: "/learn/comment",
            children: [
                {
                    path: "/learn/comment",
                    component: Comment
                },
                {
                    path: "/learn/communi",
                    component: Communi
                },
                {
                    path: "/learn/material",
                    component: Material
                },
                {
                    path: "/user/teacher",
                    component: Teacher
                },
                {
                    path: "/user/student",
                    component: Student
                },
                {
                    path: "/info/commentM",
                    component: CommentM
                },
                {
                    path: "/info/dataTable",
                    component: DataTable
                },
                {
                    path: "/info/materialM",
                    component: MaterialM
                },
                {
                    path: "/info/notify",
                    component: Notify
                },
                {
                    path: "/sys/role",
                    component: Role
                },
                {
                    path: "/sys/menu",
                    component: Menu
                },
                {
                    path: "/sys/user",
                    component: User
                },
            ]
        },
        
    ]
})