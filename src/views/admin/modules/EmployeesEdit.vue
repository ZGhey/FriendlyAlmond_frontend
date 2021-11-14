<template>
  <div class="">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" style="width:620px">
      <a-form-model-item label="First Name">
        <a-input v-model="form.firstname" />
      </a-form-model-item>
      <a-form-model-item label="Last Name">
        <a-input v-model="form.lastname" />
      </a-form-model-item>
      <a-form-model-item label="Phone">
        <a-input v-model="form.phone" />
      </a-form-model-item>
      <a-form-model-item label="Address">
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
  name: 'EmployeesEdit',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      form: {
        account: '',
        firstname: '',
        lastname: '',
        phone: '',
        address: ''
      }
    }
  },
  created() {
    const data = this.$route.params.data
    this.form = pick(data, ['account', 'firstname', 'lastname', 'phone', 'address'])
  },
  methods: {
    saveJob() {
      postAction('/job/update-staff', this.form).then(res => {
        if (res.success) {
          this.$message.success(res.message)
          this.$router.push({ name: 'employees-list' })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
