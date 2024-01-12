import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '../views/Home.vue'

const user = localStorage.getItem('user')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeVue,
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
    {
      path: '/watch-video/:id',
      name: 'WatchVideo',
      component: () => import(/*webpackChunkName: WatchVideo*/ '../views/WatchVideo.vue'),
      meta: {requiresAuth: true}
    },
    // {
    //   path: '/404',
    //   alias: '*',
    //   name: 'NotFound',
    //   component: () => import(/*webpackChunkName: NotFound*/ '../views/NotFound.vue')
    // }
  ],
})

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)


//   if (requiresAuth) {
//     sessionStorage.setItem('redirectPath', to.path);
//     next('/sign-in');
//   } else if (requiresAuth && user) {
//     next();
//   } else {
//     next();
//   }
// })
export default router
