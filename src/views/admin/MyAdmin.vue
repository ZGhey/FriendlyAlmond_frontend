<template>
  <div class="container myAdmin">
    <div class="sidebar">
      <a-menu class="menubar">
        <a-menu-item v-for="(menu, index) in menus" :key="menu.id" :class="{ mgt120: index === 5 }">
          <router-link :to="menu.to">
            <a-icon :type="menu.icon" class="icon" />
            {{ menu.name }}
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div style="width:calc(100% - 256px)">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
const menus = [
  { id: 0, name: 'Dashboard', to: '/dashboard', icon: 'dashboard' },
  { id: 1, name: 'Orders', to: '/orders', icon: 'container' },
  { id: 2, name: 'Tasks', to: '/jobs', icon: 'trademark' },
  { id: 3, name: 'Customers', to: '/customers', icon: 'idcard' },
  { id: 4, name: 'Employees', to: '/employees', icon: 'team' },
  { id: 5, name: 'Account Setting', to: '/account-setting', icon: 'setting' }
]
export default {
  name: 'MyAdmin',
  data() {
    return {
      menus
    }
  }
}
</script>
<style lang="less" scoped>
.myAdmin {
  padding-top: 40px;
  display: flex;
  .sidebar {
    background: #f9f9f9;
    .menubar {
      width: 256px;
      text-align: left;
      padding-left: 20px;
    }
    .mgt120 {
      margin-top: 120px;
    }
  }
  .icon {
    font-size: 18px;
  }
}
</style>
