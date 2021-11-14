<template>
  <div class="">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" style="width:620px">
      <a-form-model-item label="First Name">
        <a-input v-model="form.first_name" />
      </a-form-model-item>
      <a-form-model-item label="Last Name">
        <a-input v-model="form.last_name" />
      </a-form-model-item>
      <a-form-model-item label="Phone">
        <a-input v-model="form.phone" />
      </a-form-model-item>
      <a-form-model-item label="Email">
        <a-input v-model="form.email" />
      </a-form-model-item>
      <a-form-model-item label="Shipping Address">
        <a-input v-model="form.address" type="textarea" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 6 }" style="margin-top: 30px;">
        <a-button type="primary" @click="saveJob" class="a-btn a-btn-primary a-btn-block">
          SAVE
        </a-button>
        <a-button style="margin-top: 30px;" @click="cancel" class="a-btn a-btn-default a-btn-block">
          CANCEL
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import pick from 'lodash.pick'
import { postAction } from '@/api/manage'
export default {
  name: 'CustomersEdit',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      form: {
        uid: '',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  },
  created() {
    const data = this.$route.params.data
    this.form = pick(data, ['first_name', 'last_name', 'phone', 'email', 'address'])
    this.form.uid = data.Uid
  },
  methods: {
    saveJob() {
      postAction('/login/update', this.form).then(res => {
        if (res.success) {
          this.$message.success(res.message)
          this.$router.push({ name: 'customers-list' })
        } else {
          this.$message.error('Email maybe exist!Please Input a new Email')
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
