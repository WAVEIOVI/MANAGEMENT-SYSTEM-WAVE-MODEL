import { ref } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'

export default function useEquipmentsView() {
  const refEquipmentLocationsListTable = ref(null)
  const refEquipmentContractsListTable = ref(null)
  const refEquipmentContactsListTable = ref(null)
  const refEquipmentOrdersListTable = ref(null)
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
    { key: 'contact_first_name', label: 'First Name' },
    { key: 'contact_last_name', label: 'Last Name' },
    { key: 'contact_post', label: 'post' },
  ]

  const refetchData = () => {
    refEquipmentLocationsListTable.value.refresh()
  }

  // ------------------------------------------------
  // Tap Locations : Fetch Equipment's Locations List
  // ------------------------------------------------
  const fetchEquipmentLocations = (ctx, callback) => {
    store
      .dispatch('app-location/fetchEquipmentLocations', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchContractData = () => {
    refEquipmentContractsListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Contracts : Fetch Equipment's Contract List
  // ------------------------------------------------
  const fetchEquipmentContracts = (ctx, callback) => {
    store
      .dispatch('app-contract/fetchEquipmentContracts', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchOrderData = () => {
    refEquipmentOrdersListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Orders : Fetch Equipment's Order List
  // ------------------------------------------------
  const fetchEquipmentOrders = (ctx, callback) => {
    store
      .dispatch('app-order/fetchEquipmentOrders', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }

  const refetchContactData = () => {
    refEquipmentContactsListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Contacts : Fetch Equipment's Contact List
  // ------------------------------------------------
  const fetchEquipmentContacts = (ctx, callback) => {
    store
      .dispatch('app-contact/fetchEquipmentContacts', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
  }
  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveEquipmentPlanVariant = plan => {
    if (plan === 'Basic') return 'primary'
    if (plan === 'Basic Plus') return 'secondary'
    if (plan === 'Company') return 'success'
    if (plan === 'Entreprise') return 'warning'
    if (plan === 'Elite') return 'danger'
    return 'primary'
  }
  const resolveEquipmentPlanIcon = plan => {
    if (plan === 'Basic') return 'ToolIcon'
    if (plan === 'Basic Plus') return 'TrendingUpIcon'
    if (plan === 'Company') return 'SlidersIcon'
    if (plan === 'Entreprise') return 'ShieldIcon'
    if (plan === 'Elite') return 'UmbrellaIcon'
    return 'ToolIcon'
  }

  const resolveEquipmentTypeVariant = type => {
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
  const resolveEquipmentTypeIcon = type => {
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

  const resolveEquipmentStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchEquipmentLocations,
    tableColumnsLocations,
    refetchData,
    refEquipmentLocationsListTable,

    tableColumnsContracts,
    fetchEquipmentContracts,
    refetchContractData,
    refEquipmentContractsListTable,

    tableColumnsOrders,
    fetchEquipmentOrders,
    refetchOrderData,
    refEquipmentOrdersListTable,

    tableColumnsContacts,
    fetchEquipmentContacts,
    refetchContactData,
    refEquipmentContactsListTable,

    resolveEquipmentTypeVariant,
    resolveEquipmentTypeIcon,
    resolveEquipmentPlanVariant,
    resolveEquipmentPlanIcon,
    resolveEquipmentStatusVariant,

  }
}
