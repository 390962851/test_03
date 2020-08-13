import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [{
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
    {
      path: '*',
      name: 'error_404',
      meta: {
        title: '错误页面'
      },
      component: () => import('@/view/error-page/404')
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = "Vue_项目-" + to.meta.title
  // console.log("Authorization===", localStorage.getItem('Authorization'));
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === null || token === '') {
      // alert("请先登录");
      // this.$message.warning("请先登录");
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
