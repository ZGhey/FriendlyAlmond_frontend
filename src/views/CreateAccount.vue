<template>
  <div class="container create-account">
    <h1>Create Account</h1>
    <form style="width:320px;margin:0 auto">
      <div class="form-item">
        <label for="first_name">First Name</label>
        <div class="form-item-wrapper">
          <input name="first_name" v-model="form.first_name" type="text" />
        </div>
      </div>
      <div class="form-item">
        <label for="last_name">Last Name</label>
        <div class="form-item-wrapper">
          <input name="last_name" v-model="form.last_name" type="text" />
        </div>
      </div>
      <div class="form-item">
        <label for="email">Email Address</label>
        <div class="form-item-wrapper">
          <input name="email" v-model="form.email" type="text" />
        </div>
      </div>
      <div class="form-item">
        <label for="password">Password</label>
        <div class="form-item-wrapper">
          <input name="password" v-model="form.password" type="password" autocomplete="new-password" />
        </div>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <div class="form-item" style="flex-basis: 38%;">
          <label for="area_code">Area Code</label>
          <div class="form-item-wrapper">
            <input name="area_code" v-model="form.area_code" type="text" />
          </div>
        </div>
        <div class="form-item" style="flex-basis: 59%;">
          <label for="phone">Phone Number</label>
          <div class="form-item-wrapper">
            <input name="phone" v-model="form.phone" type="text" />
          </div>
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
        <button class="a-btn a-btn-danger a-btn-block" @click="goToCreateAcc">CREATE ACCOUNT</button>
        <button class="a-btn  a-btn-block" style="margin-top:20px" @click="cancel">CANCEL</button>
      </div>
      <div class="form-item ">
        <div class="title">OR</div>
        <button class="a-btn a-btn-primary a-btn-block" @click="signIn">SIGN IN</button>
      </div>
    </form>
  </div>
</template>
<script>
import { getAction, postAction } from '@/api/manage'
export default {
  name: 'CreateAccount',
  data() {
    return {
      form: {
        area_code: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        phone: '',
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
      this.$router.push({ path: '/signin' })
    },
    cancel(e) {
      e.preventDefault()
      this.$router.go(-1)
    },
    goToCreateAcc(e) {
      e.preventDefault()
      if (!this.form.first_name) {
        this.$message.info('Please input your first name!')
        return
      }
      if (!this.form.last_name) {
        this.$message.info('Please input your last name!')
        return
      }

      if (!this.form.email) {
        this.$message.info('Please input your email!')
        return
      }
      if (!this.form.password) {
        this.$message.info('Please input your password!')
        return
      }
      if (!this.form.area_code) {
        this.$message.info('Please input area code!')
        return
      }
      if (!this.form.phone) {
        this.$message.info('Please input phone number!')
        return
      }
      if (!this.form.captcha) {
        this.$message.info('Please input captcha!')
        return
      }

      postAction('/login/register', this.form).then(res => {
        if (res.success) {
          this.$message.success('registration success!')
          setTimeout(() => {
            this.$router.push({ path: '/signin' })
          }, 1000)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getCaptcha(e) {
      if (e) {
        e.preventDefault()
      }
      getAction('login/get-captcha').then(res => {
        this.form.captcha.id = res.data.id
        this.captchaImg = res.data.image
      })
    }
  }
}
</script>
<style lang="less" scoped>
.create-account {
  margin-top: 60px;
  text-align: center;
  h1 {
    font-weight: bold;
  }
}
</style>
