<template>
  <div class="echart">
    <el-card class="box-card" :header="header">
      <slot></slot>

      <div class="text item"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface prop {
  header?: any
}
withDefaults(defineProps<prop>(), {
  header: '标题'
})
</script>

<style lang="less" scoped>
.echart {
}
</style>
