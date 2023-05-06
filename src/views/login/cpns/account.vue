<template>
  <div class="account">
    <el-form
      label-width="60px"
      style="max-width: 460px"
      status-icon
      :model="account"
      :rules="accountRules"
      ref="formRef"
    >
      <!-- 遇到不会的东西就先删掉 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          autocomplete="off"
          show-password
          v-model="account.password"
        />
        <!-- 额，show-password好像文档没写 -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { IAccount } from '@/types'
import { ref, reactive } from 'vue'
import type { FormRules, ElForm } from 'element-plus' //elform文档没写
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

let account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
let formRef = ref<InstanceType<typeof ElForm>>()
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
})

const loginStore = useLoginStore()
function loginAction(checked: boolean) {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (checked) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    }
  })
}

defineExpose({
  loginAction
})
</script>
<style lang="less" scoped>
.account {
  width: 300px;
}
</style>
