<template>
  <div class="mainMenu">
    <div class="top">
      <img src="@/assets/img/head2.png" alt="" />
      <h2 v-if="!menuFold">主菜单</h2>
    </div>

    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="menuFold"
    >
      <template v-for="item in menu" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item
              :index="subitem.id + ''"
              @click="handleClick(subitem)"
            >
              <!-- 控制台说index要为string -->
              <span class="run"> {{ subitem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineProps } from 'vue'
import { mapActive } from '@/utils/map-menu'
const loginStore = useLoginStore()
const menu = loginStore.userMenu

defineProps({
  menuFold: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
function handleClick(subitem: any) {
  router.push(subitem.url)
}

const route = useRoute()
const defaultActive = computed(() => {
  const id = mapActive(route.path, menu)
  return id + ''
})
</script>

<style lang="less" scoped>
.mainMenu {
  .top {
    display: flex;
    align-items: center;
    img {
      width: 64px;
    }
  }
}
.run {
  margin-left: 10px;
}
</style>
