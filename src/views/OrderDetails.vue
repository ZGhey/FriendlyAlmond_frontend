<template>
  <div class="container">
    <div class="back">
      <a-icon type="arrow-left" class="b-icon" @click="handleClickLeft" />
    </div>
    <div class="order-info">
      <div class="order">
        <div class="infos">
          <h1 class="o-title">Order Details</h1>
          <ul>
            <li class="detail-item">
              <div class="word">Order Number</div>
              <div class="info">{{ order.order_id }}</div>
            </li>
            <li class="detail-item">
              <div class="word">Customer ID</div>
              <div class="info">{{ order.uid }}</div>
            </li>
            <li class="detail-item">
              <div class="word">Customer Name</div>
              <div class="info">{{ order.user_name }}</div>
            </li>
            <li class="detail-item" v-if="order.phone">
              <div class="word">Phone</div>
              <div class="info">{{ order.phone }}</div>
            </li>
            <li class="detail-item" v-if="order.email">
              <div class="word">Email</div>
              <div class="info">{{ order.email }}</div>
            </li>
            <li class="detail-item">
              <div class="word">Model</div>
              <div class="info">{{ order.boatmodel_name }}</div>
            </li>
            <li class="detail-item">
              <div class="word">Category</div>
              <div class="info">{{ order.category_name }}</div>
            </li>
            <li class="detail-item">
              <div class="word">Colour</div>
              <div class="info">{{ order.color }}</div>
            </li>
            <li class="detail-item">
              <div class="word">Total</div>
              <div class="info">{{ `$${order.total_price || 0}` }}</div>
            </li>
            <li class="detail-item">
              <div class="word">Order Date</div>
              <div class="info">{{ order.order_date | moment('YYYY/MM/DD') }}</div>
            </li>
          </ul>
        </div>
        <div class="options">
          <h1 class="o-title">{{ optionTitle }}</h1>
          <ul>
            <li class="option-item" v-for="(option, index) in order.options" :key="index">{{ option }}</li>
          </ul>
        </div>
      </div>
      <div class="result">
        <img src="../assets/config-model.jpg" style="width:545px;height:343px" alt="" srcset="" />
        <div class="comments" v-if="optionTitle === 'Configuration'">
          <h1 class="o-title">Add Comments</h1>
          <a-textarea placeholder="comments" v-model="commonts" :rows="6" />
          <a-button
            type="primary"
            @click="saveComments"
            class="a-btn a-btn-primary"
            style="width: 170px;margin-top: 30px;float: right;"
          >
            Save
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postAction } from '@/api/manage'
import storage from 'store'
import findIndex from 'lodash.findindex'

export default {
  name: 'OrderDetails',
  data() {
    return {
      optionTitle: 'Your Options',
      orderId: null,
      order: {},
      commonts: ''
    }
  },
  created() {
    const userInfo = storage.get('user-info')
    if (userInfo.Uid) {
      this.optionTitle = 'Your Options'
    } else {
      this.optionTitle = 'Configuration'
    }
    this.orderId = Number(this.$route.params.id)
    this.getOrderDetails(userInfo)
  },
  methods: {
    handleClickLeft() {
      this.$router.go(-1)
    },
    getOrderDetails(userInfo) {
      if (userInfo) {
        postAction('/order/query', { uid: userInfo.Uid || userInfo.staff_id }).then(res => {
          if (res.success) {
            if (res.data.length > 0) {
              const index = findIndex(res.data, o => {
                return o.order_id === this.orderId
              })
              if (index >= 0) {
                this.order = res.data[index]
              }
            }
          }
        })
      }
    },
    saveComments() {
      postAction('/order/add-comment', { order_id: this.orderId, comment: this.comments }).then(res => {
        if (res.success) {
          this.$message.success(res.message)
          this.$router.go(-1)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.back {
  margin-top: 20px;
  height: 40px;
  font-size: 34px;
  text-align: left;
  .b-icon {
    cursor: pointer;
  }
  &:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
    zoom: 1;
  }
}

.order-info {
  margin-top: 20px;
  display: flex;
  .order {
    flex-basis: 45%;
    text-align: left;
    padding-left: 88px;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .infos {
      .detail-item {
        display: flex;
        .word,
        .info {
          font-size: 18px;
          flex-basis: 50%;
        }
      }
    }
    .options {
      margin-top: 40px;
      .option-item {
        font-size: 16px;
        display: block;
        width: 80%;
        line-height: 16px;
        margin-bottom: 10px;
      }
    }
  }
  .result {
    flex-basis: 50%;
  }
}
.comments {
  text-align: left;
  padding-left: 50px;
  margin-top: 40px;
}
</style>
