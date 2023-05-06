import type { RouteRecordRaw } from 'vue-router'

const localRoutes: RouteRecordRaw[] = [
  {
    path: '/main/analysis/overview',
    component: () => import('@/views/main/analysis/overview.vue')
  },
  {
    path: '/main/product/category',
    component: () => import('@/views/main/product/category.vue')
  },
  {
    path: '/main/analysis/dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
  },
  {
    path: '/main/product/goods',
    component: () => import('@/views/main/product/goods.vue')
  },
  {
    path: '/main/story/chat',
    component: () => import('@/views/main/story/chat.vue')
  },
  {
    path: '/main/story/list',
    component: () => import('@/views/main/story/list.vue')
  },
  {
    path: '/main/system/department',
    component: () => import('@/views/main/system/department/department.vue')
  },
  {
    path: '/main/system/menu',
    component: () => import('@/views/main/system/menu/menu.vue')
  },
  {
    path: '/main/system/role',
    component: () => import('@/views/main/system/role/role.vue')
  },
  {
    path: '/main/system/user',
    component: () => import('@/views/main/system/user/user.vue')
  }
]

export let firstMenu: any = null
export function mapMenuRoutes(userMenu: any[]) {
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path == submenu.url)
      if (route && !routes.find((item) => menu.url == item.path))
        routes.push({ path: menu.url, redirect: submenu.url })
      if (route) routes.push(route) //可能一个都没有，所以要缩小范围
      if (!firstMenu && route) {
        firstMenu = submenu
        // firstMenu = submenu.url因为调用的时候也是.url所以重复了
      }
    }
  }
  return routes
}

export function mapActive(it: string, arg: any) {
  for (const item of arg) {
    for (const subitem of item.children) {
      if (subitem.url == it) return subitem.id
    }
  }
}

export function mapName(it: string, arg: any) {
  const name = []
  for (const item of arg) {
    for (const subitem of item.children) {
      if (subitem.url == it) {
        name.push({ name: item.name, url: item.url }) //对象要写成键值对
        name.push({ name: subitem.name, url: subitem.url }) //对象要写成键值对
        return name
      }
    }
  }
}

export function mapMenuList(menuList: any[]) {
  const ids: number[] = []
  function recurseId(menuList: any[]) {
    for (const item of menuList) {
      if (item.children) {
        recurseId(item.children)
      } else ids.push(item.id)
    }
  }
  recurseId(menuList)

  return ids
}

export function mapPermisson(userList: any[]) {
  const result: any = []
  function recurseType(userList: any[]) {
    for (const item of userList) {
      if (item.type == 3) result.push(item.permission)
      else recurseType(item.children ?? []) //不一定有chirdren
    }
  }
  recurseType(userList)
  return result
}
