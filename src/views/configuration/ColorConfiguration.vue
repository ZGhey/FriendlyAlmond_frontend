<template>
  <div class="color-and-model">
    <p class="configure-title">{{ boatModelName }}</p>
    <ul @click="selectYachtModel">
      <li class="model" :class="{ active: curSelect === 0 }" :data-index="0">Lightship $72,000</li>
      <li class="model" :class="{ active: curSelect === 1 }" :data-index="1">Costal Curising $78,000</li>
    </ul>
    <div class="section2">
      <div class="form-item">
        <label for="boatName" style="font-size: 36px;font-weight:600">The Name of Yacht</label>
        <div class="form-item-wrapper">
          <input name="boatName" v-model="boatName" type="text" @change="handleBoatNameChange" />
        </div>
      </div>
    </div>
    <p class="configure-title title2">Colour</p>
    <div class="color-section">
      <ul class="colors" @click="selectYachtColor">
        <li>
          <div class="color black" :class="{ active: curColorSelect === 0 }" :data-index="0"></div>
          <p class="color-name">Black</p>
        </li>
        <li>
          <div class="color puple" :class="{ active: curColorSelect === 1 }" :data-index="1"></div>
          <p class="color-name">Puple</p>
        </li>
        <li>
          <div class="color blue" :class="{ active: curColorSelect === 2 }" :data-index="2"></div>
          <p class="color-name">Blue</p>
        </li>
        <li>
          <div class="color grey" :class="{ active: curColorSelect === 3 }" :data-index="3"></div>
          <p class="color-name">Grey</p>
        </li>
        <li>
          <div class="color yellow" :class="{ active: curColorSelect === 4 }" :data-index="4"></div>
          <p class="color-name">Yellow</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const colors = [
  { id: 0, color: 'Black' },
  { id: 1, color: 'Puple' },
  { id: 2, color: 'Blue' },
  { id: 3, color: 'Grey' },
  { id: 4, color: 'Yellow' }
]
const colorsMap = {
  Black: 0,
  Puple: 1,
  Blue: 2,
  Grey: 3,
  Yellow: 4
}
const models = {
  0: {
    id: 0,
    name: 'Lightship',
    price: 72000
  },
  1: {
    id: 1,
    name: 'Costal Curising',
    price: 78000
  }
}
const modelsMap = {
  Lightship: {
    id: 0,
    name: 'Lightship',
    price: 72000
  },
  'Costal Curising': {
    id: 1,
    name: 'Costal Curising',
    price: 78000
  }
}
export default {
  name: 'ColorConfiguration',
  props: {
    initData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      boatModelName: 'MOCKA',
      boatName: '',
      categotyName: models[0].name,
      color: colors[0].color,
      price: models[0].price,
      id: models[0].id,
      curSelect: 0,
      curColorSelect: 0
    }
  },
  mounted() {
    if (this.initData) {
      this.boatName = this.initData.data.boatName
      this.categotyName = this.initData.data.name
      this.price = this.initData.data.price
      this.color = this.initData.data.color
      if (this.categotyName) {
        this.curSelect = modelsMap[this.categotyName].id
      }
      if (this.color) {
        this.curColorSelect = colorsMap[this.color]
      }
    }
    this.emitMsg()
  },
  methods: {
    selectYachtModel(e) {
      if (e.target.dataset && e.target.dataset.index) {
        this.curSelect = parseInt(e.target.dataset.index)
        const model = models[this.curSelect]
        this.categotyName = model.name
        this.id = model.id
        this.price = model.price
        this.emitMsg()
      }
    },
    selectYachtColor(e) {
      if (e.target.dataset && e.target.dataset.index) {
        this.curColorSelect = parseInt(e.target.dataset.index)
        this.color = colors[this.curColorSelect].color
        this.emitMsg()
      }
    },
    handleBoatNameChange() {
      this.emitMsg()
    },
    emitMsg() {
      this.$emit('change', {
        type: 'Yacht',
        data: {
          name: this.categotyName,
          id: this.id,
          price: this.price,
          details: '',
          boatName: this.boatName,
          color: this.color,
          boatModelName: this.boatModelName
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.color-and-model {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.configure-title {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 20px;
  &.title2 {
    font-size: 40px;
  }
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.model {
  cursor: pointer;
  width: 300px;
  height: 36px;
  line-height: 36px;
  margin: 10px 0;
  background: #f9f9f9;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 500;
  border: 2px solid #f9f9f9;
  &.active {
    border: 2px solid #2653c6;
  }
}
.section2 {
  margin-top: 22px;
  width: 300px;
}
.colors {
  display: flex;
  .color {
    position: relative;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #ffffff;
    margin: 0 17px;
    cursor: pointer;
    &.active {
      border: 1px solid #2161c0;
    }
    &::after {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      content: '';
      zoom: 1;
      background: #ffffff;
    }
    &.black {
      &::after {
        background: #000000;
      }
    }

    &.puple {
      &::after {
        background: #e6e6fa;
      }
    }
    &.blue {
      &::after {
        background: #2161c0;
      }
    }
    &.grey {
      &::after {
        background: #c4c4c4;
      }
    }
    &.yellow {
      &::after {
        background: #f8e21f;
      }
    }
  }
  .color-name {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
