import hyRequest from '@/service'
export function getGoodsAmount() {
  return hyRequest.get({
    url: '/goods/amount/list'
  })
}
export function getGoodsFavor() {
  return hyRequest.get({
    url: '/goods/category/favor'
  })
}
export function getGoodsCount() {
  return hyRequest.get({
    url: '/goods/category/count'
  })
}
export function getGoodsSale() {
  return hyRequest.get({
    url: '/goods/category/sale'
  })
}
export function getGoodsTop() {
  return hyRequest.get({
    url: '/goods/sale/top10'
  })
}
export function getGoodsAddress() {
  return hyRequest.get({
    url: '/goods/address/sale'
  })
}
