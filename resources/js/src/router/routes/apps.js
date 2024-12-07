export default [
  // *===============================================---*
  // *--------- TODO & IT'S FILTERS N TAGS ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/todo',
    name: 'apps-todo',
    component: () => import('@/views/apps/todo/Todo.vue'),
    meta: {
    //   contentRenderer: 'sidebar-left',
    //   contentClass: 'todo-application',
    },
  },
//   {
//     path: '/apps/todo/:filter',
//     name: 'apps-todo-filter',
//     component: () => import('@/views/apps/todo/Todo.vue'),
//     meta: {
//       contentRenderer: 'sidebar-left',
//       contentClass: 'todo-application',
//       navActiveLink: 'apps-todo',
//     },
//     beforeEnter(to, _, next) {
//       if (['important', 'completed', 'deleted'].includes(to.params.filter)) next()
//       else next({ name: 'error-404' })
//     },
//   },
//   {
//     path: '/apps/todo/tag/:tag',
//     name: 'apps-todo-tag',
//     component: () => import('@/views/apps/todo/Todo.vue'),
//     meta: {
//       contentRenderer: 'sidebar-left',
//       contentClass: 'todo-application',
//       navActiveLink: 'apps-todo',
//     },
//     beforeEnter(to, _, next) {
//       if (['team', 'low', 'medium', 'high', 'update'].includes(to.params.tag)) next()
//       else next({ name: 'error-404' })
//     },
//   },
]
