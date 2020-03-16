import Vue from 'vue'
import axios from 'axios'

import vue from "../main.js"


// 将 axios 设置为Vue原型
Vue.prototype.$http=axios

// 请求携带cookie，保证sessionn 一致性
axios.defaults.withCredentials = true


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    // 请求拦截
    config => {
      if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token');
      }
      return config;
    },
    // 请求发生错误
    error => {
      return Promise.reject(error);
});
  

// axios response 拦截器
axios.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        if (response.data.status == 100) {
        localStorage.setItem("token", "")
        // window.location.href = "/"
        vue.$alert('登录信息超时，请重新登录！', '登录超时', {
            confirmButtonText: '返回登录页面',
            callback: action => {
                vue.$router.push("/").catch(error => {error})
            }
        });
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
})
  