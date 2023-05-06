<template>
  <div class="userSearch">
    <div class="top">
      <el-form :model="formData" ref="formRef">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入查询的用户名"
              /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="realname">
              <el-input
                v-model="formData.realname"
                placeholder="请输入查询的真实姓名"
              /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="电话号码" prop="cellphone">
              <el-input
                v-model="formData.cellphone"
                placeholder="请输入查询的电话号码"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top: 20px">
          <el-col :span="8" style="margin-left: 16px">
            <el-form-item label="状态" prop="enable">
              <el-select
                placeholder="请选择查询的状态"
                style="width: 94%"
                v-model="formData.enable"
              >
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select> </el-form-item
          ></el-col>

          <el-col :span="8" style="margin-left: -16px">
            <el-form-item label="创建时间" prop="createAt"
              ><el-date-picker
                style="width: 100%"
                range-separator="-"
                start-placeholder="Start date"
                end-placeholder="End date"
                v-model="formData.createAt" /></el-form-item
          ></el-col>
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
import { reactive, ref } from 'vue'
import { defineEmits } from 'vue'
const formData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
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
