import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { mapMenuRoutes, mapPermisson } from '@/utils/map-menu'
import useMainStore from '../main/main'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global'
import router from '@/router'
//const LOGIN_TOKEN = 'login/token' //随便赋的值
interface LoginState {
  name: string
  password: any
  token: any
  userInfo: any
  userMenu: any
  permission: any
}
const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    name: localCache.getCache('name'),
    password: localCache.getCache('password'),
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? '',
    userMenu: localCache.getCache('userMenu') ?? '',
    permission: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      const userMenuResult = await getUserMenuByRoleId(this.userInfo.role.id)
      this.userMenu = userMenuResult.data

      // 匹配权限
      let routes = []
      routes = mapMenuRoutes(this.userMenu)
      routes.forEach((item) => {
        router.addRoute('main', item)
      })

      //导入权限
      this.permission = mapPermisson(this.userMenu)

      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenu', this.userMenu)

      //下载用户列表和部门列表
      const mainStore = useMainStore()
      mainStore.togetRoleList()
      mainStore.togetDepartment()

      //转入
      router.push('/main')
    },
    loadLocalCacheAction() {
      //挂载到app，刷新时候启用
      const mainStore = useMainStore()
      mainStore.togetRoleList()
      mainStore.togetDepartment()
      this.permission = mapPermisson(this.userMenu)

      let routes = []
      routes = mapMenuRoutes(this.userMenu)
      routes.forEach((item) => {
        router.addRoute('main', item)
      })
    }
  }
})

export default useLoginStore
