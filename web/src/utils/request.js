import axios from 'axios' // 引入axios
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import { store } from '@/store'
import context from '@/main'
// import { MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_BASE_PATH + process.env.VUE_APP_BASE_API,
  timeout: 99999
})
let acitveAxios = 0
let timer
const showLoading = () => {
  acitveAxios++
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (acitveAxios > 0) {
      context.$bus.emit('showLoading')
    }
  }, 400)
}

const closeLoading = () => {
  acitveAxios--
  if (acitveAxios <= 0) {
    clearTimeout(timer)
    context.$bus.emit('closeLoading')
  }
}
// http request 拦截器
service.interceptors.request.use(
  config => {
    if (!config.donNotShowLoading) {
      showLoading()
    }
    // const token = store.getters['user/token']
    const token = Cookies.get('token');
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
      token
    }
    return config
  },
  error => {
    closeLoading()
    Message({
      showClose: true,
      message: error,
      type: 'error'
    })
    return error
  }
)

// http response 拦截器
service.interceptors.response.use(
  response => {
    closeLoading()
    if (response.data.status === 200) {
      return response.data
    } else {
      Message({
        showClose: true,
        message: response.data.msg || decodeURI(response.headers.msg),
        type: response.headers.msgtype || 'error'
      })
      if (response.data.status === 505) {
        store.commit('user/LoginOut')
      }
      return response.data.msg ? response.data : response
    }
  },
  error => {
    closeLoading()
    return error
  }
)

export default service
