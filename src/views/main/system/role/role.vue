<template>
  <div class="role">
    <pageForm
      ref="son"
      @newMust="tryNew"
      :formConfig="formConfig"
      :otherConfig="otherConfig"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
          :props="defaultProps"
          @check="toCheck"
      /></template>
    </pageForm>
    <!-- 放在button里面会有点击确定又打开的效果,估计是事件浮动 -->
    <pageSearch
      @queryClick="searchClick"
      @resetClick="resetClick"
      :searchConfig="searchConfig"
    ></pageSearch>

    <pageContent
      @toHandleCreate="createUser"
      @toChangeUser="changeUser"
      :contentConfig="contentConfig"
      ref="contentRef"
    >
      <template #leader="scope"> {{ scope.row.leader }}</template>
      <template #top="scope"> {{ scope.row.parentId }} </template>
    </pageContent>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/pageSearch/pageSearch.vue'
import pageForm from '@/components/pageForm/pageForm.vue'
import pageContent from '@/components/pageContent/pageContent.vue'
import { ref, computed, nextTick } from 'vue'
import useMainStore from '@/store/main/main'
import searchConfig from './config/searchConfig'
import contentConfig from './config/contentConfig'
import formConfig from './config/formConfig'
import usePageContent from '@/hooks/usePageContent'
import usePageForm from '@/hooks/usePageForm'
import { ElTree } from 'element-plus'
import { mapMenuList } from '@/utils/map-menu'

const { contentRef, searchClick, resetClick } = usePageContent()
const { son, createUser, changeUser } = usePageForm(editCallback)

function tryNew() {
  contentRef.value?.newMust()
}

const mainStore = useMainStore()
mainStore.togetMenuList()
let data = computed(() => mainStore.menu)
let defaultProps = {
  children: 'children',
  label: 'name'
}
let otherConfig = ref({})
function toCheck(data1: any, data2: any) {
  let memuList = [...data2.checkedKeys, ...data2.halfCheckedNodes]
  otherConfig.value = { memuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuList(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped>
.role {
}
</style>
