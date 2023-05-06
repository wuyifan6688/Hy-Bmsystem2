<template>
  <div class="cardCount">
    <el-row :gutter="20">
      <template v-for="item in goodsAmount" :key="item.title">
        <el-col :span="6">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span
                  style="font-size: 11px; color: gray; margin-bottom: 10px"
                  >{{ item.title }}</span
                ><span ref="countRef1" style="font-size: 24px">{{
                  item.number1
                }}</span>
              </div>
            </template>
            <div class="text item">
              <span>{{ item.title }}</span
              ><span>{{ item.number1 }}</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAnalysisStore from '@/store/main/analysis'
import { computed, onMounted, ref } from 'vue'
import { CountUp } from 'countup.js'
const analysisStore = useAnalysisStore()
analysisStore.toGetAmount()
let goodsAmount = computed(() => analysisStore.amount)
console.log(goodsAmount)

const countRef1 = ref<HTMLElement>()
const countRef2 = ref<HTMLElement>()

onMounted(() => {
  let countup1 = new CountUp('t1', 10000, {})
  countup1.start()
  let countup2 = new CountUp(countRef2.value!, 10000, {})
  countup2.start()
})
</script>

<style lang="less" scoped>
.cardCount {
  .card-header {
    height: 40px;
    display: flex;
    padding-top: 10px;
    flex-direction: column; /* 设置为垂直排列 */
    align-items: flex-start; /* 元素顶部对齐 */
  }
  .text {
    font-size: 14px;
  }
}
</style>
<!-- <template>
  <div class="cardCount">
    <el-row :gutter="20">
      <template v-for="(item, index) in goodsAmount" :key="index">
        <el-col :span="6">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span
                  style="font-size: 11px; color: gray; margin-bottom: 10px"
                >{{ item.title }}</span>
                <span style="font-size: 24px" :ref="'countRef1-'+index">{{
                  item.number1
                }}</span>
              </div>
            </template>
            <div class="text item">
              <span>{{ item.title }}</span>
              <span :ref="'countRef2-'+index">{{ item.number1 }}</span>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAnalysisStore from "@/store/main/analysis";
import { computed, onMounted, ref } from "vue";
import { CountUp } from "countup.js";
const analysisStore = useAnalysisStore();
analysisStore.toGetAmount();
let goodsAmount = computed(() => analysisStore.amount);

const countRefs1 = ref([]);
const countRefs2 = ref([]);
onMounted(() => {
  goodsAmount.value.forEach((item, index) => {
    let countup1 = new CountUp(countRefs1.value[index], item.number1, {});
    countup1.start();
    let countup2 = new CountUp(countRefs2.value[index], item.number1, {});
    countup2.start();
  });
});

</script>

<style lang="less" scoped>
.cardCount {
  .card-header {
    height: 40px;
    display: flex;
    padding-top: 10px;
    flex-direction: column; /* 设置为垂直排列 */
    align-items: flex-start; /* 元素顶部对齐 */
  }
  .text {
    font-size: 14px;
  }
}
</style> -->
