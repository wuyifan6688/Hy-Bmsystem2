<template>
  <div class="userSearch">
    <div class="top">
      <el-form :model="formData" ref="formRef">
        <el-row :gutter="30">
          <template
            v-for="item in props.searchConfig!.formItems"
            :key="item.prop"
          >
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <template v-if="item.type == 'input'">
                  <el-input
                    v-model="formData[item.prop]"
                    :placeholder="item.placeholder"
                /></template>
                <template v-if="item.type == 'custom'" #default="scope">
                  <slot :name="item.slotName" v-bind="scope"></slot>
                </template>
                <template v-if="item.type == 'date-picker'">
                  <el-date-picker
                    v-model="formData[item.prop]"
                    type="date"
                    :placeholder="item.label"
                    style="width: 100%"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>

        <div class="button">
          <el-button @click="disapper">
            <template #icon>
              <el-icon><Search /></el-icon>
            </template>
            重置</el-button
          >

          <el-button type="primary" @click="search"
            ><el-icon><Search /></el-icon>查询</el-button
          >
        </div></el-form
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { initial } from 'lodash'
import { reactive, ref } from 'vue'
import { defineEmits, defineProps } from 'vue'

//top
const emit = defineEmits(['queryClick', 'resetClick'])
function search() {
  emit('queryClick', formData)
}
const formRef = ref()
function disapper() {
  formRef.value.resetFields()
  emit('resetClick')
}

//高度封装
interface Iprops {
  searchConfig: {
    labelWidth?: string
    formItems: any[]
  }
}
const props = defineProps<Iprops>()
let initData: any = {}
for (let i of props.searchConfig.formItems) {
  initData[i.prop] = i.initialValue ?? ''
}
const formData = reactive(initData)
</script>

<style lang="less" scoped>
.userSearch {
  .top {
    background-color: #fff;
    padding: 15px;
    border-radius: 10px;
    padding-top: 30px;
    .button {
      display: flex;
      justify-content: flex-end;
      .el-icon {
        margin-right: 4px;
      }
    }
  }
}
</style>
