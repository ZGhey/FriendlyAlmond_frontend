<template>
  <div class="container">
    <div class="top">
      <div class="description">
        <img src="../assets/words.png" style="width: 200px;" alt="" srcset="" />
        <p>
          At Almond Yachts, we strive for excellence. We’re inspired by nature and the human spirit to explore. In
          nature, the Almond hull and shell protects its payload through the harshest of conditions. Using high-tech
          composite engineering, Almond Yachts are designed to protect, and provide an engaging, hassle free yachting
          experience.
        </p>
        <div class="order" @click="orderNow">
          <div class="text">Oder Now</div>
          <div class="tip">
            <img src="../assets/cc-arrow-right.png" alt="" srcset="" />
          </div>
        </div>
      </div>
      <div class="product">
        <img src="../assets/yacht-01.jpg" alt="" srcset="" />
      </div>
    </div>
    <div class="filter-img">
      <img src="../assets/bt.png" alt="" srcset="" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  methods: {
    orderNow() {
      this.$router.push({ path: 'purchase' })
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  display: flex;
  background: #fffaf3;

  margin-top: 30px;
  .description {
    flex: 3;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    padding: 30px 90px;
    .order {
      cursor: pointer;
      background: #c08d5d;
      width: 160px;
      border: 2px solid #c08d5d;
      display: flex;
      border-radius: 10px;
      margin-top: 60px;
      .text {
        border-radius: 10px;
        font-size: 20px;
        padding: 12px;
        background: #fff;
        width: 110px;
        text-align: center;
      }
      .tip {
        width: 26px;
        margin-left: 10px;
        img {
          margin-top: 12px;
        }
      }
    }
  }
  .product {
    flex: 2;
    border-radius: 4px;
    img {
      border-radius: 22px;
    }
  }
}
.filter-img {
  width: 100%;
  img {
    max-width: 100%;
  }
}
</style>
