<template>
  <div class="userContent">
    <div class="body">
      <div class="head">
        <h2>用户列表</h2>
        <el-button type="primary" @click="handleCreate">新建用户 </el-button>
      </div>
      <div class="content">
        <el-table :data="list" style="width: 100%" border>
          <el-table-column align="center" type="selection" width="50%" />
          <el-table-column align="center" prop="id" label="序号" width="80%" />
          <el-table-column
            align="center"
            prop="name"
            label="用户名"
            width="80%"
          />
          <el-table-column
            align="center"
            prop="realname"
            label="真实姓名"
            width="80%"
          />
          <el-table-column
            align="center"
            prop="cellphone"
            label="手机号码"
            width="80%"
          />
          <el-table-column align="center" prop="enable" label="状态" width="90%"
            ><template #default="scope">
              <el-button>{{
                scope.row.enable == 1 ? '启用' : '禁用'
              }}</el-button>
              <!-- 关于为什么不能直接用list.enable:list是一个对象数组，不能遍历拿值 -->
            </template></el-table-column
          >
          <el-table-column align="center" prop="createAt" label="创建时间"
            ><template #default="scope">{{
              dayFormat(scope.row.createAt)
            }}</template></el-table-column
          >

          <el-table-column align="center" prop="updateAt" label="更新时间"
            ><template #default="scope">{{
              dayFormat(scope.row.updateAt)
            }}</template></el-table-column
          >
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button
                size="small"
                icon="Edit"
                text
                style="color: var(--el-color-primary)"
                @click="ChangeUser(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                icon="Delete"
                text
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
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
import { defineExpose, defineEmits } from 'vue'

defineExpose({ searchUser })

function searchUser(formData: any = {}) {
  userStore.postUserList(
    (currentPage.value - 1) * pageSize.value,
    pageSize.value,
    formData.name,
    formData.realname,
    formData.cellphone ? parseInt(formData.cellphone) : undefined,
    formData.enable,
    formData.createAt
  )
}
let currentPage = ref(1)
let pageSize = ref(10)
const userStore = useUserStore()
userStore.postUserList((currentPage.value - 1) * pageSize.value, pageSize.value)

const list = computed(() => userStore.userList)
const totalCount = computed(() => userStore.totalCount)

//body
function handleDelete(id: number) {
  userStore.toDeleteUser(id)
  userStore.postUserList(
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
  userStore.postUserList(
    (currentPage.value - 1) * pageSize.value,
    pageSize.value
  )
}
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
