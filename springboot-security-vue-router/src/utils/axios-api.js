import vue from '@/main.js'
import axios from 'axios'
import appConfig from '@/assets/config.js'

// 请求携带cookie，保证sessionn 一致性
axios.defaults.withCredentials = true
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 服务器地址
let base_url = appConfig.base_url;

// post 请求
const post = (url, data) => {
    return axios.post(base_url+url, data);
}

// get 请求
const get = (url) => {
    return axios.get(base_url+url);
}


// 请求响应期间设置加载框
var loading = null

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    loading = vue.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return config
  }, function (error) {
    // 请求失败的处理
    return Promise.reject(error)
  })
  
  // 响应拦截（配置请求回来的信息）
  axios.interceptors.response.use(function (response) {
    loading.close();        // 关闭加载框
    return response
  }, function (error) {
    // 处理响应失败
    loading.close();        // 关闭加载框
    return Promise.reject(error)
  })

export {
    post,
    get
}