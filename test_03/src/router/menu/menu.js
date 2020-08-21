import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'



// const userRule = { path: '/users', component: Users };
const userRule = { path: '/users', component: () => import('@/components/user/Users.vue') };
const roleRule = { path: '/roles', component: () => import('@/components/role/Roles.vue') };
const goodsRule = { path: '/goods', component: () => import('@/components/goods/GoodsCate.vue') };
const categoryRule = { path: '/categories', component: () => import('@/components/goods/GoodsList.vue') };


const ruleMappings = {
  'users': userRule,
  'roles': roleRule,
  'goods': goodsRule,
  'categories': categoryRule
};
function f(data) {
  return ruleMappings[data];
}

export {ruleMappings, f};
