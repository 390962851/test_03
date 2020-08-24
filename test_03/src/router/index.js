import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import {ruleMappings, f} from './menu/menu'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'

Vue.use(Router);

const error_404 = { path: '*', name: 'error_404',
  meta: {title: '错误页面'},
  component: () => import('@/view/error-page/404')
};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/view/layout'),
      children: [
        {
          name: '',
          path: '',
          meta: {
            title: '主页',
            model: '数据展示'
          },
          component: () => import('@/view/home')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@/view/login/login')
    },
    {
      path: "/401",
      name: "error_401",
      meta: {
        title: '错误页面'
      },
      component: () => import("@/view/error-page/401.vue")
    },
    {
      path: "/500",
      name: "error_500",
      meta: {
        title: '错误页面'
      },
      component: () => import("@/view/error-page/500.vue")
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = "Vue_项目-" + to.meta.title;
  // console.log("router=",router.options.routes[0]);
  let token = sessionStorage.getItem('Authorization');
  if (to.path === '/login') {
    token !== null ? next('/') : next();
  } else {
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export function initDynamicRoutes() {
  //根据二级权限，对路由规则进行动态添加
  const currentRoutes = router.options.routes;
  const rightList = store.state.rightList;
  // console.log("route===currentRoutes===",currentRoutes);
  // console.log("route===right===",rightList);
  rightList.forEach(item => {
    item.children.forEach(item => {
      const itemRule = ruleMappings[item.component];
      // itemRule.perms = item.rights; // 路由下的权限
      // itemRule.meta = item.rights; // 路由下的权限
      currentRoutes[0].children.push(itemRule);
    })
  });
  currentRoutes.push(error_404);
  // router.$addRoutes(currentRoutes);
  router.addRoutes(currentRoutes);//vue原生添加路由函数，会生成警告
}

//在动态添加路由的地方使用this.$router.$addRoutes(params)改函数
router.$addRoutes = (params) => {
  router.matcher = new Router({ model: 'history'}).matcher;
  router.addRoutes(params)
};
export default router;
