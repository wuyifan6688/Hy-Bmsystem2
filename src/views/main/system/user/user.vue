<template>
  <div class="user">
    <userForm ref="son" @newMust="tryNew"></userForm>
    <!-- 放在button里面会有点击确定又打开的效果,估计是事件浮动 -->
    <userSearch @queryClick="searchClick" @resetClick="resetClick"></userSearch>
    <userContent
      @toHandleCreate="createUser"
      @toChangeUser="changeUser"
      ref="contentRef"
    ></userContent>
  </div>
</template>

<script setup lang="ts">
import userSearch from './cpns/userSearch.vue'
import userContent from './cpns/userContent.vue'
import { reactive, ref, computed } from 'vue'
import useUserStore from '@/store/main/system'
import dayFormat from '@/utils/dayformat'
import userForm from '@/views/main/system/user/cpns/userForm.vue'

const contentRef = ref<InstanceType<typeof userContent>>()
function searchClick(formData: any) {
  contentRef.value?.searchUser(formData)
}
function resetClick() {
  contentRef.value?.searchUser()
}

const son = ref<InstanceType<typeof userForm>>()
function createUser() {
  son.value?.create(false)
}

function tryNew() {
  contentRef.value?.searchUser()
}

function changeUser(messege: any) {
  son.value?.create(true, messege)
}
</script>

<style lang="less" scoped>
.user {
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
  .body {
    margin-top: 20px;
    background-color: #fff;
    padding: 15px;

    border-radius: 10px;
    .head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .foot {
      margin-top: 20px;
      display: flex;
      justify-content: end;
      margin-right: 20px;
    }
  }
}
</style>
