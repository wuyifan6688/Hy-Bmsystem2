import { defineStore } from 'pinia'
import { getRoleList, getDepartment, getMenuList } from '@/service/main/main'
interface departmentList {
  id: number
  name: string
  parentId: number
  createAt: string
  updateAt: string
  leader: string
}
interface roleList {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: any[]
}
interface result {
  department: departmentList[]
  role: roleList[]
  menu: []
}
const useMainStore = defineStore('main', {
  state: (): result => ({
    department: [],
    role: [],
    menu: []
  }),
  actions: {
    async togetRoleList() {
      const data = await getRoleList()
      this.role = data.data.list
    },
    async togetDepartment() {
      const data = await getDepartment()

      this.department = data.data.list
    },
    async togetMenuList() {
      const data = await getMenuList()
      this.menu = data.data.list
    }
  }
})
export default useMainStore
