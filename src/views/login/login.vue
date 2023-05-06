<template>
  <div class="login">
    <loginPannel></loginPannel>
  </div>
</template>

<script lang="ts" setup>
import loginPannel from './cpns/login-pannel.vue'
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
</style>
