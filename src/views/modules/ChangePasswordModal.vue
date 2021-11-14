<template>
  <a-modal v-model="visible" :width="440" title="Change password" :footer="null" @cancel="cancel">
    <form style="width:80%;margin:0 auto">
      <div class="form-item">
        <label for="email">Current Password</label>
        <div class="form-item-wrapper">
          <input name="cur_password" v-model="form.cur_password" type="password" />
        </div>
      </div>
      <div class="form-item">
        <label for="new_password">New Password</label>
        <div class="form-item-wrapper">
          <input name="new_password" v-model="form.new_password" type="password" />
        </div>
      </div>
      <div class="form-item">
        <label for="confirm_password">Confirm Password</label>
        <div class="form-item-wrapper">
          <input name="confirm_password" v-model="form.confirm_password" type="password" />
        </div>
      </div>
      <div class="form-item">
        <a-button class="a-btn a-btn-primary a-btn-block" @click="submit">CHANGE PASSWORD</a-button>
        <a-button class="a-btn  a-btn-block" style="margin-top:20px" @click="cancel">CANCEL</a-button>
      </div>
    </form>
  </a-modal>
</template>
<script>
import { postAction } from '@/api/manage'
import storage from 'store'
export default {
  name: 'ChangePasswordModal',
  data() {
    return {
      visible: false,
      form: {
        cur_password: '',
        new_password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        cur_password: '',
        new_password: '',
        confirm_password: ''
      }
    },
    submit() {
      if (!this.form.cur_password) {
        this.$message.error('Please input old password!')
        return
      }
      if (!this.form.new_password) {
        this.$message.error('Please input new password!')
        return
      }
      if (!this.form.confirm_password) {
        this.$message.error('Please confirm the new password!')
        return
      }
      if (this.form.new_password !== this.form.confirm_password) {
        this.$message.error('The new password is not equal to the confirm password!')
        return
      }
      const data = storage.get('user-info')
      let url = '/login/update'
      if (data.account) {
        url = '/job/update-staff'
      }
      const params = {
        pasword: this.form.new_password,
        uid: data.Uid || data.account || ''
      }
      postAction(url, params).then(res => {
        if (res.success) {
          // this.$store.dispatch('Logout')
          this.$message.success(res.message)
          this.visible = false
          localStorage.removeItem('access-token')
          this.$store.commit('setToken', null)
          this.$store.commit('setFullName', null)
          storage.remove('user-info')
          this.$router.push('/signin')
          this.resetForm()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cancel() {
      this.visible = false
      this.resetForm()
    }
  }
}
</script>
