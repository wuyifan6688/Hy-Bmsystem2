<template>
  <div class="barChart">
    <baseChart :option="option"></baseChart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import baseChart from './baseChart.vue'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  labels: string[]
  values: string[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: 'category',
      data: ['上衣', '裤子', '毛衣', '棉袄', '袜子', '裙子']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function (value: any) {
          return value.toLocaleString()
        }
      }
    },
    series: [
      {
        data: [1000, 2000, 3000, 4000, 7000, 5000],
        type: 'bar'
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.barChart {
  width: 300px;
}
</style>
