export default [
  // *===============================================---*
  // *--------- Inventory-missions Plan ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/inventory/fire-park/list',
    name: 'inventory-fire-park-list',
    component: () => import('@/views/inventory/fire-park/park-list/ParksList.vue'),
    meta: {
      pageTitle: 'Fire Park',
      breadcrumb: [
        {
          text: 'Fire Park List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/inventory/fire-park/view/:id',
    name: 'inventory-fire-park-view',
    component: () => import('@/views/inventory/fire-park/park-view/ParksView.vue'),
  },
  // *===============================================---*
  // *--------- Inventory-life Sheet ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/inventory/life-sheet/list',
    name: 'inventory-life-sheet-list',
    component: () => import('@/views/inventory/life-sheet/equipment-list/EquipmentsList.vue'),
    meta: {
      pageTitle: 'Life Sheet',
      breadcrumb: [
        {
          text: 'Life Sheet List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/inventory/life-sheet/view/:id',
    name: 'inventory-life-sheet-view',
    component: () => import('@/views/inventory/life-sheet/equipments-view/EquipmentsView.vue'),
  },
]
