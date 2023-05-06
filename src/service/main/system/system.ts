import hyRequest from '@/service'
export function getUserList(
  offset: number,
  size: number,
  name?: string,
  realname?: string,
  cellphone?: number,
  enable?: number,
  createAt?: string
) {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: offset,
      size: size,
      name,
      realname,
      cellphone,
      enable,
      createAt
    }
  })
}
export function deleteUser(id: number) {
  return hyRequest.delete({
    url: `users/${id}`
  })
}
export function createUser(
  name: string,
  realname: string,
  password: string,
  cellphone: number,
  departmentId: number,
  roleId: number
) {
  return hyRequest.post({
    url: '/users',
    data: {
      name,
      realname,
      password,
      cellphone,
      departmentId,
      roleId
    }
  })
}
/////
export function changeUser(
  id: number,
  name: string,
  realname: string,
  cellphone: number,
  departmentId: number,
  roleId: number
) {
  hyRequest.patch({
    url: `/users/${id}`,
    data: { name, realname, cellphone, departmentId, roleId }
  })
} ///封装
///查
export function getPage(
  name: string,
  offset: number,
  size: number,
  change: any = {}
) {
  // wyf..这一段十分重要，因为传入的change对应的属性可能没有值，所以需要通过这种方式把没有值的属性删除
  const result: any = {}
  for (const t in change) {
    if (change[t] !== '') result[t] = change[t]
  }
  const data = { offset, size, ...result }
  // ..

  return hyRequest.post({
    url: `/${name}/list`,
    data
  })
}
export function delPage(name: string, id: number) {
  return hyRequest.delete({
    url: `/${name}/${id}`
  })
}
export function changePage(name: string, id: number, change: {}) {
  return hyRequest.patch({
    url: `/${name}/${id}`
  })
}
export function createPage(name: string, change: {}) {
  return hyRequest.post({
    url: `/${name}`,
    data: { ...change }
  })
}
