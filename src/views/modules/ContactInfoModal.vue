<template>
  <a-modal v-model="visible" :width="440" title="Edit your contact information" :footer="null" @cancel="cancel">
    <form style="width:80%;margin:0 auto">
      <div style="display:flex;justify-content: space-between;">
        <div class="form-item" style="flex-basis: 38%;">
          <label for="first_name">First Name</label>
          <div class="form-item-wrapper">
            <input name="first_name" v-model="form.first_name" type="text" />
          </div>
        </div>
        <div class="form-item" style="flex-basis: 59%;">
          <label for="last_name">Last Name</label>
          <div class="form-item-wrapper">
            <input name="last_name" v-model="form.last_name" type="text" />
          </div>
        </div>
      </div>
      <div class="form-item">
        <label for="email">Email Address</label>
        <div class="form-item-wrapper">
          <input name="email" v-model="form.email" type="text" />
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
      <div class="form-item">
        <a-button class="a-btn a-btn-primary a-btn-block" @click="save">SAVE</a-button>
        <a-button class="a-btn  a-btn-block" style="margin-top:20px" @click="cancel">CANCEL</a-button>
      </div>
    </form>
  </a-modal>
</template>
<script>
import { postAction } from '@/api/manage'
import storage from 'store'
export default {
  name: 'ContactInfoModal',
  data() {
    return {
      visible: false,
      form: {
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        area_code: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        area_code: ''
      }
    },
    save() {
      const data = storage.get('user-info')
      let url = '/login/update'
      if (data.account) {
        url = '/job/update-staff'
      }
      const params = {
        ...this.form,
        uid: data.Uid || data.account || ''
      }
      postAction(url, params).then(res => {
        if (res.success) {
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
