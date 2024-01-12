import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '../views/Home.vue'
import NotFoundVue from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeVue
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import(/*webpackChunkName: WatchVideo*/ '../views/auth/SignUp.vue')
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import(/*webpackChunkName: SignIn*/ '../views/auth/SignIn.vue')
    },
    {
      path: '/watch-video/:id',
      name: 'WatchVideo',
      component: () => import(/*webpackChunkName: WatchVideo*/ '../views/WatchVideo.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundVue
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = localStorage.getItem('user');
    if (user) {
      next();
    } else {
      next('/sign-in');
    }
  } else {
    next();
  }
});

export default router
