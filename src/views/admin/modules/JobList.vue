<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :rowKey="record => record.order_id"
    :pagination="false"
    :scroll="{ y: 700 }"
  >
    <span slot="job_id" slot-scope="text">{{ text }}</span>
    <span slot="order_date" slot-scope="text">{{ text | moment('YYYY/MM/DD') }}</span>
    <span
      slot="operation"
      slot-scope="record"
      class="table-operation"
      style="cursor:pointer"
      @click="handleEdit(record)"
    >
      <a-icon type="plus"></a-icon>
      New Task
    </span>
  </a-table>
</template>
<script>
import { getAction } from '@/api/manage'
const columns = [
  {
    title: 'Order Number',
    dataIndex: 'order_id',
    scopedSlots: { customRender: 'order_id' }
  },
  {
    title: 'Model',
    dataIndex: 'category_name'
  },
  {
    title: 'Colour',
    dataIndex: 'color'
  },
  {
    title: 'Customer',
    dataIndex: 'user_name'
  },
  {
    title: 'Order Date',
    dataIndex: 'order_date',
    scopedSlots: { customRender: 'order_date' }
  },
  {
    title: 'Total',
    dataIndex: 'total_price',
    width: 100
  },
  { title: '', key: 'operation', scopedSlots: { customRender: 'operation' } }
]

export default {
  name: 'Jobs',
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
      getAction('/job/query-order').then(res => {
        if (res.success) {
          this.data = res.data || []
        }
      })
    },
    handleEdit(record) {
      this.$router.push({ name: 'jobs-edit', params: { data: record } })
    }
  }
}
</script>
