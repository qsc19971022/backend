<template>
  <div class="bottom-info">
    <div>
      <span>Powered by</span>
      <span>
        <a href="https://github.com/flipped-aurora/gin-vue-admin">{{ $GIN_VUE_ADMIN.appName }}</a>
      </span>
      <el-divider direction="vertical" />
      <span>Copyright  {{dayjs().format('YYYY')}}</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'BottomInfo',
  data() {
    return {
      dayjs
    }
  }
}
</script>

<style lang="scss">
.bottom-info {
  color: #888;
  height: 30px;
  line-height: 12px;
  a {
    color: #888;
  }
  div {
    display: flex;
    justify-content: center;
    span{
      margin: 0 3px;
    }
  }
}
</style>
