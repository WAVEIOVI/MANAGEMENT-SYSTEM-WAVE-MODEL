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
                v-model="customerOrderData.order_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="PO000001"
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
          >
            <b-form-group
              label="Contract ID"
              label-for="contract-id"
            >
              <b-form-input
                id="contract-id"
                v-model="customerOrderData.order_contract_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="CT000001"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Order Date -->
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
                v-model="customerOrderData.order_date"
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
            name="order-location"
          >
            <b-form-group
              label="Location ID"
              label-for="order-location"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerOrderData.order_location_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="planOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="order-location"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Order sending type -->
          <validation-provider
            #default="validationContext"
            name="order-sending-type"
            rules="required"
          >
            <b-form-group
              label="Order Sending Type"
              label-for="order-sending-type"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerOrderData.order_sending_type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="sendingTypeOptions"
                :clearable="false"
                input-id="order-sending-type"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Total -->
          <validation-provider
            #default="validationContext"
            name="order-total"
            rules="required"
          >
            <b-form-group
              label="Order TOTAL"
              label-for="order-total"
            >
              <b-form-input
                id="order-total"
                v-model="customerOrderData.order_total"
                autofocus
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Status -->
          <validation-provider
            #default="validationContext"
            name="order-status"
            rules="required"
          >
            <b-form-group
              label="Status"
              label-for="order-status"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerOrderData.order_status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="order-status"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Note -->
          <validation-provider
            #default="validationContext"
            name="order-note"
          >
            <b-form-group
              label="Note"
              label-for="order-note"
            >
              <b-form-input
                id="order-note"
                v-model="customerOrderData.order_note"
                autofocus
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
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
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
    sendingTypeOptions: {
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
    }
  },
  setup(props, { emit }) {
    const blankCustomerOrderData = {
      order_id: '',
      order_contract_id: '',
      order_date: '',
      order_location_id: '',
      order_sending_type: '',
      order_total: '',
      order_status: '',
      order_note: '',
    }

    const customerOrderData = ref(JSON.parse(JSON.stringify(blankCustomerOrderData)))
    const resetcustomerData = () => {
      customerOrderData.value = JSON.parse(JSON.stringify(blankCustomerOrderData))
    }

    const onSubmit = () => {
      store.dispatch('app-order/addCustomerOrder', { id: router.currentRoute.params.id, customerOrderData: customerOrderData.value })
        .then(() => {
          emit('refetch-order-data')
          emit('update:is-add-new-customer-order-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetcustomerData)

    return {
      customerOrderData,
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
   @import '~@resources/scss/vue/libs/vue-flatpicker.scss';

  #add-new-customer-order-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
