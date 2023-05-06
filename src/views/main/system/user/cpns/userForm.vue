<template>
  <div class="userForm">
    <el-dialog v-model="dialogFormVisible" title="新建用户">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="70px">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="真实姓名" label-width="70px">
          <el-input
            v-model="form.realname"
            autocomplete="off"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
        <el-form-item label="密码" label-width="70px" v-if="show">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input
            v-model="form.cellphone"
            autocomplete="off"
            placeholder="请输入电话号码"
          />
        </el-form-item>
        <el-form-item label="选择角色" label-width="70px">
          <el-select
            v-model="form.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <!-- 这个width不是很会 -->
            <template v-for="item in role" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select
            v-model="form.departmentId"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <template v-for="item in department" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose, computed, defineEmits } from 'vue'
import useMainStore from '@/store/main/main'
import useUserStore from '@/store/main/system'
let dialogFormVisible = ref(false)
let form = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

let show = ref(true)
let id = ref()
function create(state: boolean, messege: any = '') {
  dialogFormVisible.value = true
  for (let t in form) {
    form[t] = ''
  }
  if (state) {
    id.value = messege.id
    show.value = false
    let t: string
    for (t in messege) {
      form[t] = messege[t]
    }
  }
}
defineExpose({ create })
//为什么不用父传子：因为单向数据流，但是如果关闭表单，dialog的值会变成false，相当于直接在子组件改值了

//获取列表
const mainStore = useMainStore()
const role = computed(() => mainStore.role)
const department = computed(() => mainStore.department)
//一开始发请求的时候是undifine，所以要设置成计算属性

const emit = defineEmits(['newMust'])
const userStore = useUserStore()
function confirm() {
  dialogFormVisible.value = false
  if (show.value) {
    userStore.toCreateUser(
      form.name,
      form.realname,
      form.password,
      parseInt(form.cellphone),
      parseInt(form.departmentId),
      parseInt(form.roleId)
    ),
      emit('newMust')
  } else {
    userStore.toChangeUser(
      id.value,
      form.name,
      form.realname,
      parseInt(form.cellphone),
      parseInt(form.departmentId),
      parseInt(form.roleId)
    )
    console.log(
      id.value,
      form.name,
      form.realname,
      parseInt(form.cellphone),
      parseInt(form.departmentId),
      parseInt(form.roleId)
    )
    emit('newMust')
  }
}
</script>

<style lang="less" scoped>
.userForm {
}
</style>
