<template>
  <div class="admin-container">
    <h1 class="a-title">Account Setting</h1>
    <div class="setting">
      <div class="info">
        <h2>Staff ID</h2>
        <ul class="info-list">
          <li class="item">
            {{ `${contact.staff_id}` }}
          </li>
        </ul>
      </div>
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
        <h2>Security</h2>
        <button type="button" class="a-btn a-btn-link" @click="handleChangePassword">
          Change Password
        </button>
      </div>
    </div>
    <contact-info-modal ref="contactInfoModal"></contact-info-modal>
    <change-password-modal ref="changePasswordModal"></change-password-modal>
  </div>
</template>
<script>
import storage from 'store'
import pick from 'lodash.pick'
import ChangePasswordModal from '../modules/ChangePasswordModal.vue'
import ContactInfoModal from '../modules/ContactInfoModal.vue'

export default {
  name: 'AccountSetting',
  components: { ChangePasswordModal, ContactInfoModal },
  data() {
    return {
      contact: {
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
      }
    }
  },
  mounted() {
    this.userInfo = storage.get('user-info')
    if (this.userInfo) {
      this.contact = pick(this.userInfo, ['first_name', 'last_name', 'phone', 'email', 'staff_id'])
    }
  },
  methods: {
    handleEditContactInfo() {
      this.$refs.contactInfoModal.visible = true
    },
    handleChangePassword() {
      this.$refs.changePasswordModal.visible = true
    }
  }
}
</script>
<style lang="less" scoped>
.setting {
  display: flex;
  background: #f0f0f0;
  padding: 50px 10px 50px 50px;
  border-radius: 16px;
  width: 100%;
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
