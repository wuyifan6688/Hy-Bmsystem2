<template>
  <div class="baseChart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echart from 'echarts'
import { onMounted, ref, defineProps, watchEffect, nextTick } from 'vue'
import type { EChartsOption } from 'echarts'
import ChinaJSON from './data/china.json'

echart.registerMap('china', ChinaJSON as any)

interface prop {
  option: EChartsOption
}
const props = defineProps<prop>()

let echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echart.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  watchEffect(() => echartInstance.setOption(props.option))
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
onMounted(() => {})
</script>

<style lang="less" scoped>
.baseChart {
  .echart {
    width: 380px;
    height: 200px;
  }
}
</style>
