import { createRouter, createWebHistory } from 'vue-router'

import Calculator from '../components/Calculator.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Calculator,
    },
    {
      path: '/history',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/History.vue'),
    },
  ],
})

export default router
