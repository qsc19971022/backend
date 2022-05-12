// 权限按钮展示指令
import { store } from '@/store'
export const auth = (Vue) => {
  Vue.directive('auth', {
    // 当被绑定的元素插入到 DOM 中时……
    bind: function(el, binding) {
      const menus = store.getters['router/asyncMenus'];
      const menuIds = [];
      menus.map(item => { menuIds.push(item.componentName) })
      const flag = menuIds.some(item => item === binding.value);
      if (!flag) {
        el.style.display = 'none'
      }
    }
  })
}
