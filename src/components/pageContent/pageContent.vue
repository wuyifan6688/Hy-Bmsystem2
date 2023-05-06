<template>
  <div class="userContent" v-if="searchPermisson">
    <div class="body">
      <div class="head">
        <h2>{{ props.contentConfig.header.title }}</h2>
        <el-button
          type="primary"
          @click="handleCreate"
          v-if="createPermisson"
          >{{ props.contentConfig.header.btnTitle }}</el-button
        >
      </div>
      <div class="content">
        <el-table :data="list" style="width: 100%" border>
          <template
            v-for="item in props.contentConfig.propList"
            :key="item.label"
          >
            <template v-if="item.type == 'timer'">
              <el-table-column
                align="center"
                :prop="item.prop"
                :type="item.type"
                :width="item.width"
                :label="item.label"
              >
                <template #default="scope"
                  >{{ dayFormat(scope.row.createAt) }}
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type == 'handler'">
              <el-table-column
                align="center"
                :prop="item.prop"
                :type="item.type"
                :width="item.width"
                :label="item.label"
                v-if="!(!changePermisson && !deletePermisson)"
              >
                <template #default="scope">
                  <el-button
                    v-if="changePermisson"
                    size="small"
                    icon="Edit"
                    text
                    style="color: var(--el-color-primary)"
                    @click="ChangeUser(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    v-if="deletePermisson"
                    size="small"
                    type="danger"
                    icon="Delete"
                    text
                    @click="handleDelete(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type == 'custom'"
              ><el-table-column
                align="center"
                :prop="item.prop"
                :type="item.type"
                :width="item.width"
                :label="item.label"
              >
                <!-- 五颗星 -->
                <template #default="scope">
                  <slot :name="item.slotName" v-bind="scope"></slot>
                </template>
                <!-- 五颗星 -->
              </el-table-column></template
            >
            <template v-else>
              <el-table-column
                align="center"
                :prop="item.prop"
                :type="item.type"
                :width="item.width"
                :label="item.label"
              ></el-table-column>
            </template>
          </template>
        </el-table>
      </div>

      <div class="foot">
        <div class="demo-pagination-block">
          <div class="demonstration"></div>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useUserStore from '@/store/main/system'
import dayFormat from '@/utils/dayformat'
import { defineExpose, defineEmits, defineProps } from 'vue'
import useLoginStore from '@/store/login/login'

defineExpose({ newMust })

function newMust(formData: any = {}) {
  userStore.toGetPage(
    props.contentConfig.pageName,
    (currentPage.value - 1) * pageSize.value,
    pageSize.value,
    formData
  )
}
let currentPage = ref(1)
let pageSize = ref(10)
const userStore = useUserStore()
//高度封装
interface Iprops {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnTitle: string
    }
    propList: any[]
  }
}
const props = defineProps<Iprops>()
userStore.toGetPage(
  props.contentConfig.pageName,
  (currentPage.value - 1) * pageSize.value,
  pageSize.value
)

const list = computed(() => userStore.pageList)

const totalCount = computed(() => userStore.totalCount)

//body
function handleDelete(id: number) {
  userStore.toDelPage(props.contentConfig.pageName, id)
  userStore.toGetPage(
    props.contentConfig.pageName,
    (currentPage.value - 1) * pageSize.value,
    pageSize.value
  )
}

const emit = defineEmits(['toHandleCreate', 'toChangeUser'])
function handleCreate() {
  emit('toHandleCreate')
}
function ChangeUser(messege: any) {
  emit('toChangeUser', messege)
}
// const son = ref()
// //这样写反而报错ref<InstanceType<typeof userForm>>()
// function createUser() {
//   son.value?.create()
// }
// foot
function handleCurrentChange() {
  userStore.postUserList(
    (currentPage.value - 1) * pageSize.value,
    pageSize.value
  )
}
function handleSizeChange() {
  userStore.toGetPage(
    props.contentConfig.pageName,
    (currentPage.value - 1) * pageSize.value,
    pageSize.value
  )
}

const loginStore = useLoginStore()
console.log(loginStore.permission)
let createPermisson = computed(() => {
  for (let item of loginStore.permission) {
    if (item == `system:${props.contentConfig.pageName}:create`) return true
  }
  return false
})
let deletePermisson = computed(() => {
  for (let item of loginStore.permission) {
    if (item == `system:${props.contentConfig.pageName}:delete`) return true
  }
  return false
})
let changePermisson = computed(() => {
  for (let item of loginStore.permission) {
    if (item == `system:${props.contentConfig.pageName}:update`) return true
  }
  return false
})
let searchPermisson = computed(() => {
  for (let item of loginStore.permission) {
    if (item == `system:${props.contentConfig.pageName}:query`) return true
  }
  return false
})
</script>

<style lang="less" scoped>
.userContent {
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
