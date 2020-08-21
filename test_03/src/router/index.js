import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import {ruleMappings, f} from './menu/menu'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'

Vue.use(Router);

// const userRule = { path: '/users', component: Users };
// const roleRule = { path: '/roles', component: Roles };
// const goodsRule = { path: '/goods', component: GoodsList };
// const categoryRule = { path: '/categories', component: GoodsCate };
// const ruleMapping = {
//   'users': userRule,
//   'roles': roleRule,
//   'goods': goodsRule,
//   'categories': categoryRule
// };
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
          name: 'home',
          path: '',
          meta: {
            title: '主页',
            model: '数据展示'
          },
          component: () => import('@/view/home')
        },
        {
          path: 'regularAssets',
          name: 'regularAssets',
          meta: {
            title: '资产管理',
            model: '固定资产'
          },
          component: () => import('@/view/regular_assets')
        },
        {
          path: 'invisibleAssets',
          name: 'invisibleAssets',
          meta: {
            title: '资产管理',
            model: '无形资产'
          },
          component: () => import('@/view/invisible_assets')
        },
        {
          path: 'consumables',
          name: 'consumables',
          meta: {
            title: '资产管理',
            model: '易耗品'
          },
          component: () => import('@/view/consumables')
        },
        {
          path: 'table',
          name: 'table',
          meta: {
            title: '员工管理',
            model: '员工列表'
          },
          component: () => import('@/view/table')
        },
        {
          path: 'workList',
          name: 'workList',
          meta: {
            title: '业务管理',
            model: '工单管理'
          },
          component: () => import('@/view/work/workList')
        },
        {
          path: 'chats',
          name: 'chats',
          meta: {
            title: '聊天室',
            model: '悄悄话'
          },
          component: () => import('@/view/chat/chat_home')
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
    // {
    //   path: '*',
    //   name: 'error_404',
    //   meta: {
    //     title: '错误页面'
    //   },
    //   component: () => import('@/view/error-page/404')
    // },
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
  // console.log("route===right===",rightList);
  rightList.forEach(item => {
    item.children.forEach(item => {
      const itemRule = ruleMappings[item.path];
      itemRule.perms = item.rights; // 路由下的权限
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
