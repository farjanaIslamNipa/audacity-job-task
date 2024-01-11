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
  ],
})

export default router
