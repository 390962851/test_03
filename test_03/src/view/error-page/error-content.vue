<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code" class="img">
      <div class="text-con">
        <h4 class="h4">{{ code }}</h4>
        <h5 class="h5">{{ desc }}</h5>
      </div>
      <back-btn-group class="back-btn-group"></back-btn-group>
    </div>
  </div>
</template>

<script>
import backBtnGroup from './back-btn-group.vue'
export default {
  name: 'error_content',
  components: {
    backBtnGroup
  },
  props: {
    code: String,
    desc: String,
    src: String
  }
}
</script>
<style>
  @import "error.less";
</style>
