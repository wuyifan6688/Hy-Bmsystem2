<template>
  <div class="dashboard">
    <div class="head" style="margin-bottom: 20px">
      <cardCount></cardCount>
    </div>

    <div class="body">
      <div class="up">
        <el-row :gutter="13">
          <el-col :span="8">
            <echart header="各类商品销售个数"
              ><template #default>
                <pieChart :pie-data="showCount"></pieChart>
              </template> </echart
          ></el-col>
          <el-col :span="8"
            ><echart header="各地销售数量">
              <mapChart :map-data="showAddress"></mapChart> </echart
          ></el-col>
          <el-col :span="8"
            ><echart header="访问来源占比">
              <roseChart :roseData="showSale"></roseChart> </echart
          ></el-col>
        </el-row>
      </div>
      <div class="middle">
        <el-row :gutter="13">
          <el-col :span="12"
            ><echart header="分类收藏统计">
              <barChart v-bind="showSale2"></barChart> </echart
          ></el-col>
          <el-col :span="12"
            ><echart header="分类销量统计">
              <lineChart v-bind="showSale2"></lineChart> </echart
          ></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cardCount from './cpns/cardCount.vue'
import { computed } from 'vue'
import echart from './cpns/echart.vue'
import pieChart from '@/components/pageChart/pieChart.vue'
import mapChart from '@/components/pageChart/mapChart.vue'
import useAnalysisStore from '@/store/main/analysis'
import { storeToRefs } from 'pinia'
import roseChart from '@/components/pageChart/roseChart.vue'
import barChart from '@/components/pageChart/barChart.vue'
import lineChart from '@/components/pageChart/lineChart.vue'

const analysisStore = useAnalysisStore()
const { count, amount, favor, sale, top, address } = storeToRefs(analysisStore)

analysisStore.toGetCount()
analysisStore.toGetAddress()
analysisStore.toGetSale()
const showCount = computed(() => {
  return count.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showAddress = computed(() => {
  return address.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
const showSale = computed(() => {
  return sale.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showFavor = computed(() => {
  const labels = favor.value.map((item) => item.name)
  const values = favor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showSale2 = computed(() => {
  const labels = sale.value.map((item) => item.name)
  const values = sale.value.map((item) => item.goodsCount)
  return { labels, values }
})
</script>

<style lang="less" scoped>
.dashboard {
  .middle {
    margin-top: 30px;
  }
}
</style>
