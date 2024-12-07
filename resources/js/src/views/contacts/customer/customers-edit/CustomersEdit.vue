<template>
  <component :is="customerData === undefined ? 'div' : 'b-card'">

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

    <b-tabs
      v-if="customerData"
      pills
    >

      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="TagIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Account</span>
        </template>
        <customer-edit-tab-account
          :customer-data="customerData"
          :type-options="typeOptions"
          :activity-options="activityOptions"
          :status-options="statusOptions"
          class="mt-2 pt-75"
          @submit="onSubmit"
        />
      </b-tab>

      <!-- Tab: Account -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="FileIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Basic Contact</span>
        </template>
        <customer-edit-tab-basic-contact
          :customer-data="customerData"
          :language-options="languageOptions"
          :gender-options="genderOptions"
          :contact-type-options="contactTypeOptions"
          :city-options="cityOptions"
          :country-options="countryOptions"
          class="mt-2 pt-75"
          @submit="onSubmit"
        />
      </b-tab>

      <!-- Tab: Additional Information  -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="FilePlusIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Info.+</span>
        </template>
        <customer-edit-tab-additional-info
          :customer-data="customerData"
          class="mt-2 pt-75"
          @submit="onSubmit"
        />
      </b-tab>

      <!-- Tab: Contacts -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="UsersIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Contacts</span>
        </template>
        <customer-edit-tab-contacts class="mt-2 pt-75" />
      </b-tab>

      <!-- Tab: Locations -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="MapPinIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Locations</span>
        </template>
        <customer-edit-tab-locations
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Contracts -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="AwardIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Contracts</span>
        </template>
        <customer-edit-tab-contracts
          :customer-data="customerData"
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Orders -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="ShoppingCartIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Orders</span>
        </template>
        <customer-edit-tab-orders
          :customer-data="customerData"
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Price List -->
      <!-- <b-tab>
        <template #title>
          <feather-icon
            icon="ShoppingBagIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Price List</span>
        </template>
        <customer-edit-tab-price-list
          class="mt-2 pt-75"
        />
      </b-tab> -->
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,
} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import customerStoreModule from '../customerStoreModule'
import CustomerEditTabAccount from './CustomerEditTabAccount.vue'
import CustomerEditTabBasicContact from './CustomerEditTabBasicContact.vue'
import CustomerEditTabAdditionalInfo from './CustomerEditTabAdditionalInfo.vue'
import CustomerEditTabContacts from './customer-edit-tab-contacts/CustomerEditTabContacts.vue'
import CustomerEditTabLocations from './customer-edit-tab-locations/CustomerEditTabLocations.vue'
import CustomerEditTabContracts from './customer-edit-tab-contracts/CustomerEditTabContracts.vue'
import CustomerEditTabOrders from './customer-edit-tab-orders/CustomerEditTabOrders.vue'
// import CustomerEditTabPriceList from './customer-edit-tab-price-list/CustomerEditTabPriceList.vue'
import useCustomersOptions from '../useCustomersOptions'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    CustomerEditTabAccount,
    CustomerEditTabBasicContact,
    CustomerEditTabAdditionalInfo,
    CustomerEditTabContacts,
    CustomerEditTabLocations,
    CustomerEditTabContracts,
    // CustomerEditTabPriceList,
    CustomerEditTabOrders,
  },
  setup() {
    const CUSTOMER_APP_STORE_MODULE_NAME = 'app-customer'

    // Register module
    if (!store.hasModule(CUSTOMER_APP_STORE_MODULE_NAME)) store.registerModule(CUSTOMER_APP_STORE_MODULE_NAME, customerStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CUSTOMER_APP_STORE_MODULE_NAME)) store.unregisterModule(CUSTOMER_APP_STORE_MODULE_NAME)
    })
    const customerData = ref(null)
    const toast = useToast()

    store.dispatch('app-customer/fetchCustomer', { id: router.currentRoute.params.id })
      .then(response => {
        customerData.value = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          customerData.value = undefined
        }
      })
    const onSubmit = () => {
      store.dispatch('app-customer/updateCustomer',
        { id: router.currentRoute.params.id, customerData: customerData.value })
        .then(response => {
          customerData.value = response.data.data
          console.log(response.data)
          console.log('form submitted')
        })
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Form successfully submitted!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }
    const {
      typeOptions,
      activityOptions,
      statusOptions,
      languageOptions,
      genderOptions,
      contactTypeOptions,
      cityOptions,
      countryOptions,
    } = useCustomersOptions()

    return {
      customerData,
      onSubmit,
      activityOptions,
      statusOptions,
      typeOptions,
      languageOptions,
      genderOptions,
      contactTypeOptions,
      cityOptions,
      countryOptions,
    }
  },
}
</script>

<style>

</style>
