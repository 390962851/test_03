<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <a-icon type="home"/>
      Vue_项目:
    </a-breadcrumb-item>
    <a-breadcrumb-item v-if="$route.meta.title">
      <a href>{{$route.meta.title}}</a>
      <a href="">{{$route.meta.title}}</a>
    </a-breadcrumb-item>
    <a-breadcrumb-item>{{$route.meta.model}}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped>

</style>
