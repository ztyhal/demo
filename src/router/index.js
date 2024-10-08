import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/Layout'


export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'cost',
    alwaysShow: true,
    meta: {
      title: '用户管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'cost',
        component: () => import('../views/cost/index'),
        name: 'cost',
      }
    ]
  },
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

export default router
