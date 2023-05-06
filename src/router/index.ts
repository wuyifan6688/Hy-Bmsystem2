import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global'
import { firstMenu } from '@/utils/map-menu'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/main' },
    { path: '/login', component: () => import('@/views/login/login.vue') },
    {
      path: '/main',
      name: 'main', //非常重要，因为添加子路由是根据name添加的
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) return '/login'
  if (to.path == '/main') {
    return firstMenu?.url
  }
})
export default router
