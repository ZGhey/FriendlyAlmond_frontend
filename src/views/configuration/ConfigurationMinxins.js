import findIndex from 'lodash.findindex'
import { postAction } from '@/api/manage'

const ConfigurationMinxins = {
  data() {
    return {
      optionData: [],
      activeKey: ['0'],
      selectData: {}
    }
  },
  created() {
    this.getOptionData()
  },
  methods: {
    getOptionData() {
      const params = {
        type: this.$options.name
      }
      postAction('/config/query-component', params).then(res => {
        if (res.success) {
          this.optionData = res.data.map(v => {
            this.$set(this.selectData, v.category_name, [])
            return v
          })
          if (this.initData.data) {
            Object.keys(this.selectData).forEach(e => {
              this.selectData[e] = (this.initData.data[e] || []).map(v => v.id)
            })
          }
        }
      })
    },
    handleSelectChange(data) {
      const t = {}
      Object.keys(this.selectData).forEach(e => {
        // find motorData category_name is e
        t[e] = []
        const dataS = this.selectData[e]
        const idx = findIndex(data, function(o) {
          return o.category_name === e
        })
        if (idx >= 0) {
          const rightData = data[idx].data
          // set selected key value to use in summary section
          dataS.map(v => {
            const index = findIndex(rightData, function(o) {
              return o.id === v
            })
            if (index >= 0) {
              t[e].push({
                name: rightData[index].name,
                id: v,
                price: rightData[index].price,
                details: rightData[index].details
              })
            }
          })
        }
      })
      this.$emit('change', { type: this.$options.name, data: t })
    },
    onChange() {
      this.handleSelectChange(this.optionData)
    }
  }
}

export default ConfigurationMinxins
