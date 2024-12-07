<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="customerData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching customer data
      </h4>
      <div class="alert-body">
        No customer found with this customer id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'contacts-customers-list'}"
        >
          Customer List
        </b-link>
        for other customers.
      </div>
    </b-alert>

    <template v-if="customerData">
      <!-- First Row -->
      <b-row class="match-height">
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <customer-view-customer-info-card :customer-data="customerData" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <customer-view-customer-action-card />
        </b-col>
      </b-row>

      <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <customer-view-customer-basic-contact-card :customer-data="customerData" />
          <customer-view-customer-active-contract-card :customer-data="customerData" />
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <customer-view-customer-additional-information-card :customer-data="customerData" />
        </b-col>
      </b-row>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="7"
        >
          <customer-view-customer-location-list-card />
        </b-col>
        <b-col
          cols="12"
          lg="5"
        >
          <customer-view-customer-contact-list-card />
        </b-col>
      </b-row>
      <div class="group-area mt-1">
        <h6>Historic</h6>
        <hr>
      </div>
      <b-row class="match-height">
        <b-col
          cols="12"
          lg="12"
        >
          <customer-view-customer-contract-list-card />
        </b-col>
        <b-col
          cols="12"
          lg="12"
        >
          <customer-view-customer-order-list-card />
        </b-col>
        <!-- <b-col
          cols="12"
          lg="12"
        >
          <customer-view-customer-mission-list-card />
        </b-col> -->
      </b-row>
    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
// import InvoiceList from '@/views/apps/invoice/invoice-list/InvoiceList.vue'
import customerStoreModule from '../customerStoreModule'
import CustomerViewCustomerInfoCard from './CustomerViewCustomerInfoCard.vue'
import CustomerViewCustomerActionCard from './CustomerViewCustomerActionCard.vue'
import CustomerViewCustomerBasicContactCard from './CustomerViewCustomerBasicContactCard.vue'
import CustomerViewCustomerActiveContractCard from './CustomerViewCustomerActiveContractCard.vue'
import CustomerViewCustomerAdditionalInformationCard from './CustomerViewCustomerAdditionalInformationCard.vue'
import CustomerViewCustomerContractListCard from './CustomerViewCustomerContractListCard.vue'
import CustomerViewCustomerOrderListCard from './CustomerViewCustomerOrderListCard.vue'
import CustomerViewCustomerLocationListCard from './CustomerViewCustomerLocationListCard.vue'
import CustomerViewCustomerContactListCard from './CustomerViewCustomerContactListCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    CustomerViewCustomerInfoCard,
    CustomerViewCustomerActionCard,
    CustomerViewCustomerBasicContactCard,
    CustomerViewCustomerActiveContractCard,
    CustomerViewCustomerAdditionalInformationCard,
    CustomerViewCustomerContractListCard,
    CustomerViewCustomerOrderListCard,
    CustomerViewCustomerLocationListCard,
    CustomerViewCustomerContactListCard,

    // InvoiceList,
  },
  setup() {
    const customerData = ref(null)

    const CUSTOMER_APP_STORE_MODULE_NAME = 'app-customer'

    // Register module
    if (!store.hasModule(CUSTOMER_APP_STORE_MODULE_NAME)) store.registerModule(CUSTOMER_APP_STORE_MODULE_NAME, customerStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CUSTOMER_APP_STORE_MODULE_NAME)) store.unregisterModule(CUSTOMER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-customer/fetchCustomer', { id: router.currentRoute.params.id })
      .then(response => { customerData.value = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          customerData.value = undefined
        }
      })

    return {
      customerData,
    }
  },
}
</script>

<style>

</style>
