import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'

// 定义不需要登录就能访问的白名单路径，精确匹配
const whiteList = ['/', '/admin', '/api']

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Home
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局导航守卫
router.beforeEach((to, from, next) => {

  if (to.path === '/' || to.path === '/admin') {
    next()
    return
  }
  
  // 检查是否登录
  if (!sessionStorage.getItem('token')) {

    // 精确匹配白名单路径
    const isWhiteListed = whiteList.some(path => {
      return to.path === path || to.path === path + '/';
    });
  
    if (isWhiteListed) {
      next()
      return
    }

    next('/')
    return
  }

  next()
})

export default router
