import hyRequest from '@/service'
export function getRoleList() {
  return hyRequest.post({
    url: '/role/list'
  })
}

export function getDepartment() {
  return hyRequest.post({
    url: '/department/list'
  })
}
export function getMenuList() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
