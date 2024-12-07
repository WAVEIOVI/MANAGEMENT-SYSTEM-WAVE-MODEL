import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: () => import('@/views/Introduction.vue'),
      meta: {
        pageTitle: 'Introduction',
        breadcrumb: [
          {
            text: 'Introduction',
            active: true,
          },
        ],
      },
    },
    {
      path: '/Strategies',
      name: 'strategies',
      component: () => import('@/views/Strategies.vue'),
      meta: {
        pageTitle: 'Strategies',
        breadcrumb: [
          {
            text: 'Strategies',
            active: true,
          },
        ],
      },
    },
    {
      path: '/Policies',
      name: 'policies',
      component: () => import('@/views/Policies.vue'),
      meta: {
        pageTitle: 'Policies',
        breadcrumb: [
          {
            text: 'Policies',
            active: true,
          },
        ],
      },
    },
    {
      path: '/OperationsManual',
      name: 'operations-manual',
      component: () => import('@/views/OperationsManual.vue'),
      meta: {
        pageTitle: 'Operations Manual',
        breadcrumb: [
          {
            text: 'Operations Manual',
            active: true,
          },
        ],
      },
    },
    {
      path: '/EmployeeHandbook',
      name: 'employee-handbook',
      component: () => import('@/views/EmployeeHandbook.vue'),
      meta: {
        pageTitle: 'Employee Handbook',
        breadcrumb: [
          {
            text: 'Employee Handbook',
            active: true,
          },
        ],
      },
    },
    {
      path: '/EmployeeHandbookShortCut',
      name: 'employee-handbook-short-cut',
      component: () => import('@/views/EmployeeHandbookShortCut.vue'),
      meta: {
        pageTitle: 'Employee Handbook ShortCut',
        breadcrumb: [
          {
            text: 'Employee Handbook ShortCut',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
