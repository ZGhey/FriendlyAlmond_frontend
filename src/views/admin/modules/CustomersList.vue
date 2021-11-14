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
    title: 'Customer ID',
    dataIndex: 'Uid'
  },
  {
    title: 'First Name',
    dataIndex: 'first_name'
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name'
  },
  {
    title: 'Phone',
    dataIndex: 'phone'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

export default {
  name: 'CustomersList',
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
      getAction('/job/query-user').then(res => {
        if (res.success) {
          this.data = res.data || []
        }
      })
    },
    handleEdit(record) {
      console.log(record)
      this.$router.push({ name: 'customers-edit', params: { data: record } })
    }
  }
}
</script>
