<template>
  <div>
    <a-button type="primary" ghost @click="backHome">返回首页</a-button>
    <a-button type="primary" ghost @click="backPrev">返回上一页({{ second }}s)</a-button>
  </div>
</template>

<script>
export default {
  name: 'backBtnGroup',
  data () {
    return {
      second: 5,
      timer: null
    }
  },
  methods: {
    backHome () {
      this.$router.push('/')
      // this.$router.replace({
      //   name: this.$config.homeName
      // })
    },
    backPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev()
      else this.second--
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
