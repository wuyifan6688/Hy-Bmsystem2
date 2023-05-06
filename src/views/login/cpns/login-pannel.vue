<template>
  <div class="login">
    <h2>后台管理系统</h2>
    <div class="pannel">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- stretch赋值不了 -->
        <el-tab-pane label="账号登陆" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span>账号登陆</span>
            </div>
          </template>
          <accountPannel ref="accountRef"></accountPannel>
        </el-tab-pane>

        <!-- ////v-model之前不需要加冒号 -->
        <el-tab-pane label="手机登录">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span>手机登陆</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>

      <div class="count">
        <div class="icount"></div>
        <div class="password"></div>
      </div>
    </div>
    <div class="setPassword">
      <div class="remember">
        <el-checkbox
          v-model="checked"
          label="Option 1"
          size="large"
          style="color: rgb(53, 133, 252)"
          >记住密码</el-checkbox
        >
      </div>
      <div class="forget">忘记密码</div>
    </div>
    <div class="canLogin">
      <el-row class="mb-5">
        <el-button type="primary" class="fast" @click="canLogin"
          >立即登录</el-button
        >
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import accountPannel from './account.vue'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

let checked = ref(localCache.getCache('checked'))
watch(checked, (newValue: boolean) => {
  localCache.setCache('checked', newValue)
})
let activeName = ref('account')
const accountRef = ref<InstanceType<typeof accountPannel>>() //这个不是很懂

function canLogin() {
  if (activeName.value == 'account')
    accountRef.value?.loginAction(checked.value)
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 330px;
  flex-wrap: wrap;
  margin-bottom: 150px;

  h2 {
    margin-bottom: 23px;
  }
  .setPassword {
    display: flex;
    width: 300px;
    justify-content: space-between;
    align-items: center;
    color: rgb(53, 133, 252);
  }

  .canLogin {
    width: 300px !important;
    display: flex;
    justify-content: center;
    .fast {
      width: 300px !important;
    }
  }
}
</style>
