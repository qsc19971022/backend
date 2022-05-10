import Vue from 'vue'
import App from './App.vue'
// 引入gin-vue-admin前端初始化相关内容
import './core/gin-vue-admin'
// 引入封装的router
import router from '@/router/index'
import '@/permission'
import { store } from '@/store'
Vue.config.productionTip = false
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css'
import Request from '../src/utils/request'
import 'default-passive-events'
Vue.prototype.$request = Request
Vue.use(Avue);

import { auth } from '@/directive/auth'
// 按钮权限指令
auth(Vue)

export default new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

