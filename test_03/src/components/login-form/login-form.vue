<template>
  <a-form-model :model="form" @submit="handleSubmit">
    <a-form-model-item>
      <a-input v-model="form.userName" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-input v-model="form.passWord" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
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
  import {mapMutations} from "vuex";
  import {initDynamicRoutes} from "@/router/index.js";
  import router from "../../router";

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
        form: {
          userName: "admin",
          passWord: "123456"
        },
      };
    },
    computed: {
      rules() {
        return {
          userName: this.userNameRules,
          passWord: this.passwordRules
        };
      },
      // ...mapMutations(['changeLogin','setUsername','setRightList']),
    },
    methods: {
      ...mapMutations(['changeLogin']),
      /*  进行用户登录信息简单验证*/
      handleSubmit() {
        //获取导航栏菜单
        this.$axios({
          method: 'post',
          url: '/sys/login',
          data: this.form,
        }).then(res => {
          if (res.data.code !== 200) {
            this.$message.warning('请输入正确用户名密码！');
          } else {
            // console.log(res.data.result);
            this.$store.commit("setRightList", res.data.result.rights);
            // 将用户token保存到vuex中
            this.changeLogin({
              Authorization: res.data.result.token
            });
            this.$store.commit('setUsername', res.data.result.userInfo.userName);
            //根据用户所具备的权限，动态添加路由规则
            initDynamicRoutes();
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
