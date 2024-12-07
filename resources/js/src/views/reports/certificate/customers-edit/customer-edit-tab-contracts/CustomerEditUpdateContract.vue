<template>
  <b-sidebar
    id="update-customer-contract-sidebar"
    :visible="isUpdateCustomerContractSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-customer-contract-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update Contract
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
              Update
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
// import router from '@/router'
// import store from '@/store'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

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
    prop: 'isUpdateCustomerContractSidebarActive',
    event: 'update:is-update-customer-contract-sidebar-active',
  },
  props: {
    isUpdateCustomerContractSidebarActive: {
      type: Boolean,
      required: true,
    },
    customerContractData: {
      type: Array,
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
  methods: {
    onSubmit() {
      this.$emit('submit', this.customerContractData)
      this.isUpdateCustomerContractSidebarActive = false
      this.$emit('refetch-contract-data')
    },
  },

  setup() {
    const { refFormObserver, getValidationState, resetForm } = formValidation()

    return {
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

  <style lang="scss">
  @import '~@resources/scss/vue/libs/vue-select.scss';

  #update-customer-contract-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
