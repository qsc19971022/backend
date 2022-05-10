/*
* gin-vue-admin web框架组
*
* */
import Vue from 'vue'
import './element_lazy' // 按需加载element
import uploader from 'vue-simple-uploader'
// time line css
import '../../node_modules/timeline-vuejs/dist/timeline-vuejs.css'
// 路由守卫
import Bus from '@/utils/bus'
// 加载网站配置文件夹
import config from './config'
Vue.prototype.$GIN_VUE_ADMIN = config
Vue.use(Bus)
Vue.use(uploader)
