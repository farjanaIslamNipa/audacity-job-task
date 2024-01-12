import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '../views/Home.vue'
import NotFoundVue from '../views/NotFound.vue'

const user = localStorage.getItem('user')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeVue,
      meta: {auth: false}
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: () => import(/*webpackChunkName: WatchVideo*/ '../views/auth/SignUp.vue'),
      meta: {auth: false}
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import(/*webpackChunkName: SignIn*/ '../views/auth/SignIn.vue'),
      meta: {auth: false}
    },
    {
      path: '/watch-video/:id',
      name: 'WatchVideo',
      component: () => import(/*webpackChunkName: WatchVideo*/ '../views/WatchVideo.vue'),
      meta: {auth: true}
    },
    {
      path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundVue
    }
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
