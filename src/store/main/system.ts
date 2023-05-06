import { defineStore } from 'pinia'
import {
  getUserList,
  deleteUser,
  createUser,
  changeUser,
  getPage,
  changePage,
  delPage,
  createPage
} from '@/service/main/system/system'

interface list {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
interface result {
  userList: list[]
  pageList: any[]
  totalCount: number
}
const useUserStore = defineStore('user', {
  state: (): result => ({
    userList: [],
    pageList: [],
    totalCount: 1
  }), //必须用括号包裹
  actions: {
    async postUserList(
      offset: number,
      size: number,
      name?: string,
      realname?: string,
      cellphone?: number,
      enable?: number,
      createAt?: string
    ) {
      const data = await getUserList(
        offset,
        size,
        name,
        realname,
        cellphone,
        enable,
        createAt
      )
      this.userList = data.data.list
      this.totalCount = data.data.totalCount
    },
    async toDeleteUser(id: number) {
      deleteUser(id)
    },
    async toCreateUser(
      name: string,
      realname: string,
      password: string,
      cellphone: number,
      departmentId: number,
      roleId: number
    ) {
      createUser(name, realname, password, cellphone, departmentId, roleId)
    },
    async toChangeUser(
      id: number,
      name: string,
      realname: string,
      cellphone: number,
      departmentId: number,
      roleId: number
    ) {
      changeUser(id, name, realname, cellphone, departmentId, roleId)
    },
    //封装
    //获取
    async toGetPage(
      name: string,
      offset: number,
      size: number,
      change: {} = {}
    ) {
      const data = await getPage(name, offset, size, change)
      this.pageList = data.data.list
    },
    async toDelPage(name: string, id: number) {
      delPage(name, id)
    },
    async toChangePage(name: string, id: number, change: {}) {
      changePage(name, id, change)
    },
    async toCreatePage(name: string, change: {}) {
      createPage(name, change)
    }
  }
})
export default useUserStore
