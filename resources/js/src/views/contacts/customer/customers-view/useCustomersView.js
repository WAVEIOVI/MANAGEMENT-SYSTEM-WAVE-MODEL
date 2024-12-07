import { ref } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'

export default function useCustomersView() {
  const refCustomerLocationsListTable = ref(null)
  const refCustomerContractsListTable = ref(null)
  const refCustomerContactsListTable = ref(null)
  const refCustomerOrdersListTable = ref(null)
  // Table Handlers
  const tableColumnsContracts = [

    { key: 'contract_date', label: 'Date' },
    { key: 'contract_id', label: 'CONTRACT ID' },
    { key: 'contract_start_date', label: 'Start Date' },
    { key: 'contract_end_date', label: 'End Date' },
    { key: 'contract_plan', label: 'Plan' },
    { key: 'contract_status', label: 'Status' },
  ]

  const tableColumnsLocations = [
    { key: 'location_id', label: 'ID' },
    { key: 'location_address', label: 'Address' },
    { key: 'location_contact', label: 'Contact' },
  ]
  const tableColumnsOrders = [
    { key: 'order_id', label: 'ID' },
    { key: 'order_contract_id', label: 'CONTRACT ID' },
    { key: 'order_date', label: 'Order Date' },
    { key: 'order_location_id', label: 'Location Id' },
    { key: 'order_sending_type', label: 'Sending Type' },
    { key: 'order_total', label: 'Order Total' },
    { key: 'order_status', label: 'Status' },
  ]
  const tableColumnsContacts = [
    { key: 'contact_full_name', label: 'Full Name' },
    { key: 'contact_post', label: 'post' },
  ]

  const refetchData = () => {
    refCustomerLocationsListTable.value.refresh()
  }

  // ------------------------------------------------
  // Tap Locations : Fetch Customer's Locations List
  // ------------------------------------------------
  const fetchCustomerLocations = (ctx, callback) => {
    store
      .dispatch('app-location/fetchCustomerLocations', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchContractData = () => {
    refCustomerContractsListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Contracts : Fetch Customer's Contract List
  // ------------------------------------------------
  const fetchCustomerContracts = (ctx, callback) => {
    store
      .dispatch('app-contract/fetchCustomerContracts', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchOrderData = () => {
    refCustomerOrdersListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Orders : Fetch Customer's Order List
  // ------------------------------------------------
  const fetchCustomerOrders = (ctx, callback) => {
    store
      .dispatch('app-order/fetchCustomerOrders', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchContactData = () => {
    refCustomerContactsListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Contacts : Fetch Customer's Contact List
  // ------------------------------------------------
  const fetchCustomerContacts = (ctx, callback) => {
    store
      .dispatch('app-contact/fetchCustomerContacts', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }
  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveCustomerPlanVariant = plan => {
    if (plan === 'Basic') return 'primary'
    if (plan === 'Basic Plus') return 'secondary'
    if (plan === 'Company') return 'success'
    if (plan === 'Entreprise') return 'warning'
    if (plan === 'Elite') return 'danger'
    return 'primary'
  }
  const resolveCustomerPlanIcon = plan => {
    if (plan === 'Basic') return 'ToolIcon'
    if (plan === 'Basic Plus') return 'TrendingUpIcon'
    if (plan === 'Company') return 'SlidersIcon'
    if (plan === 'Entreprise') return 'ShieldIcon'
    if (plan === 'Elite') return 'UmbrellaIcon'
    return 'ToolIcon'
  }

  const resolveCustomerTypeVariant = type => {
    if (type === 'residential') return 'primary'
    if (type === 'commercial') return 'secondary'
    if (type === 'public') return 'success'
    if (type === 'industrial') return 'warning'
    if (type === 'international') return 'danger'
    if (type === 'premium') return 'info'
    if (type === 'subcontracting') return 'light'
    if (type === 'resellers') return 'dark'
    return 'primary'
  }
  const resolveCustomerTypeIcon = type => {
    if (type === 'residential') return 'HomeIcon'
    if (type === 'commercial') return 'BriefcaseIcon'
    if (type === 'public') return 'BookOpenIcon'
    if (type === 'industrial') return 'ToolIcon'
    if (type === 'international') return 'GlobeIcon'
    if (type === 'premium') return 'AwardIcon'
    if (type === 'subcontracting') return 'UsersIcon'
    if (type === 'resellers') return 'ShoppingCartIcon'
    return 'HomeIcon'
  }

  const resolveCustomerStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchCustomerLocations,
    tableColumnsLocations,
    refetchData,
    refCustomerLocationsListTable,

    tableColumnsContracts,
    fetchCustomerContracts,
    refetchContractData,
    refCustomerContractsListTable,

    tableColumnsOrders,
    fetchCustomerOrders,
    refetchOrderData,
    refCustomerOrdersListTable,

    tableColumnsContacts,
    fetchCustomerContacts,
    refetchContactData,
    refCustomerContactsListTable,

    resolveCustomerTypeVariant,
    resolveCustomerTypeIcon,
    resolveCustomerPlanVariant,
    resolveCustomerPlanIcon,
    resolveCustomerStatusVariant,

  }
}
