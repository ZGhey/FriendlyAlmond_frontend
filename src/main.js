import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios } from './utils/request'
import {
  Collapse,
  List,
  Checkbox,
  Radio,
  Icon,
  Modal,
  Menu,
  Table,
  FormModel,
  Button,
  Input,
  DatePicker,
  message,
  notification,
  Result,
  Select
} from 'ant-design-vue'
import moment from 'vue-moment'

import 'ant-design-vue/dist/antd.css'
import '@/styles/index.less'
import 'vue2-animate/dist/vue2-animate.min.css'
import './permission' // permission control

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.use(Collapse)
Vue.use(List)
Vue.use(Radio)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Modal)
Vue.use(Menu)
Vue.use(Table)
Vue.use(FormModel)
Vue.use(Button)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Result)
Vue.use(Select)
Vue.use(moment)

Vue.prototype.$message = message

Vue.prototype.$notification = notification

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
