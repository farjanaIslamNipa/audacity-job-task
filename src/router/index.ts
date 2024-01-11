import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '../views/Home.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeVue,
    },
    {
      path: '/watch-video',
      name: 'WatchVideo',
      component: () => import('../views/WatchVideo.vue'),
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('../views/auth/SignUp.vue'),
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('../views/auth/SignIn.vue'),
    },
  ],
})

export default router
