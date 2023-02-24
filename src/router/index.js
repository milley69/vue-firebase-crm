// import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
// import currentUser from '../main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'auth' },
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'auth' },
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Categories.vue'),
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Detail.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/History.vue'),
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Planning.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Record.vue'),
    },
  ],
})
// FIXME: This is a workaround for a bug in vue-router.
router.beforeEach((to, from, next) => {
  onAuthStateChanged(getAuth(), (user) => {
    let currentUser = null
    if (user) {
      currentUser = user.uid
    }
    const requireAuth = to.matched.some((record) => record.meta.auth)
    if (requireAuth && !currentUser) {
      next('/login?message=login')
    } else {
      next()
    }
  })
  // const currentUser = getAuth().currentUser
  // const requireAuth = to.matched.some((record) => record.meta.auth)
  // if (requireAuth && !currentUser) {
  //   next('/login?message=login')
  // } else {
  //   next()
  // }
})
export default router
