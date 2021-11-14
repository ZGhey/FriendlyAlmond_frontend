<template>
  <a-modal v-model="visible" :width="440" title="Edit your shipping address" :footer="null" @cancel="cancel">
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
        <label for="street_address">Address</label>
        <div class="form-item-wrapper">
          <input name="street_address" v-model="form.address" type="text" />
        </div>
      </div>
      <!-- <div class="form-item">
        <label for="suburb">Suburb</label>
        <div class="form-item-wrapper">
          <input name="suburb" v-model="form.suburb" type="text" />
        </div>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <div class="form-item" style="flex-basis: 38%;">
          <label for="state">State</label>
          <div class="form-item-wrapper">
            <input name="state" v-model="form.state" type="text" />
          </div>
        </div>
        <div class="form-item" style="flex-basis: 59%;">
          <label for="post_code">Post Code</label>
          <div class="form-item-wrapper">
            <input name="post_code" v-model="form.post_code" type="text" />
          </div>
        </div>
      </div>
      <div class="form-item">
        <label for="country_region">Country/Region</label>
        <div class="form-item-wrapper">
          <input name="country_region" v-model="form.country_region" type="text" />
        </div>
      </div> -->
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
  name: 'ShippingAddressModal',
  data() {
    return {
      visible: false,
      form: {
        first_name: '',
        last_name: '',
        address: ''
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        first_name: '',
        last_name: '',
        address: ''
      }
    },
    save() {
      if (!this.form.first_name) {
        this.$message.error('Please input first name!')
        return
      }
      if (!this.form.last_name) {
        this.$message.error('Please input last name!')
        return
      }
      if (!this.form.address) {
        this.$message.error('Please input the address!')
        return
      }
      const data = storage.get('user-info')
      const params = {
        ...this.form,
        uid: data.Uid || ''
      }
      postAction('/login/update', params).then(res => {
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
