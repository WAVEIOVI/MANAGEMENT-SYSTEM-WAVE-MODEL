<template>

  <div>

    <!-- Table Container Card -->
    <b-card
      no-body
    >
      <b-card-header>
        <b-card-title>Contacts List</b-card-title>
      </b-card-header>

      <!-- body -->
      <b-card-body>

        <b-table
          ref="refCustomerContactsListTable"
          class="position-relative"
          :items="fetchCustomerContacts"
          responsive
          :fields="tableColumnsContacts"
          primary-key="id"
          :sort-by.sync="sortBy"
          show-empty
          empty-text="No matching records found"
          :sort-desc.sync="isSortDirDesc"
        />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCardHeader,
  BCardTitle,
  BTable,
  BBadge,
} from 'bootstrap-vue'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useCustomersView from './useCustomersView'
import contactStoreModule from '../customers-edit/customer-edit-tab-contacts/contactStoreModule'

export default {
  components: {
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BTable,
    BBadge,
  },
  setup() {
    const CONTACT_APP_STORE_MODULE_NAME = 'app-contact'

    // Register module
    if (!store.hasModule(CONTACT_APP_STORE_MODULE_NAME)) store.registerModule(CONTACT_APP_STORE_MODULE_NAME, contactStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CONTACT_APP_STORE_MODULE_NAME)) store.unregisterModule(CONTACT_APP_STORE_MODULE_NAME)
    })

    const {
      fetchCustomerContacts,
      tableColumnsContacts,
      refCustomerContactsListTable,
      refetchContactData,
      resolveCustomerPlanVariant,
      resolveCustomerPlanIcon,
      resolveCustomerStatusVariant,
    } = useCustomersView()

    return {

      fetchCustomerContacts,
      tableColumnsContacts,
      refCustomerContactsListTable,
      refetchContactData,
      avatarText,

      // UI
      resolveCustomerPlanVariant,
      resolveCustomerPlanIcon,
      resolveCustomerStatusVariant,

    }
  },
}
</script>

      <style lang="scss" scoped>
      .per-page-selector {
        width: 90px;
      }
      </style>
