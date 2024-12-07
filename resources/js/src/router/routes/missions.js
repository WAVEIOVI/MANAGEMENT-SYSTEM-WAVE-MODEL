export default [
  // *===============================================---*
  // *--------- Mission-missions Plan ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/missions/mission-plan/list',
    name: 'missions-mission-plan-list',
    component: () => import('@/views/missions/mission-plan/missions-list/MissionsList.vue'),
    meta: {
      pageTitle: 'Missions Plan',
      breadcrumb: [
        {
          text: 'Missions List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/missions/mission-plan/view/:id',
    name: 'missions-mission-plan-view',
    component: () => import('@/views/missions/mission-plan/missions-view/MissionsView.vue'),
  },
  {
    path: '/missions/mission-plan/edit/:id',
    name: 'missions-mission-plan-edit',
    component: () => import('@/views/missions/mission-plan/missions-edit/MissionsEdit.vue'),
  },
  // *===============================================---*
  // *--------- Mission-interventions ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/missions/intervention/list',
    name: 'missions-intervention-list',
    component: () => import('@/views/missions/intervention/interventions-list/InterventionsList.vue'),
    meta: {
      pageTitle: 'Intervention',
      breadcrumb: [
        {
          text: 'Interventions List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/missions/intervention/view/:id',
    name: 'missions-intervention-view',
    component: () => import('@/views/missions/intervention/interventions-view/InterventionsView.vue'),
  },
  {
    path: '/missions/intervention/view/:id/equipment',
    name: 'missions-intervention-equipment-view',
    component: () => import('@/views/missions/intervention/interventions-equipment/InterventionViewEquipment.vue'),
  },
  {
    path: '/missions/intervention/edit/:id',
    name: 'missions-intervention-edit',
    component: () => import('@/views/missions/intervention/interventions-edit/InterventionsEdit.vue'),
  },

  // *===============================================---*
  // *--------- Mission-workshops ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/missions/workshop/list',
    name: 'missions-workshop-list',
    component: () => import('@/views/missions/workshop/workshops-list/WorkshopsList.vue'),
    meta: {
      pageTitle: 'Workshop',
      breadcrumb: [
        {
          text: 'Workshops List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/missions/workshop/view/:id',
    name: 'missions-workshop-view',
    component: () => import('@/views/missions/workshop/workshops-view/WorkshopsView.vue'),
  },
  {
    path: '/missions/workshop/view/:id/equipment',
    name: 'missions-workshop-equipment-view',
    component: () => import('@/views/missions/workshop/workshops-equipment/WorkshopViewEquipment.vue'),
  },
  {
    path: '/missions/workshop/edit/:id',
    name: 'missions-workshop-edit',
    component: () => import('@/views/missions/workshop/workshops-edit/WorkshopsEdit.vue'),
  },
]
