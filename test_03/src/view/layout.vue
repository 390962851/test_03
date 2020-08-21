<template>
  <a-layout class="layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">{{collapsed ? 'LOGO':'项目'}}</div>
      <a-menu theme="dark" @click="saveNavState" mode="inline" :defaultOpenKeys="openKeys"
              :default-selected-keys="selectedKeys">
        <a-menu-item key="数据展示">
          <router-link to="/" tag="div">
            <a-icon type="radar-chart"/>
            <span>数据展示</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="资产管理">
          <span slot="title">
            <a-icon type="money-collect"/>
            <span>资产管理</span>
          </span>
          <a-menu-item key="固定资产">
            <router-link to="/regularAssets">
              固定资产
            </router-link>
          </a-menu-item>
          <a-menu-item key="无形资产">
            <router-link to="/invisibleAssets">
              无形资产
            </router-link>
          </a-menu-item>
          <a-menu-item key="易耗品">
            <router-link to="/consumables">
              易耗品
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="员工管理">
          <span slot="title">
            <a-icon type="user"/>
            <span>员工管理</span>
          </span>
          <a-menu-item key="员工列表">
            <router-link to="/table">
              员工列表
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="业务管理">
         <span slot="title">
           <a-icon type="appstore"/>
            <span>业务管理</span>
          </span>
          <a-menu-item key="/workList">
            <router-link to="/workList">工单管理</router-link>
          </a-menu-item>
          <a-menu-item key="3-2">
            <router-link to="">投诉管理</router-link>
          </a-menu-item>
          <a-menu-item key="3-3">
            <router-link to="">客户列表</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="悄悄话">
          <router-link to="/chats">
            <a-icon type="wechat"/>
            <span>悄悄话</span>
          </router-link>
        </a-menu-item>
        <!--一级菜单-->
        <a-sub-menu v-for="item in menulist" :key="item.authName">
          <span slot="title">
            <a-icon :type="item.icon"/>
            <span>{{item.authName}}</span>
          </span>
          <!--二级菜单-->
          <a-menu-item v-for="subItem in item.children" :key="subItem.authName">
            <router-link :to="'/'+subItem.path">
              {{ subItem.authName }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>

      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- 头部导航栏 -->
      <a-layout-header style="background: #fff; padding: 0;">
        <a-icon class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="() => (collapsed = !collapsed)"/>
        <a-dropdown style="margin-right: 30px; float: right">
          <!--导航栏用户头像-->
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <span style="margin-right:24px">
                <a-badge :count="1">
                  <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">{{ username }}</a-avatar>
                  <!--                  <a-avatar style="backgroundColor:#87d068" icon="user"/>-->
                </a-badge>
              <a-icon type="down"/>
              </span>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">
                <a-icon type="edit" theme="twoTone"></a-icon>
                修改密码
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="logout">
                <a-icon type="logout"></a-icon>
                注销登录
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider/>
      </a-layout-header>

      <!--内容-->
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }">

        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
  import {mapState} from 'vuex'
  import Breadcrumb from '@/components/breadcrumb/bread'

  export default {
    inject: ['reload'],
    components: {
      Breadcrumb,
    },
    data() {
      return {
        collapsed: false,
        selectedKeys: [],
        openKeys: [],
        menulist: [],// 左侧菜单数据
      };
    },
    methods: {
      saveNavState(e) {
        window.sessionStorage.setItem('openKeys', e.keyPath[1]);
        window.sessionStorage.setItem('selectedKeys', e.keyPath[0]);
        // console.log(e)
      },
      logout() {
        /*清除cookie*/
        sessionStorage.clear();
        window.location.reload();
        // this.reload();
        this.$router.push('/login');
      }
    },
    computed: {
      ...mapState(['rightList', 'username']),
    },
    created() {
      // console.log("layout=",this.$router.options.routes[0]);
      this.menulist = this.rightList;
      this.openKeys = [window.sessionStorage.getItem('openKeys') === null ?
        this.$route.meta.title : window.sessionStorage.getItem('openKeys')];
      this.selectedKeys = [window.sessionStorage.getItem('selectedKeys') === null ?
       this.$route.meta.title : window.sessionStorage.getItem('selectedKeys')];
      // this.openKeys = [this.$route.meta.title];
      // this.selectedKeys = [this.$route.meta.model];
    }
  };
</script>
<style>
  .layout {
    height: 100vh;
  }

  .logo {
    height: 32px;
    line-height: 32px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    font-family: 楷体;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
</style>
