export default [
  // *===============================================---*
  // *--------- Contacts-Customers ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/contacts/customers/list',
    name: 'contacts-customers-list',
    component: () => import('@/views/contacts/customer/customers-list/CustomersList.vue'),
    meta: {
      pageTitle: 'Contacts',
      breadcrumb: [
        {
          text: 'Customers List',
          active: true,
        },
      ],
    },
  },
  {
    path: '/contacts/customer/view/:id',
    name: 'contacts-customers-view',
    component: () => import('@/views/contacts/customer/customers-view/CustomersView.vue'),
  },
  {
    path: '/contacts/customer/edit/:id',
    name: 'contacts-customers-edit',
    component: () => import('@/views/contacts/customer/customers-edit/CustomersEdit.vue'),
  },
]
