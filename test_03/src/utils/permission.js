import Vue from 'vue'
import router from "@/router/index.js";
/**
 * 自定义全局指令-按钮权限显示
 * 在main.js中注册
 */
Vue.directive('permission', {
  inserted(el, bindding) {
    console.log(el);
    console.log(bindding);
    // console.log("permission=",router);
    const action = bindding.value.action; //获取自定义中的权限（add，edit）
    //获取当前路由下用户所具有的权限列表（add,edit）
    const currentRight = router.currentRoute.perms;
    // 判断，当前用户路由所对应的组件中，是否具有按钮权限
    if (currentRight) {
      if (currentRight.indexOf(action) === -1){
        //不具备权限
        const type = bindding.value.effect;
        if(type === 'disabled') {
          el.disabled = true;
        } else {
          el.parentNode.removeChild(el)
        }
      }
    }

  }
});
