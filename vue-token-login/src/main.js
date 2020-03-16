import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './utils/axiosUtils.js'

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(ElementUI)


// 后台服务器地址
Vue.prototype.baseHttp="http://localhost:80"
Vue.config.productionTip = false




let vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default vue


