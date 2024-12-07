<template>
  <b-sidebar
    id="add-new-customer-order-sidebar"
    :visible="isAddNewCustomerOrderSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-customer-order-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Order
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

          <!-- Order Id -->
          <validation-provider
            #default="validationContext"
            name="order-id"
            rules="required"
          >
            <b-form-group
              label="Order ID"
              label-for="order-id"
            >
              <b-form-input
                id="order-id"
                v-model="customerData.order_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="OD230001"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Contract Id -->
          <validation-provider
            #default="validationContext"
            name="contract-id"
            rules="required"
          >
            <b-form-group
              label="Contract ID"
              label-for="contract-id"
            >
              <b-form-input
                id="contract-id"
                v-model="customerData.contract_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="CT230001"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Date -->
          <validation-provider
            #default="validationContext"
            name="order-date"
            rules="required"
          >
            <b-form-group
              label="Order Date"
              label-for="order-date"
            >
              <flat-pickr
                v-model="customerData.order_date"
                class="form-control"
                :config="{ dateFormat: 'Y-m-d'}"
                placeholder="YYYY-MM-DD"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Location ID -->
          <validation-provider
            #default="validationContext"
            name="location-id"
            rules="required"
          >
            <b-form-group
              label="Location Id"
              label-for="location-id"
            >
              <v-select
                v-model="customerData.location_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="customerDatalocation_id"
                :clearable="false"
                input-id="location-id"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- sending Types -->
          <validation-provider
            #default="validationContext"
            name="sending-type"
            rules="required"
          >
            <b-form-group
              label="Sending Type"
              label-for="sending-type"
            >
              <v-select
                v-model="customerData.sending_type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="sendingTypes"
                :clearable="false"
                input-id="sending-type"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Total -->
          <validation-provider
            #default="validationContext"
            name="total"
            rules="required"
          >
            <b-form-group
              label="Total"
              label-for="total"
            >
              <b-form-input
                id="total"
                v-model="customerData.total"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import flatPickr from 'vue-flatpickr-component'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import sendingTypes from '@/views/tools/options/sendingTypes'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,
    flatPickr,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewCustomerOrderSidebarActive',
    event: 'update:is-add-new-customer-order-sidebar-active',
  },
  props: {
    isAddNewCustomerOrderSidebarActive: {
      type: Boolean,
      required: true,
    },
    typeOptions: {
      type: Array,
      required: true,
    },
    activityOptions: {
      type: Array,
      required: true,
    },
    statusOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      required,
      email,
      sendingTypes,
    }
  },
  setup(props, { emit }) {
    const blankCustomerData = {
      customerid: '',
      customername: '',
      customeremail: '',
      customertype: null,
      customeractivity: null,
      customerstatus: null,
      customercity: '',
      customercontact: '',
    }

    const customerData = ref(JSON.parse(JSON.stringify(blankCustomerData)))
    const resetcustomerData = () => {
      customerData.value = JSON.parse(JSON.stringify(blankCustomerData))
    }

    const onSubmit = () => {
      store.dispatch('app-customer/addCustomer', customerData.value)
        .then(() => {
          //   console.log(customerData.data)
          //   console.log(customerData)
          console.log(customerData)
        })
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-customer-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetcustomerData)

    return {
      customerData,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

  <style lang="scss">
  @import '~@resources/scss/vue/libs/vue-select.scss';

  #add-new-customer-order-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
