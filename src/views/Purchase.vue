<template>
  <div class="container">
    <ul class="navgation-bar" @click="navigate">
      <transition-group name="backInLeft" tag="ul">
        <template v-for="(imodule, index) in modules">
          <li :key="imodule.id">
            <span class="step" :data-index="index" :class="{ active: active === index }">{{ imodule.text }}</span>
          </li>
        </template>
      </transition-group>
    </ul>
    <div class="configuration">
      <!-- <div class=""></div> -->
      <div class="config-wrapper">
        <transition name="fade">
          <i class="left iconfont icon-toleft pre" :class="{ active: active != 0 }" @click="navigatePrevious"></i>
        </transition>
        <vue-custom-scrollbar class="config">
          <component
            :is="componentId"
            @change="handleConfiChange"
            @edit="handleEdit"
            @router="handleRouter"
            :initData="initData"
            :selectedData="componentData"
          ></component>
        </vue-custom-scrollbar>
        <transition name="fade">
          <i class="right iconfont icon-toright next" :class="{ active: active != 7 }" @click="navigateNext"></i>
        </transition>
        <div class="navigate-btn">
          <a-button type="link" :size="'large'" class="nav left" @click="navigatePrevious">
            Back
          </a-button>
          <a-button type="link" :size="'large'" class="nav right" @click="navigateNext">
            Next
          </a-button>
        </div>
      </div>

      <div class="result">
        <img src="../assets/config-model.jpg" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>
<script>
import ColorConfiguration from '@/views/configuration/ColorConfiguration.vue'
import Motor from '@/views/configuration/Motor.vue'
import Battery from '@/views/configuration/Battery.vue'
import Charger from '@/views/configuration/Charger.vue'
import Rigging from '@/views/configuration/Rigging.vue'
import Exterior from '@/views/configuration/Exterior.vue'
import Interior from '@/views/configuration/Interior.vue'
import Summary from '@/views/configuration/Summary.vue'

import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
import findIndex from 'lodash.findindex'
import storage from 'store'

export default {
  name: 'Purchase',
  components: { ColorConfiguration, Motor, vueCustomScrollbar, Battery, Charger, Rigging, Exterior, Interior, Summary },
  data() {
    return {
      modules: [
        { id: 0, text: 'Yacht', component: ColorConfiguration },
        { id: 1, text: 'Motor', component: Motor },
        { id: 2, text: 'Battery', component: Battery },
        { id: 3, text: 'Charger', component: Charger },
        { id: 4, text: 'Rigging', component: Rigging },
        { id: 5, text: 'Exterior', component: Exterior },
        { id: 6, text: 'Interior', component: Interior },
        { id: 7, text: 'Summary', component: Summary }
      ],
      active: 0,
      componentId: ColorConfiguration,
      componentData: {
        Yacht: {},
        Motor: {},
        Battery: {},
        Charger: {},
        Exterior: {},
        Interior: {}
      },
      initData: null
    }
  },
  created() {
    const summary = storage.get('summary')
    if (summary) {
      this.componentData = summary
    }
  },
  methods: {
    navigate(e) {
      if (e.target.nodeName.toLowerCase() === 'i') {
        const isLeftActiveClick = e.target.getAttribute('class').includes('icon-arrow_left')
        const isRightActiveClick = e.target.getAttribute('class').includes('icon-arrow_right')
        if (isLeftActiveClick) {
          this.active = this.active > 0 ? --this.active : 0
        } else if (isRightActiveClick) {
          this.active = this.active < 7 ? ++this.active : 7
        }
      }
      if (e.target.nodeName.toLowerCase() === 'span') {
        const index = parseInt(e.target.dataset.index)
        this.active = index
      }
      this.componentId = this.modules[this.active].component
      const type = this.modules[this.active].text
      if (this.active < 7) {
        // process the summary data
        this.initData = { type: type, data: this.componentData[type] }
      }
      console.log('this.initData:', this.initData)
    },
    navigatePrevious() {
      if (this.active > 0) {
        this.active -= 1
        // process the summary data
        const type = this.modules[this.active].text
        this.componentId = this.modules[this.active].component
        this.initData = { type: type, data: this.componentData[type] }
      }
    },
    navigateNext() {
      if (this.active < 7) {
        this.active += 1
        // process the summary data
        const type = this.modules[this.active].text
        this.componentId = this.modules[this.active].component
        this.initData = { type: type, data: this.componentData[type] }
      }
    },
    handleConfiChange(e) {
      console.log('e:', e)
      if (this.active < 7) {
        this.componentData[e.type] = e.data
      }
    },
    handleEdit(e) {
      this.active = findIndex(this.modules, function(o) {
        return o.text === e
      })
      this.componentId = this.modules[this.active].component
      this.initData = { type: e, data: this.componentData[e] }
    },
    handleRouter() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  font-size: 24px;
  align-items: center;
  color: #000000;
  &.navgation-bar {
    margin: 38px 0;
  }
  li {
    display: block;
    height: 40px;
    line-height: 40px;
    position: relative;
    .step {
      cursor: pointer;
      padding: 0 40px;
      font-weight: 600;
      &.active {
        color: #c08d5d;
      }
    }
  }
}
.configuration {
  display: flex;
  .config-wrapper {
    position: relative;
    width: 600px;
  }
  .config {
    position: relative;
    // width: 100%;
    margin: 0 60px;
    height: 520px;
    overflow: auto;
  }
  .pre {
    position: absolute;
    top: 200px;
    left: 10px;
    font-size: 48px;
    cursor: pointer;
    z-index: 9;
    color: #b7b7b7;
    &.active {
      color: #000000;
      cursor: pointer;
    }
  }
  .next {
    position: absolute;
    top: 200px;
    right: 10px;
    font-size: 48px;
    cursor: pointer;
    z-index: 9;
    color: #b7b7b7;
    &.active {
      color: #000000;
      cursor: pointer;
    }
  }
  .result {
    flex-basis: 58%;
  }
}
.navigate-btn {
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
  .nav {
    font-size: 30px;
    color: #000;
    &.left {
      float: left;
    }
    &.right {
      float: right;
    }
  }
  &::after {
    display: block;
    content: '';
    zoom: 1;
    clear: both;
    visibility: hidden;
  }
}
</style>
