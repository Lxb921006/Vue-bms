import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { name: '登录' },
    component: () => import('../views/login/login')
  },
  {
    path: '/ga/:user/:qr/:url',
    // path: '/ga',
    name: 'ga',
    meta: { name: '谷歌认证登录' },
    component: () => import('../views/login/ga')
  },
]

export const showDynamicRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/home'),
    redirect: 'index',
    meta: { requireAuth: true, name: '首页', keepAlive: true },
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/index/index'),
        meta: {name: '首页', keepAlive: false },
        hidden: false,
      },
    ],
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
