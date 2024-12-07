import { ref } from '@vue/composition-api'
import store from '@/store'

import router from '@/router'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCustomersEdit() {
  // Use toast
  const toast = useToast()

  const customerLocationData = ref(null)
  const customerContactData = ref(null)
  const customerContractData = ref(null)
  const customerOrderData = ref(null)

  const refCustomerLocationsListTable = ref(null)
  const refCustomerContactsListTable = ref(null)
  const refCustomerContractsListTable = ref(null)
  const refCustomerOrdersListTable = ref(null)

  // Table Handlers
  const tableColumnsLocations = [
    { key: 'location_id', label: 'ID' },
    { key: 'location_address', label: 'Address' },
    { key: 'location_contact', label: 'Contact' },
    { key: 'actions', label: 'Actions' },
  ]
  const tableColumnsContacts = [
    { key: 'contact_full_name', label: 'Full Name' },
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
    // refCustomerContactsListTable.value.refresh()
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
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching locations list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  // ------------------------------------------------
  // Tap Locations : Fetch Customer Location
  // ------------------------------------------------
  const fetchCustomerLocation = dataItemId => {
    store.dispatch('app-location/fetchCustomerLocation', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        customerLocationData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          customerLocationData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Locations : remove Customer Location
  // ------------------------------------------------
  const removeCustomerLocation = dataItemId => {
    store
      .dispatch('app-location/removeCustomerLocation', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchData()
      })
  }
  const refetchContactData = () => {
    refCustomerContactsListTable.value.refresh()
  }
  // ------------------------------------------------
  // Tap Contacts : Fetch Customer's Contacts List
  // ------------------------------------------------
  const fetchCustomerContacts = (ctx, callback) => {
    store
      .dispatch('app-contact/fetchCustomerContacts', { id: router.currentRoute.params.id })
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
  // Tap Contacts : Fetch Customer Contact
  // ------------------------------------------------
  const fetchCustomerContact = dataItemId => {
    store.dispatch('app-contact/fetchCustomerContact', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        customerContactData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          customerContactData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Contacts : remove Customer Contact
  // ------------------------------------------------
  const removeCustomerContact = dataItemId => {
    store
      .dispatch('app-contact/removeCustomerContact', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchContactData()
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
  // Tap Contracts : Fetch Customer Contract
  // ------------------------------------------------
  const fetchCustomerContract = dataItemId => {
    store.dispatch('app-contract/fetchCustomerContract', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        customerContractData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          customerContractData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Contracts : remove Customer Contract
  // ------------------------------------------------
  const removeCustomerContract = dataItemId => {
    store
      .dispatch('app-contract/removeCustomerContract', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchContractData()
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
  // Tap Orders : Fetch Customer Order
  // ------------------------------------------------
  const fetchCustomerOrder = dataItemId => {
    store.dispatch('app-order/fetchCustomerOrder', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(response => {
        customerOrderData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          customerOrderData.value = undefined
        }
      })
  }

  // ------------------------------------------------
  // Tap Orders : remove Customer Order
  // ------------------------------------------------
  const removeCustomerOrder = dataItemId => {
    store
      .dispatch('app-order/removeCustomerOrder', { id: router.currentRoute.params.id, idloc: dataItemId })
      .then(() => {
        refetchOrderData()
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

    // Location
    tableColumnsLocations,
    fetchCustomerLocations,
    fetchCustomerLocation,
    removeCustomerLocation,
    customerLocationData,
    refCustomerLocationsListTable,

    // Contact
    tableColumnsContacts,
    fetchCustomerContacts,
    fetchCustomerContact,
    removeCustomerContact,
    customerContactData,
    refCustomerContactsListTable,
    refetchContactData,

    // Contract
    tableColumnsContracts,
    fetchCustomerContracts,
    fetchCustomerContract,
    removeCustomerContract,
    customerContractData,
    refCustomerContractsListTable,
    refetchContractData,

    // Order
    tableColumnsOrders,
    fetchCustomerOrders,
    fetchCustomerOrder,
    removeCustomerOrder,
    customerOrderData,
    refCustomerOrdersListTable,
    refetchOrderData,

    // Global
    refetchData,

    resolveCustomerPlanVariant,
    resolveCustomerPlanIcon,
    resolveCustomerTypeVariant,
    resolveCustomerTypeIcon,
    resolveCustomerStatusVariant,

  }
}
