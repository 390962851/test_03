const userRule = {path: '/users', meta: {title: '用户管理',model: '用户列表'}, component: () => import('@/view/user/users.vue')};
const roleRule = {path: '/roles', meta: {title: '角色管理',model: '角色列表'}, component: () => import('@/view/role/roles.vue')};
const goodsRule = {path: '/goods_list', meta: {title: '',model: ''}, component: () => import('@/components/goods/GoodsCate.vue')};
const categoryRule = {path: '/goods_categories',  meta: {title: '',model: ''}, component: () => import('@/components/goods/GoodsList.vue')};

const home = {name: '/home', path: '/home', meta: {title: '主页', model: '数据展示'}, component: () => import('@/view/home')}; //主页
const regularAssets = {path: '/regularAssets', name: 'regularAssets', meta: {title: '资产管理',model: '固定资产'}, component: () => import('@/view/assets/regular_assets')}; ///固定资产
const invisibleAssets = {path: '/invisibleAssets', name: 'invisibleAssets', meta: {title: '资产管理',model: '无形资产'}, component: () => import('@/view/assets/invisible_assets')}; ///无形资产
const consumables = {path: '/consumables', name: 'consumables', meta: {title: '资产管理', model: '易耗品'}, component: () => import('@/view/assets/consumables')}; ///易耗品
const table = {path: '/table', name: 'table', meta: {title: '员工管理', model: '员工列表'}, component: () => import('@/view/table')}; ///员工列表
const work_order = {path: '/work_order', name: 'work_order', meta: {title: '业务管理', model: '工单管理'}, component: () => import('@/view/work/workList')}; ///工单管理
const complaint = {path: '/complaint', name: 'complaint', meta: {title: '投诉管理', model: '工单管理'}, component: () => import('@/view/table')};
const client = {path: '/client', name: 'client', meta: {title: '客户列表', model: '工单管理'}, component: () => import('@/view/table')};
const chats = {path: '/chats', name: 'chats', meta: {title: '聊天室', model: '悄悄话'}, component: () => import('@/view/chat/chat_home')}; ///悄悄话


const ruleMappings = {
  'home': home,
  'regularAssets': regularAssets,
  'invisibleAssets': invisibleAssets,
  'consumables': consumables,
  'table': table,
  'work_order': work_order,
  'complaint': complaint,
  'client': client,
  'chats': chats,
  'users': userRule,
  'roles': roleRule,
  'goods_list': goodsRule,
  'goods_categories': categoryRule
};

function f(data) {
  return ruleMappings[data];
}

export {ruleMappings, f};
