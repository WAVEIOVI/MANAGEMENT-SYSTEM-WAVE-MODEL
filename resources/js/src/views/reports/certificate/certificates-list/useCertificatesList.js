import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCertificatesList() {
  // Use toast
  const toast = useToast()
  const certificateData = ref(null)
  const refCertificateListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'certificate_id', label: 'Certificate ID', sortable: true },
    { key: 'certificate_date', label: 'Date' },
    { key: 'customer_name', label: 'Customer Name' },
    { key: 'tasks_per_intervention', label: 'Total Equipment' },
    { key: 'actions' },
  ]
  const perPage = ref(15)
  const totalCertificates = ref(null)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 15, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const dataMeta = computed(() => {
    const localItemsCount = refCertificateListTable.value ? refCertificateListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalCertificates.value,
    }
  })

  const refetchData = () => {
    refCertificateListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchCertificate = dataItemId => {
    store.dispatch('app-certificate/fetchCertificate', { id: dataItemId })
      .then(response => {
        certificateData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          certificateData.value = undefined
        }
      })
  }
  const fetchCertificates = (ctx, callback) => {
    store
      .dispatch('app-certificate/fetchCertificates', {
        search: searchQuery.value,
        limit: perPage.value,
        page: currentPage.value,
        sortby: sortBy.value,
        sortDesc: isSortDirDesc.value,
      })
      .then(response => {
        console.log(response)
        console.log(response.config)
        // console.log(response.data.meta.per_page)
        const { data } = response.data
        const { total } = response.data.meta
        // data.forEach(certificate => {
        //   console.log(certificate.id)
        //   console.log(certificate.certificate_id)
        //   console.log(certificate.certificate_name)
        // })
        callback(data)
        totalCertificates.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching certificates list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // ------------------------------------------------
  // removeCertificate
  // ------------------------------------------------
  const removeCertificate = dataItemId => {
    store
      .dispatch('app-certificate/removeCertificate', { id: dataItemId })
      .then(() => {
        refetchData()
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveCertificateTypeVariant = type => {
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
  const resolveCertificateTypeIcon = type => {
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

  const resolveCertificateStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    certificateData,
    fetchCertificate,
    fetchCertificates,
    tableColumns,
    perPage,
    currentPage,
    totalCertificates,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refCertificateListTable,

    resolveCertificateTypeVariant,
    resolveCertificateTypeIcon,
    resolveCertificateStatusVariant,
    refetchData,
    removeCertificate,
  }
}
