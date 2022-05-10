<template>
  <component :is="menuComponent" v-if="!routerInfo.meta.hidden" :router-info="routerInfo">
    <template v-if="routerInfo.children&&routerInfo.children.length">
      <AsideComponent v-for="item in routerInfo.children" :key="item.meta.title" :router-info="item" />
    </template>
  </component>
</template>

<script>
import MenuItem from './menuItem'
import AsyncSubmenu from './asyncSubmenu'

export default {
  name: 'AsideComponent',
  components: {
    MenuItem,
    AsyncSubmenu
  },
  props: {
    routerInfo: {
      default: function() {
        return null
      },
      type: Object
    }
  },
  computed: {
    menuComponent() {
      if (this.routerInfo.children && this.routerInfo.children.filter(item => !item.hidden).length) {
        return 'AsyncSubmenu'
      } else {
        return 'MenuItem'
      }
    }
  }
}
</script>
