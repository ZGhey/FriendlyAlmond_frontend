<template>
  <div id="app">
    <header id="nav">
      <div class="inner">
        <div class="logo">
          <a href="/">
            <img alt="yacht mall logo" src="./assets/logo.png" />
          </a>
        </div>
        <div class="menu">
          <router-link to="/">Home</router-link>
          <router-link to="/models">Models</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/contact">Contact Us</router-link>
        </div>
        <div class="account">
          <div class="currency">
            <div class="wrapper">
              <img class="img" alt="currency img" src="./assets/aud.png" />
            </div>
            <span class="symbol">$Aud</span>
          </div>
          <span class="acc" @click="handleAccount">Account</span>
        </div>
      </div>
    </header>
    <div class="user-info" v-if="token">
      <div class="inner">
        <div class="username">
          {{ `Hi,${fullName}!` }}
        </div>
        <div class="sign-out">
          <span @click="signout">Sign out</span>
        </div>
      </div>
    </div>
    <transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">
      <router-view></router-view>
    </transition>
    <footer>
      Copyright © 2021 Almond Yachts Inc. All rights reserved
    </footer>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['token', 'fullName'])
  },
  methods: {
    signout() {
      this.$router.push('/signout')
    },
    handleAccount() {
      this.$router.push('/my')
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  // overflow-x: hidden;
  position: relative;
  height: 100%;
}

#nav {
  text-align: left;
  height: 146px;
  line-height: 146px;
  background: #f9f9f9;
  width: 100%;
  .inner {
    width: 1400px;
    margin: 0 auto;
  }
  .logo {
    width: 240px;
    position: relative;
    float: left;
    img {
      vertical-align: middle;
    }
  }

  .menu {
    font-size: 22px;
    margin-left: 160px;
    float: left;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 20px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #c08d5d;
    }
  }

  .account {
    display: flex;
    float: right;
    font-size: 22px;
    font-weight: 600;
    .currency {
      display: flex;
      .wrapper {
        width: 32px;
        text-align: center;
      }
      .img {
        vertical-align: middle;
      }
      .symbol {
        margin-left: 10px;
      }
    }
    .acc {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
.user-info {
  background: #f9f9f9;
  .inner {
    display: flex;
    width: 1400px;
    margin: 0 auto;
    padding: 0 54px;
  }

  .username {
    flex: 1;
    padding-left: 60px;
    font-size: 32px;
    font-weight: bold;
    text-align: left;
  }
  .sign-out {
    flex: 1;
    font-size: 22px;
    font-weight: bold;
    text-align: right;
    margin-right: 20px;
    cursor: pointer;
  }
}
footer {
  position: relative;
  width: 100%;
  height: 40px;
  left: 0;
  bottom: 0;
  margin-top: 300px;
  font-family: Alata;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  border-top: 1px solid #bdbbbb;
  line-height: 40px;
  color: #000000;
}
</style>
