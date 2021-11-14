<template>
  <div class="container sign-in">
    <h1>Sign In</h1>
    <form style="width:320px;margin:0 auto">
      <div class="form-item">
        <label for="email">Email or User ID</label>
        <div class="form-item-wrapper">
          <input name="email " v-model="form.email" />
        </div>
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <div class="form-item-wrapper">
          <input name="password" v-model="form.password" type="password" autocomplete="new-password" />
        </div>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <div class="form-item" style="flex-basis: 60%;">
          <label for="captcha">Captcha</label>
          <div class="form-item-wrapper">
            <input name="captcha" v-model="form.captcha.answer" type="text" />
          </div>
        </div>
        <div class="form-item" style="flex-basis: 38%;">
          <img :src="captchaImg" alt="" srcset="" class="getCaptcha" @click="getCaptcha" />
        </div>
      </div>
      <div class="form-item">
        <button class="a-btn a-btn-primary a-btn-block" @click="signIn">SIGN IN</button>
        <button class="a-btn  a-btn-block" style="margin-top:20px" @click="cancel">CANCEL</button>
      </div>
      <img src="../assets/3rd.jpg" alt="" srcset="" />
      <div class="form-item ">
        <div class="title">OR</div>
        <button class="a-btn a-btn-danger a-btn-block" @click="goToCreateAcc">CREATE ACCOUNT</button>
      </div>
    </form>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import storage from 'store'
import { getAction, postAction } from '@/api/manage'
export default {
  name: 'SignIn',
  data() {
    return {
      form: {
        email: '',
        password: '',
        captcha: {
          answer: '',
          id: '',
          image: ''
        }
      },
      captchaImg: ''
    }
  },
  created() {
    localStorage.removeItem('access-token')
    this.getCaptcha()
  },
  methods: {
    signIn(e) {
      e.preventDefault()
      if (!this.form.email) {
        this.$message.info('Please input your email!')
        return
      }
      if (!this.form.password) {
        this.$message.info('Please input your password!')
        return
      }
      postAction('/login/login', this.form).then(res => {
        if (res.success) {
          const t = uuidv4()
          storage.set('access-token', t)
          storage.set('user-info', res.data)
          const fullName = `${res.data.first_name} ${res.data.last_name}`
          this.$store.commit('setToken', t)
          this.$store.commit('setFullName', fullName)
          this.$router.push({ path: '/' })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cancel(e) {
      e.preventDefault()
      this.$router.go(-1)
    },
    goToCreateAcc(e) {
      e.preventDefault()
      this.$router.push({ path: '/create-account' })
    },
    getCaptcha(e) {
      if (e) {
        e.preventDefault()
      }
      getAction('/login/get-captcha').then(res => {
        this.form.captcha.id = res.data.id
        this.captchaImg = res.data.image
      })
    }
  }
}
</script>
<style lang="less" scoped>
.sign-in {
  margin-top: 60px;
  text-align: center;
  h1 {
    font-weight: bold;
  }
}
</style>
