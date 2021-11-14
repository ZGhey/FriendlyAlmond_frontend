<template>
  <div class="option">
    <a-collapse v-model="activeKey" expandIconPosition="right">
      <a-collapse-panel :key="index.toString()" :header="option.category_name" v-for="(option, index) in optionData">
        <a-checkbox-group @change="onChange" v-model="selectData[option.category_name]" class="my-checkbox-group">
          <a-list item-layout="horizontal" :data-source="option.data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta>
                <template slot="avatar">
                  <a-checkbox :value="item.id">
                    <div>
                      <p class="ptitle">{{ item.name }}</p>
                      <p class="description">{{ item.details }}</p>
                      <p class="price">${{ item.price || 0 }}</p>
                    </div>
                  </a-checkbox>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-checkbox-group>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import ConfigurationMixins from './ConfigurationMinxins'
export default {
  name: 'Charger',
  mixins: [ConfigurationMixins],
  props: {
    initData: {
      type: Object,
      default: () => null
    }
  }
}
</script>
<style lang="less"></style>
