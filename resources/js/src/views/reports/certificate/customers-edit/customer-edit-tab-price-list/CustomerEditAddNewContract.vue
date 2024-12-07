<template>
  <b-sidebar
    id="add-new-customer-contract-sidebar"
    :visible="isAddNewCustomerContractSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-customer-contract-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Contract
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
                v-model="customerContractData.contract_id"
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

          <!-- Contract Date -->
          <validation-provider
            #default="validationContext"
            name="contract-date"
            rules="required"
          >
            <b-form-group
              label="Contract Date"
              label-for="contract-date"
            >
              <flat-pickr
                v-model="customerContractData.contract_date"
                class="form-control"
                :config="{ dateFormat: 'Y-m-d'}"
                placeholder="YYYY-MM-DD"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Plan -->
          <validation-provider
            #default="validationContext"
            name="contract-plan"
            rules="required"
          >
            <b-form-group
              label="Plan"
              label-for="contract-plan"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerContractData.contract_plan"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="planOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="contract-plan"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Start Date -->
          <validation-provider
            #default="validationContext"
            name="contract-start-date"
            rules="required"
          >
            <b-form-group
              label="Contract Start Date"
              label-for="contract-start-date"
            >
              <flat-pickr
                v-model="customerContractData.contract_start_date"
                class="form-control"
                :config="{ dateFormat: 'Y-m-d'}"
                placeholder="YYYY-MM-DD"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- End Date -->
          <validation-provider
            #default="validationContext"
            name="contract-end-date"
            rules="required"
          >
            <b-form-group
              label="Contract End Date"
              label-for="contract-end-date"
            >
              <flat-pickr
                v-model="customerContractData.contract_end_date"
                class="form-control"
                :config="{ dateFormat: 'Y-m-d'}"
                placeholder="YYYY-MM-DD"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- payment method -->
          <validation-provider
            #default="validationContext"
            name="contract-payment-method"
            rules="required"
          >
            <b-form-group
              label="Payment Method"
              label-for="contract-payment-method"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerContractData.contract_payment_method"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="paymentMethodOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="contract-payment-method"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- payment deadline -->
          <validation-provider
            #default="validationContext"
            name="contract-payment-deadline"
            rules="required"
          >
            <b-form-group
              label="Payment Deadline"
              label-for="contract-payment-deadline"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerContractData.contract_payment_deadline"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="paymentDeadlineOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="contract-payment-deadline"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Exclucivity Clause -->
          <validation-provider
            #default="validationContext"
            name="contract-"
            rules="required"
          >
            <b-form-group
              label="Exclusivity Clause"
              label-for="exclusivity-clause"
              label-class="mb-1"
            >
              <b-form-radio-group
                id="exclusivity-clause"
                v-model="customerContractData.contract_exclusivity_clause"
                :options="exclusivityClause"
                value="male"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Status -->
          <validation-provider
            #default="validationContext"
            name="contract-status"
            rules="required"
          >
            <b-form-group
              label="Status"
              label-for="contract-status"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerContractData.contract_status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="contract-status"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
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
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton, BFormRadioGroup,
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
    BFormRadioGroup,
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
    prop: 'isAddNewCustomerContractSidebarActive',
    event: 'update:is-add-new-customer-contract-sidebar-active',
  },
  props: {
    isAddNewCustomerContractSidebarActive: {
      type: Boolean,
      required: true,
    },
    planOptions: {
      type: Array,
      required: true,
    },
    paymentDeadlineOptions: {
      type: Array,
      required: true,
    },
    paymentMethodOptions: {
      type: Array,
      required: true,
    },
    exclusivityClause: {
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
    const blankCustomerContractData = {
      contract_date: '',
      contract_id: '',
      contract_plan: '',
      contract_start_date: '',
      contract_end_date: '',
      contract_payment_method: '',
      contract_payment_deadline: '',
      contract_exclusivity_clause: '',
      contract_status: '',
    }

    const customerContractData = ref(JSON.parse(JSON.stringify(blankCustomerContractData)))
    const resetcustomerData = () => {
      customerContractData.value = JSON.parse(JSON.stringify(blankCustomerContractData))
    }

    const onSubmit = () => {
      store.dispatch('app-contract/addCustomerContract', { id: router.currentRoute.params.id, customerContractData: customerContractData.value })
        .then(() => {
          emit('refetch-contract-data')
          emit('update:is-add-new-customer-contract-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetcustomerData)

    return {
      customerContractData,
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

  #add-new-customer-contract-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
