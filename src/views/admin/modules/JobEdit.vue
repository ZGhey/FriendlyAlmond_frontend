<template>
  <div class="container">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" style="width:620px">
      <a-form-model-item label="Order ID">
        <a-input v-model="form.order_id" />
      </a-form-model-item>
      <a-form-model-item label="Staff">
        <a-select v-model="form.staff_id">
          <a-select-option :value="option.staff_id" v-for="option in staffOptions" :key="option.staff_id">
            {{ option.firstname + ' ' + option.lastname }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="Section">
        <a-select v-model="form.section_id">
          <a-select-option :value="option.id" v-for="option in sectionOptions" :key="option.id">
            {{ option.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="Component">
        <a-select v-model="form.component_id">
          <a-select-option :value="option.id" v-for="option in componentOptions" :key="option.id">
            {{ option.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="Start Date">
        <a-date-picker v-model="form.start_date" show-time type="date" placeholder="Pick a date" style="width: 100%;" />
      </a-form-model-item>
      <a-form-model-item label="Due Date">
        <a-date-picker v-model="form.due_date" show-time type="date" placeholder="Pick a date" style="width: 100%;" />
      </a-form-model-item>
      <a-form-model-item label="Description">
        <a-input v-model="form.description" type="textarea" />
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
import { getAction, postAction } from '@/api/manage'
export default {
  name: 'JobEdit',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      form: {
        section_id: '',
        component_id: '',
        order_id: '',
        staff_id: '',
        start_date: '',
        due_date: '',
        description: ''
      },
      componentIds: [],
      sectionIds: [],
      staffOptions: [],
      sectionOptions: [],
      componentOptions: []
    }
  },
  created() {
    // get component_id section_id
    const data = this.$route.params.data
    if (data) {
      this.componentIds = data.component_id
      this.sectionIds = data.section_id
      this.form.order_id = data.order_id
      this.getStaffData()
      this.getComponentData()
      this.getSectionData()
    }
  },
  methods: {
    saveJob() {
      console.log('this.form:', this.form)
      postAction('/job/create-task', this.form).then(res => {
        if (res.success) {
          this.$message.success(res.message)
          this.$router.push({ name: 'jobs-list' })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getStaffData() {
      getAction('/job/query-staff').then(res => {
        if (res.success) {
          this.staffOptions = res.data || []
        }
      })
    },
    getComponentData() {
      if (!this.componentIds || !this.componentIds.length) {
        this.$message.error('The Order does not exist component to assign')
        return
      }
      postAction('/config/query-component-id', { id: this.componentIds }).then(res => {
        if (res.success) {
          this.componentOptions = res.data || []
        }
      })
    },
    getSectionData() {
      if (!this.sectionIds || !this.sectionIds.length) {
        this.$message.error('The Order does not exist section to assign')
        return
      }
      postAction('/config/query-section-id', { id: this.sectionIds }).then(res => {
        if (res.success) {
          this.sectionOptions = res.data || []
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
