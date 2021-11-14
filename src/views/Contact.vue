<template>
  <div class="container">
    <div class="contact">
      <p class="page-title">Contact</p>
      <div class="line"></div>
      <div class="flex-wrapper">
        <div class="left">
          <p class="form-title">Submit a question or comment</p>
          <form style="width:620px;">
            <div class="flex-form-item">
              <div class="form-item" style="flex-basis: 46%;">
                <label for="firstname">First Name</label>
                <div class="form-item-wrapper">
                  <input name="firstname" v-model="firstname" type="text" />
                </div>
              </div>
              <div class="form-item" style="flex-basis: 46%;">
                <label for="lastname">Last Name</label>
                <div class="form-item-wrapper">
                  <input name="lastname" v-model="lastname" type="text" />
                </div>
              </div>
            </div>
            <div class="flex-form-item">
              <div class="form-item" style="flex-basis: 46%;">
                <label for="phone">Phone</label>
                <div class="form-item-wrapper">
                  <input name="phone" v-model="phonenumber" type="text" />
                </div>
              </div>
              <div class="form-item" style="flex-basis: 46%;">
                <label for="email">Email</label>
                <div class="form-item-wrapper">
                  <input name="email" v-model="email" type="text" />
                </div>
              </div>
            </div>
            <div class="form-item">
              <label for="question">Question or Comment</label>
              <div class="form-item-wrapper textarea">
                <input name="question" v-model="question" type="textarea" />
              </div>
            </div>
            <div class="form-item" style="text-align:center">
              <button class="a-btn a-btn-primary" style="width:300px" @click="Submit">SUMBIT</button>
            </div>
          </form>
        </div>
        <div class="right">
          <p class="form-title">Send us an email</p>
          <p class="email-info">info@almond.yachts</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      firstname: '',
      lastname: '',
      phonenumber: '',
      question: '',
      email: ''
    }
  },
  methods: {
    Submit() {}
  }
}
</script>
<style lang="less" scoped>
.contact {
  margin-top: 30px;
  padding: 0 30px;
  text-align: left;
  position: relative;
  color: #000000;
}
.page-title {
  font-size: 48px;
  line-height: 66px;
  font-weight: 500;
}
.form-title {
  font-size: 36px;
}
.email-info {
  font-size: 48px;
  margin-top: 148px;
}
.line {
  position: absolute;
  width: 100%;
  height: 0px;
  left: 0;
  top: 70px;
  border: 1px solid #000000;
  transform: rotate(0deg);
}
.flex-wrapper {
  display: flex;
  .left {
    flex-basis: 60%;
  }
  .right {
    flex-basis: 30%;
  }
}
</style>
