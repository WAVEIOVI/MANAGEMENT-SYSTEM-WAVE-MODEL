export default [
  // *===============================================---*
  // *--------- planning -------------------------------*
  // *===============================================---*
  {
    path: '/planning/view',
    name: 'planning-view',
    component: () => import('@/views/calendar/Calendar.vue'),
    meta: {
      pageTitle: 'Planning',
      breadcrumb: [
        {
          text: 'Planning',
          active: true,
        },
      ],
    },
  },
]
