import { ref } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useInterventionsEdit() {
  // Use toast
  const toast = useToast()

  const interventionScrapData = ref(null)
  const interventionContactData = ref(null)
  const interventionContractData = ref(null)
  const interventionOrderData = ref(null)

  const refInterventionScrapsListTable = ref(null)
  const refMissionContactsListTable = ref(null)
  const refMissionContractsListTable = ref(null)
  const refMissionOrdersListTable = ref(null)

  // Table Handlers
  const tableColumnsScraps = [
    { key: 'index', label: '#' },
    { key: 'equipment_type', label: 'Equipment' },
    { key: 'equipment_status', label: 'Status' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'actions', label: 'Actions' },
  ]
  const tableColumnsContacts = [
    { key: 'contact_first_name', label: 'First Name' },
    { key: 'contact_last_name', label: 'Last Name' },
    { key: 'contact_post', label: 'post' },
    { key: 'contact_phone', label: 'Phone' },
    { key: 'contact_email', label: 'Email' },
    { key: 'actions', label: 'Actions' },
  ]
  const tableColumnsContracts = [

    { key: 'contract_date', label: 'Date' },
    { key: 'contract_id', label: 'CONTRACT ID' },
    { key: 'contract_start_date', label: 'Start Date' },
    { key: 'contract_end_date', label: 'End Date' },
    { key: 'contract_plan', label: 'Plan' },
    { key: 'contract_status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]
  const tableColumnsOrders = [
    { key: 'order_id', label: 'ID' },
    { key: 'order_contract_id', label: 'CONTRACT ID' },
    { key: 'order_date', label: 'Order Date' },
    { key: 'order_location_id', label: 'Location Id' },
    { key: 'order_sending_type', label: 'Sending Type' },
    { key: 'order_status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]

  const refetchData = () => {
    // refMissionContactsListTable.value.refresh()
    refInterventionScrapsListTable.value.refresh()
  }

  // ------------------------------------------------
  // Tap Scraps : Fetch Intervention's Scraps List
  // ------------------------------------------------
  const fetchInterventionScraps = (ctx, callback) => {
    store
      .dispatch('app-scrap/fetchInterventionScraps', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching scraps list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // Tap Scraps : Fetch Intervention Scrap
  // ------------------------------------------------
  const fetchInterventionScrap = dataItemId => {
    store.dispatch('app-scrap/fetchInterventionScrap', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        interventionScrapData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          interventionScrapData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Scraps : remove Intervention Scrap
  // ------------------------------------------------
  const removeInterventionScrap = dataItemId => {
    store
      .dispatch('app-scrap/removeInterventionScrap', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchData()
      })
  }
  const refetchContactData = () => {
    refMissionContactsListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Contacts : Fetch Mission's Contacts List
  // ------------------------------------------------
  const fetchMissionContacts = (ctx, callback) => {
    store
      .dispatch('app-contact/fetchMissionContacts', { id: router.currentRoute.params.id })
      .then(response => {
        const { data } = response.data
        callback(data)
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching contacts list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // Tap Contacts : Fetch Mission Contact
  // ------------------------------------------------
  const fetchMissionContact = dataItemId => {
    store.dispatch('app-contact/fetchMissionContact', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        interventionContactData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          interventionContactData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Contacts : remove Mission Contact
  // ------------------------------------------------
  const removeMissionContact = dataItemId => {
    store
      .dispatch('app-contact/removeMissionContact', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchContactData()
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
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching contract list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // ------------------------------------------------
  // Tap Contracts : Fetch Mission Contract
  // ------------------------------------------------
  const fetchMissionContract = dataItemId => {
    store.dispatch('app-contract/fetchMissionContract', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        interventionContractData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          interventionContractData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Contracts : remove Mission Contract
  // ------------------------------------------------
  const removeMissionContract = dataItemId => {
    store
      .dispatch('app-contract/removeMissionContract', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchContractData()
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
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching order list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // ------------------------------------------------
  // Tap Orders : Fetch Mission Order
  // ------------------------------------------------
  const fetchMissionOrder = dataItemId => {
    store.dispatch('app-order/fetchMissionOrder', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        interventionOrderData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          interventionOrderData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Orders : remove Mission Order
  // ------------------------------------------------
  const removeMissionOrder = dataItemId => {
    store
      .dispatch('app-order/removeMissionOrder', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchOrderData()
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

    // Scrap
    tableColumnsScraps,
    fetchInterventionScraps,
    fetchInterventionScrap,
    removeInterventionScrap,
    interventionScrapData,
    refInterventionScrapsListTable,

    // Contact
    tableColumnsContacts,
    fetchMissionContacts,
    fetchMissionContact,
    removeMissionContact,
    interventionContactData,
    refMissionContactsListTable,
    refetchContactData,

    // Contract
    tableColumnsContracts,
    fetchMissionContracts,
    fetchMissionContract,
    removeMissionContract,
    interventionContractData,
    refMissionContractsListTable,
    refetchContractData,

    // Order
    tableColumnsOrders,
    fetchMissionOrders,
    fetchMissionOrder,
    removeMissionOrder,
    interventionOrderData,
    refMissionOrdersListTable,
    refetchOrderData,

    // Global
    refetchData,

    resolveMissionPlanVariant,
    resolveMissionPlanIcon,
    resolveMissionTypeVariant,
    resolveMissionTypeIcon,
    resolveMissionStatusVariant,

  }
}
