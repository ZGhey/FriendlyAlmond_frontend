<template>
  <div class="container">
    <div class="top">
      <h1 class="h-title">Your Orders</h1>
      <div class="orders">
        <div class="model-img" v-if="hasOrder">
          <img src="../assets/words.png" alt="" srcset="" />
        </div>
        <ul class="order-list-item" v-if="hasOrder">
          <li class="item">
            <span class="word">Order Number</span>
            <span class="number">{{ order.order_id }}</span>
          </li>
          <li class="item">
            <span class="word">Model</span>
            <span class="number">{{ order.boatmodel_name }}</span>
          </li>
          <li class="item">
            <span class="word">Total</span>
            <span class="number">{{ `$${order.total_price || 0}` }}</span>
          </li>
          <li class="item mgt">
            <span class="word"></span>
            <span class="number">
              <button type="button" class="a-btn a-btn-link" @click="scanOrderDetails(order.order_id)">
                Order Details
              </button>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <h1 class="h-title">Account Settings</h1>
      <div class="setting">
        <div class="info">
          <h2>Contact Information</h2>
          <ul class="info-list">
            <li class="item">
              {{ `${contact.first_name} ${contact.last_name}` }}
            </li>
            <li class="item">
              {{ contact.email }}
            </li>
            <li class="item">
              {{ contact.phone }}
            </li>
          </ul>
          <button type="button" class="a-btn a-btn-link" @click="handleEditContactInfo">Edit</button>
        </div>
        <div class="info">
          <h2>Shipping Address</h2>
          <ul class="info-list">
            <li class="item">
              {{ `${shipping.first_name} ${shipping.last_name}` }}
            </li>
            <li class="item">
              {{ shipping.address }}
            </li>
            <!-- <li class="item">
              {{ shipping.city }}
            </li>
            <li class="item">
              {{ shipping.country }}
            </li> -->
          </ul>
          <button type="button" class="a-btn a-btn-link" @click="handleShippingAddress">
            Edit
          </button>
        </div>
        <div class="info">
          <h2>Security</h2>
          <button type="button" class="a-btn a-btn-link" @click="handleChangePassword">
            Change Password
          </button>
        </div>
      </div>
    </div>
    <contact-info-modal ref="contactInfoModal"></contact-info-modal>
    <shipping-address-modal ref="shippingAddressModal"></shipping-address-modal>
    <change-password-modal ref="changePasswordModal"></change-password-modal>
  </div>
</template>
<script>
import ChangePasswordModal from './modules/ChangePasswordModal.vue'
import ContactInfoModal from './modules/ContactInfoModal.vue'
import ShippingAddressModal from './modules/ShippingAddressModal.vue'
import storage from 'store'
import pick from 'lodash.pick'
import { postAction } from '@/api/manage'
export default {
  name: 'My',
  components: { ContactInfoModal, ShippingAddressModal, ChangePasswordModal },
  data() {
    return {
      shippingAddressVisible: false,
      securityVisible: false,
      isNewUser: false,
      contact: {
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
      },
      shipping: {
        first_name: '',
        last_name: '',
        address: ''
      },
      userInfo: null,
      order: {
        order_id: '',
        boatmodel_name: '',
        total_price: ''
      },
      hasOrder: false
    }
  },
  mounted() {
    this.userInfo = storage.get('user-info')
    if (this.userInfo) {
      this.contact = pick(this.userInfo, ['first_name', 'last_name', 'phone', 'email'])
      this.shipping = pick(this.userInfo, ['first_name', 'last_name', 'address'])
      this.getNewOrder()
    }
  },
  methods: {
    scanOrderDetails(orderId) {
      this.$router.push({ path: `/order-details/${orderId}` })
    },
    handleEditContactInfo() {
      this.$refs.contactInfoModal.visible = true
    },
    handleShippingAddress() {
      this.$refs.shippingAddressModal.form = { ...this.shipping }
      this.$refs.shippingAddressModal.visible = true
    },
    handleChangePassword() {
      this.$refs.changePasswordModal.visible = true
    },
    getNewOrder() {
      const params = {
        Uid: this.userInfo.Uid
      }
      postAction('/order/query', params).then(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.hasOrder = true
            this.order = res.data[0]
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.my {
  text-align: left;
  padding-left: 100px;
}
.h-title {
  margin-top: 32px;
  text-align: left;
}
.orders {
  display: flex;
  // background: #f0f0f0;
  padding: 50px 10px 50px 50px;
  border-radius: 16px;
  width: 70%;
  min-height: 280px;
  .model-img {
    width: 240px;
    img {
      border-radius: 16px;
    }
  }
  .order-list-item {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 400px;
    padding: 0 20px;
    border-radius: 16px;
    flex-basis: 75%;
    .item {
      padding: 0 12px;
      font-size: 26px;
      font-weight: 700;
      display: flex;
      &.mgt {
        margin-top: 30px;
      }
      .word {
        flex: 1;
      }
      .number {
        flex: 1;
        margin-left: 20px;
        a {
          text-decoration: none;
        }
      }
    }
  }
}

.setting {
  display: flex;
  // background: #f0f0f0;
  padding: 50px 10px 50px 50px;
  border-radius: 16px;
  width: 70%;
  .info {
    flex: 1;
  }
  .tool {
    margin-top: 30px;
  }
  .info-list {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 20px;
    font-weight: 700;
    .item {
      padding: 4px 0;
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
