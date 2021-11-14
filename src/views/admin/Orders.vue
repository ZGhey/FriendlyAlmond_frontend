<template>
  <div class="admin-container">
    <h1 class="a-title">Orders</h1>
    <a-table :columns="columns" :data-source="data" rowKey="order_id" :pagination="false" :scroll="{ y: 700 }">
      <span slot="order_date" slot-scope="text">{{ text | moment('YYYY/MM/DD') }}</span>
      <template slot="order_id" slot-scope="text">
        <a @click="handleOrderClick(text)">{{ text }}</a>
      </template>
    </a-table>
  </div>
</template>
<script>
import { postAction } from '@/api/manage'
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
    title: 'Total($)',
    dataIndex: 'total_price'
  }
]

export default {
  name: 'Orders',
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
      postAction('/order/query').then(res => {
        if (res.success) {
          this.data = res.data || []
        }
      })
    },
    handleOrderClick(id) {
      this.$router.push({ path: `/order-details/${id}` })
    }
  }
}
</script>
