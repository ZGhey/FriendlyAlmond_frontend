<template>
  <div class="option">
    <a-collapse v-model="activeKey" expandIconPosition="right">
      <a-collapse-panel :key="index.toString()" :header="summary.type" v-for="(summary, index) in summaryData">
        <a-list item-layout="horizontal" :data-source="summary.data">
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="result">
              <p class="ptitle">{{ item.name }}</p>
              <p class="description">{{ item.details }}</p>
              <p class="price">${{ item.price || 0 }}</p>
            </div>
          </a-list-item>
        </a-list>
        <a class="tool" @click="handleEdit(summary.type)" v-if="summary.type != 'Total'">Edit</a>
        <form style="width:320px;margin:30px auto 0 auto" v-else>
          <!-- <div class="form-item">
            <label for="name">Name</label>
            <div class="form-item-wrapper">
              <input name="name " v-model="form.name" />
            </div>
          </div>
          <div class="form-item">
            <label for="email">Email</label>
            <div class="form-item-wrapper">
              <input name="email" v-model="form.email" />
            </div>
          </div> -->
          <div class="form-item">
            <button class="a-btn a-btn-primary a-btn-block" @click="send">PLACE ORDER</button>
            <button class="a-btn  a-btn-block" style="margin-top:20px" @click="cancel">CANCEL</button>
          </div>
        </form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import { postAction } from '@/api/manage'
import storage from 'store'
export default {
  name: 'Summary',
  props: {
    selectedData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      activeKey: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      summaryData: [],
      selectData: {},
      form: {
        email: '',
        name: ''
      }
    }
  },
  mounted() {
    this.processData()
  },
  methods: {
    processData() {
      if (this.selectedData) {
        Object.keys(this.selectedData).forEach(e => {
          const tmp = this.selectedData[e]
          if (e === 'Yacht') {
            this.summaryData.push({
              type: e,
              data: [tmp]
            })
          } else {
            const d = []
            Object.keys(tmp).forEach(v => {
              tmp[v].map(s => {
                d.push(s)
              })
            })
            if (d.length > 0) {
              this.summaryData.push({
                type: e,
                data: d
              })
            }
          }
        })
        let total = 0
        this.summaryData.map(v => {
          if (v.data && v.data.length) {
            v.data.map(s => {
              total += s.price
            })
          }
        })
        this.summaryData.push({
          type: 'Total',
          data: [
            {
              type: 'total',
              price: total.toFixed(2) || 0
            }
          ]
        })
      }
    },
    handleEdit(type) {
      this.$emit('edit', type)
    },
    send(e) {
      e.preventDefault()
      const auth = storage.get('user-info')
      if (!auth || !auth.Uid) {
        this.$message.info('This Needs To Login')
        this.$router.push({ name: 'SignIn', query: { redirect: 'Purchase' } })
        storage.set('summary', this.selectedData)
        return
      }
      const params = {
        boat_name: '',
        boatmodel_name: '',
        category_name: '',
        color: '',
        component_id: [],
        section_id: [],
        total_price: [],
        Uid: auth.Uid
      }
      this.summaryData.map(v => {
        if (v.type === 'Total') {
          params.total_price = Number.parseFloat(v.data[0].price)
        } else {
          if (v.data && v.data.length > 0) {
            v.data.map(s => {
              if (v.type === 'Interior' || v.type === 'Exterior') {
                params.section_id.push(s.id)
              } else if (v.type === 'Yacht') {
                params.boat_name = s.boatName
                params.boatmodel_name = s.boatModelName
                params.category_name = s.name
                params.color = s.color
              } else {
                params.component_id.push(s.id)
              }
            })
          }
        }
      })
      console.log('params:', params)

      postAction('/order/create', params).then(res => {
        if (res.success) {
          this.$message.info(res.message)
          this.$router.push('/my')
          storage.remove('summary')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cancel(e) {
      e.preventDefault()
      this.$emit('router')
    }
  }
}
</script>
