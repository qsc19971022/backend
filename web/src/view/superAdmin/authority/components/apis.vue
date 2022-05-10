<template>
  <div>111</div>
</template>

<script>
export default {
  name: 'Apis',
  props: {
    row: {
      default: function() {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      apiTreeData: [],
      apiTreeIds: [],
      needConfirm: false,
      apiDefaultProps: {
        children: 'children',
        label: 'description'
      }
    }
  }
}
</script>
