<template>
  <div class="admin-container">
    <h1 class="a-title">Dashboard</h1>
    <div class="section-wrapper">
      <div class="section">
        <h2>Recent Orders</h2>
        <ul>
          <li v-for="order in orders" :key="order.order_id">
            {{ `$${order.total_price}  ${order.order_id}  ${order.boatmodel_name}` }}
          </li>
        </ul>
      </div>
      <div class="section">
        <h2>Most Polular</h2>
        <ul>
          <li>
            <span class="word">Colours:</span>
            {{ `${populars.colors}` }}
          </li>
          <li>
            <span class="word">Components:</span>
            {{ `${populars.components}` }}
          </li>
          <li>
            <span class="word">Sections:</span>
            {{ `${populars.sections}` }}
          </li>
        </ul>
      </div>
      <div class="section">
        <h2>Total Sales</h2>
        <ul>
          <li>
            <span class="word">Last 1 month:</span>
            {{ `$${sales.last_one_month || 0}` }}
          </li>
          <li>
            <span class="word">Last 3 month:</span>
            {{ `$${sales.last_three_month || 0}` }}
          </li>
          <li>
            <span class="word">Last 6 month:</span>
            {{ `$${sales.last_six_month || 0}` }}
          </li>
          <li>
            <span class="word">Last 1 year:</span>
            {{ `$${sales.last_one_year || 0}` }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { postAction, getAction } from '@/api/manage'
export default {
  name: 'Dashboard',
  data() {
    return {
      orders: [],
      populars: {
        colors: '',
        components: '',
        sections: ''
      },
      sales: {}
    }
  },
  created() {
    this.getOrders()
    this.getMostPopular()
    this.getTotalSales()
  },
  methods: {
    getOrders() {
      postAction('/order/query').then(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.orders = res.data.slice(0, 5)
          }
        }
      })
    },
    getMostPopular() {
      getAction('/job/most-popular').then(res => {
        if (res.success) {
          this.populars.colors = res.data.colors && res.data.colors[0].color
          this.populars.components = res.data.colors && res.data.components[0].component
          this.populars.sections = res.data.colors && res.data.sections[0].section
        }
      })
    },
    getTotalSales() {
      getAction('/job/total-sales').then(res => {
        if (res.success) {
          this.sales = res.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.section-wrapper {
  display: flex;
  flex-wrap: wrap;
  .section {
    width: 50%;
    min-height: 300px;
    text-align: left;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 16px;
    }
  }
}
.word,
h2 {
  font-weight: 600;
}
</style>
