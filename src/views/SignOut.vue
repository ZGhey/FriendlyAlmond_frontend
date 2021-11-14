<template>
  <div class="container sign-out">
    <h1>Sign Out</h1>
    <form style="width:320px;margin:0 auto">
      <div class="form-item">
        <p>Are you sure to sign out?</p>
        <button class="a-btn a-btn-danger a-btn-block" @click="signOut">SIGN OUT</button>
      </div>
    </form>
  </div>
</template>
<script>
import storage from 'store'

export default {
  name: 'SignOut',
  data() {
    return {}
  },
  methods: {
    signOut(e) {
      e.preventDefault()
      storage.remove('access-token')
      storage.remove('user-info')
      this.$store.commit('setToken', null)
      this.$store.commit('setFullName', null)
      this.$router.push('/')
      window.location.reload()
    }
  }
}
</script>
<style lang="less" scoped>
.sign-out {
  margin-top: 60px;
  text-align: center;
  h1 {
    font-weight: bold;
  }
}
</style>
