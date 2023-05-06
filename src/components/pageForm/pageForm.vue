<template>
  <div class="userForm">
    <el-dialog v-model="dialogFormVisible" :title="titleName">
      <!-- 框框 -->
      <el-form :model="form">
        <template v-for="item in props.formConfig.formItems" :key="item.label">
          <el-form-item
            :label="item.label"
            label-width="70px"
            :prop="item.prop"
          >
            <template v-if="item.type == 'select'">
              <el-select
                v-model="form[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="i in item.options" :key="i.label">
                  <el-option :label="i.label" :value="i.value"></el-option>
                </template>
              </el-select>
            </template>
            <template v-if="item.type == 'custom'" #default="scope">
              <slot :name="item.slotName" v-bind="scope"></slot
            ></template>
            <template v-if="item.type == 'input'">
              <el-input
                :type="item.type"
                v-model="form[item.prop]"
                autocomplete="off"
                :placeholder="item.placeholder"
              />
            </template> </el-form-item
        ></template>
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
import { defineProps } from 'vue'
import useMainStore from '@/store/main/main'
import useUserStore from '@/store/main/system'
let dialogFormVisible = ref(false)

let show = ref(true)
let id = ref()

//高度封装
interface Itype {
  formConfig: {
    pageName: string
    headers: {
      newName: string
      changeName: string
    }
    formItems: any[]
  }
  otherConfig?: any
}
const props = defineProps<Itype>()

let initData: any = {}
for (const item of props.formConfig.formItems) {
  initData[item.prop] = item.initData ?? ''
}
let form = reactive<any>(initData)

let titleName = ''
function create(state: boolean, messege: any = '') {
  dialogFormVisible.value = true
  titleName = props.formConfig.headers.newName //名字
  for (let t in form) {
    //清空
    form[t] = ''
  }
  if (state) {
    titleName = props.formConfig.headers.changeName
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
  if (props.otherConfig) {
    form = { ...form, ...props.otherConfig }
  }
  if (show.value) {
    userStore.toCreatePage(props.formConfig.pageName, form)
    emit('newMust')
  } else {
    userStore.toChangePage(props.formConfig.pageName, id.value, form)

    emit('newMust')
  }
}
</script>

<style lang="less" scoped>
.userForm {
}
</style>
