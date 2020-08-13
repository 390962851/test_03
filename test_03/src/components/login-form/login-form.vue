K<template>
  <a-form-model :model="form" @submit="handleSubmit">
    <a-form-model-item>
      <a-input v-model="form.userName" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-input v-model="form.userPassword" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" block html-type="submit" :disabled="form.userName === '' || form.password === ''">
        登录
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
  import {
    mapMutations
  } from "vuex";
  export default {
    name: "LoginForm",
    props: {
      userNameRules: {
        type: Array,
        default: () => {
          return [{
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          }];
        }
      },
      passwordRules: {
        type: Array,
        default: () => {
          return [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }];
        }
      }
    },
    data() {
      return {
        userToken: '',
        form: {
          userName: "zhangsan",
          userPhone: "18888899999",
          userPassword: "123456"
        }
      };
    },
    computed: {
      rules() {
        return {
          userName: this.userNameRules,
          userPhone: this.userNameRules,
          userPassword: this.passwordRules
        };
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      /* 进行用户登录信息简单验证*/
      handleSubmit(e) {
        this.$axios({
          method: 'post',
          // url: '/user/dept/'+this.form.userName,
          url: '/user/login',
          data: this.form,
        }).then(res => {
          // console.log("url", res.data)
          if ("error" === res.data) {
            this.$message.warning('请输入正确用户名密码！');
          } else {
            this.userToken = res.data.token;
            //// 将用户token保存到vuex中
            this.changeLogin({
              Authorization: this.userToken
            })
            this.$message.success('登录成功！', 1, (
              this.$router.push('/')
            ));
          }
        });
      },
    },
    created() {

    }
  };
</script>
<style>

</style>
