<template>
  <div class="">
    <a-table :columns="columns" :data-source="data" :pagination="false" :scroll="{ y: 700 }">
      <span slot="operation" slot-scope="record" class="table-operation">
        <a-icon type="edit" @click="handleEdit(record)" />
      </span>
    </a-table>
  </div>
</template>
<script>
import { getAction } from '@/api/manage'
const columns = [
  { title: '', key: 'operation', scopedSlots: { customRender: 'operation' }, width: 40 },
  {
    title: 'Staff ID',
    dataIndex: 'staff_id'
  },
  {
    title: 'First Name',
    dataIndex: 'firstname'
  },
  {
    title: 'Last Name',
    dataIndex: 'lastname'
  },
  {
    title: 'Phone',
    dataIndex: 'phone'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    ellipsis: true
  }
]

export default {
  name: 'Employees',
  data() {
    return {
      data: [],
      columns
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getAction('/job/query-staff').then(res => {
        if (res.success) {
          this.data = res.data || []
        }
      })
    },
    handleEdit(record) {
      console.log(record)
      this.$router.push({ name: 'employees-edit', params: { data: record } })
    }
  }
}
</script>
