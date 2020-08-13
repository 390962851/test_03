<template>
    <div class="login">
      <div class="login-con">
<!--        <a-icon type="login" />-->
        <a-card title="欢迎登录" hoverable :bordered="false" type="inner">
          <login-form></login-form>
        </a-card>
      </div>
    </div>
</template>

<script>
  import LoginForm from "../../components/login-form/login-form";
  // import {mapActions} from "vuex";
    export default {
      name: "Login",
      components: {
        LoginForm
      },
      data(){
        return{
        }
      },
      methods: {
        handleSubmit({userName, password}) {
        //   this.$store.dispatch("login", {
        //     userName: userName,
        //     password: password
        //   }).then(res => {
        //     let last = JSON.stringify(res); // 将JSON对象转化为JSON字符
        //     this.$Notice.success({
        //       title: "登陆成功",
        //       desc: "欢迎" + res.userName,
        //       duration: 2
        //     });
        //     this.$router.push({name: this.$config.homeName});
        //   }).catch(err => this.$Notice.error({
        //     title: "登陆失败",
        //     desc: err.msg,
        //     duration: 2
        //   }));
        }
      }
    }
</script>

<style>
  @import "login.less";
</style>
