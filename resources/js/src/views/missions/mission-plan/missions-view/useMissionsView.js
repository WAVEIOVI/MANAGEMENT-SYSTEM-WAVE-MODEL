import { ref } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'

export default function useMissionsView() {
  const refMissionServicesListTable = ref(null)
  const refMissionContractsListTable = ref(null)
  const refMissionContactsListTable = ref(null)
  const refMissionOrdersListTable = ref(null)
  // Table Handlers
  const tableColumnsContracts = [

    { key: 'contract_date', label: 'Date' },
    { key: 'contract_id', label: 'CONTRACT ID' },
    { key: 'contract_start_date', label: 'Start Date' },
    { key: 'contract_end_date', label: 'End Date' },
    { key: 'contract_plan', label: 'Plan' },
    { key: 'contract_status', label: 'Status' },
  ]

  const tableColumnsServices = [
    { key: 'index', label: '#' },
    { key: 'mission_service', label: 'Service' },
  ]
  const tableColumnsContacts = [
    { key: 'contact_first_name', label: 'First Name' },
    { key: 'contact_last_name', label: 'Last Name' },
    { key: 'contact_post', label: 'post' },
  ]

  const refetchData = () => {
    refMissionServicesListTable.value.refresh()
  }

  // ------------------------------------------------
  // Tap Services : Fetch Mission's Services List
  // ------------------------------------------------
  const fetchMissionServices = (ctx, callback) => {
    store
      .dispatch('app-service/fetchMissionServices', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchContractData = () => {
    refMissionContractsListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Contracts : Fetch Mission's Contract List
  // ------------------------------------------------
  const fetchMissionContracts = (ctx, callback) => {
    store
      .dispatch('app-contract/fetchMissionContracts', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchOrderData = () => {
    refMissionOrdersListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Orders : Fetch Mission's Order List
  // ------------------------------------------------
  const fetchMissionOrders = (ctx, callback) => {
    store
      .dispatch('app-order/fetchMissionOrders', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchContactData = () => {
    refMissionContactsListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Contacts : Fetch Mission's Contact List
  // ------------------------------------------------
  const fetchMissionContacts = (ctx, callback) => {
    store
      .dispatch('app-contact/fetchMissionContacts', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }
  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveMissionPlanVariant = plan => {
    if (plan === 'Basic') return 'primary'
    if (plan === 'Basic Plus') return 'secondary'
    if (plan === 'Company') return 'success'
    if (plan === 'Entreprise') return 'warning'
    if (plan === 'Elite') return 'danger'
    return 'primary'
  }
  const resolveMissionPlanIcon = plan => {
    if (plan === 'Basic') return 'ToolIcon'
    if (plan === 'Basic Plus') return 'TrendingUpIcon'
    if (plan === 'Company') return 'SlidersIcon'
    if (plan === 'Entreprise') return 'ShieldIcon'
    if (plan === 'Elite') return 'UmbrellaIcon'
    return 'ToolIcon'
  }

  const resolveMissionTypeVariant = type => {
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
  const resolveMissionTypeIcon = type => {
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

  const resolveMissionStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchMissionServices,
    tableColumnsServices,
    refetchData,
    refMissionServicesListTable,

    tableColumnsContracts,
    fetchMissionContracts,
    refetchContractData,
    refMissionContractsListTable,

    fetchMissionOrders,
    refetchOrderData,
    refMissionOrdersListTable,

    tableColumnsContacts,
    fetchMissionContacts,
    refetchContactData,
    refMissionContactsListTable,

    resolveMissionTypeVariant,
    resolveMissionTypeIcon,
    resolveMissionPlanVariant,
    resolveMissionPlanIcon,
    resolveMissionStatusVariant,

  }
}
