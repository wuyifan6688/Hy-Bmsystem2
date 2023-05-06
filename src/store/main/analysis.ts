import {
  getGoodsAddress,
  getGoodsAmount,
  getGoodsCount,
  getGoodsFavor,
  getGoodsSale,
  getGoodsTop
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface result {
  amount: any[]
  favor: any[]
  sale: any[]
  top: any[]
  address: any[]
  count: any[]
}
const useAnalysisStore = defineStore('analysis', {
  state: (): result => ({
    amount: [],
    favor: [],
    sale: [],
    top: [],
    address: [],
    count: []
  }),
  actions: {
    async toGetAmount() {
      const amount = await getGoodsAmount() //必须要调用
      this.amount = amount.data
    },
    async toGetFavor() {
      const favor = await getGoodsFavor()
      this.favor = favor.data
    },
    async toGetAddress() {
      const address = await getGoodsAddress()
      this.address = address.data
    },
    async toGetSale() {
      const sale = await getGoodsSale()
      this.sale = sale.data
    },
    async toGetTop() {
      const top = await getGoodsTop()
      this.top = top.data
    },
    async toGetCount() {
      const count = await getGoodsCount()
      this.count = count.data
    }
  }
})

export default useAnalysisStore
