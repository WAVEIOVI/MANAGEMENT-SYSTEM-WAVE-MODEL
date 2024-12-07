export default [
  // *===============================================---*
  // *--------- reports-report ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/reports/report/list',
    name: 'reports-report-list',
    component: () => import('@/views/reports/report/reports-list/ReportsList.vue'),
    meta: {
      pageTitle: 'Reports',
      breadcrumb: [
        {
          text: 'Reports List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/reports/certificates/list',
    name: 'reports-certificates-list',
    component: () => import('@/views/reports/certificate/certificates-list/CertificatesList.vue'),
    meta: {
      pageTitle: 'Reports',
      breadcrumb: [
        {
          text: 'Reports List',
          active: true,
        },
      ],
    },
  },
//   {
//     path: '/missions/mission-plan/view/:id',
//     name: 'missions-mission-plan-view',
//     component: () => import('@/views/missions/mission-plan/missions-view/MissionsView.vue'),
//   },
//   {
//     path: '/missions/mission-plan/edit/:id',
//     name: 'missions-mission-plan-edit',
//     component: () => import('@/views/missions/mission-plan/missions-edit/MissionsEdit.vue'),
//   },
]
