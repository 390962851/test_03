<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>
<script>
  import { initDynamicRoutes } from '@/router/index.js'
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    },
    components: {},
    created() {
      initDynamicRoutes();///防止动态路由刷新丢失
    }
  };
</script>
