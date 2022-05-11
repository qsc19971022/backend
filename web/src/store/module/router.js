import { asyncRouterHandle } from '@/utils/asyncRouter';
import { getMenuList, getRoleMenuList } from '@/api/menu';
const routerList = []
const formatRouter = (routes) => {
  routes && routes.map(item => {
    if ((!item.children || item.children.every(ch => ch.hidden)) && item.name !== '404') {
      routerList.push({ label: item.meta.title, value: item.name })
    }
    if (item.children && item.children.length > 0) {
      formatRouter(item.children)
    }
  })
}

export const router = {
  namespaced: true,
  state: {
    asyncRouters: [],
    asyncMenus: [],
    routerList: routerList
  },
  mutations: {
    setRouterList(state, routerList) {
      state.routerList = routerList
    },
    // 设置动态路由
    setAsyncRouter(state, asyncRouters) {
      state.asyncRouters = asyncRouters
    },
    setAsyncMenus(state, asyncMenus) {
      state.asyncMenus = asyncMenus
    }
  },
  actions: {
    // 从后台获取动态路由
    async SetAsyncRouter({ commit }) {
      const baseRouter = [{
        path: '/layout',
        name: 'layout',
        component: 'view/layout/index.vue',
        menuName: '底层layout',
        meta: {
          title: '底层layout'
        },
        children: []
      }]
      // const asyncRouterRes = await getMenuList();
      const asyncRouterRes = await getRoleMenuList();
      const asyncMenus = [];
      // console.log(data, 111);
      if (asyncRouterRes.status !== 200) {
        return
      }
      asyncRouterRes.result.menus.map((item, index) => {
        console.log(item.type);
        if (item.type === 2) {
          console.log(item);
          asyncMenus.push(item);
          delete asyncRouterRes.result.menus[index];
        }
      })
      const info = asyncRouterRes.result.menus.reduce((map, node) => {
        return map[node._id] = node, node.children = [], map
      }, {})
      asyncRouterRes.result.menus = asyncRouterRes.result.menus.filter(node => {
        if (info[node.parentId]) {
          info[node.parentId].children.push(node)
        }
        return !node.parentId
      })
      const asyncRouter = asyncRouterRes.result.menus;
      asyncRouter.push({
        path: '404',
        name: '404',
        menuName: '迷路了*。*',
        hidden: true,
        meta: {
          title: '迷路了*。*'
        },
        component: 'view/error/index.vue'
      })
      formatRouter(asyncRouter)
      baseRouter[0].children = asyncRouter
      baseRouter.push({
        path: '*',
        redirect: '/layout/404'
      })
      asyncRouterHandle(baseRouter)
      commit('setAsyncRouter', baseRouter)
      commit('setAsyncMenus', asyncMenus)
      console.log(asyncMenus);
      commit('setRouterList', routerList)
      return true
    }
  },
  getters: {
    // 获取动态路由
    asyncRouters(state) {
      return state.asyncRouters
    },
    asyncMenus(state) {
      return state.asyncMenus
    },
    routerList(state) {
      return state.routerList
    },
    defaultRouter(state) {
      return state.defaultRouter
    }
  }
}
