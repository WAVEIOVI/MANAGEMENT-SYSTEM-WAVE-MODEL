<template>
  <b-sidebar
    id="add-new-customer-sidebar"
    :visible="isAddNewCustomerSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-customer-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Customer
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
          <!-- Customer Id -->
          <validation-provider
            #default="validationContext"
            name="customerid"
          >
            <b-form-group
              label="Customer ID"
              label-for="customerid"
            >
              <b-form-input
                id="customerid"
                :value="nextCustomerId"
                readonly
                autofocus
                :state="getValidationState(validationContext)"
                trim
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Customername -->
          <validation-provider
            #default="validationContext"
            name="Customername"
            rules="required"
          >
            <b-form-group
              label="Customer Name"
              label-for="customername"
            >
              <b-form-input
                id="customername"
                v-model="customerData.customer_name"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Contact -->
          <validation-provider
            #default="validationContext"
            name="customercontact"
            rules="required"
          >
            <b-form-group
              label="Contact (Phone)"
              label-for="customercontact"
            >
              <b-form-input
                id="customercontact"
                v-model="customerData.customer_phone"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Email -->
          <validation-provider
            #default="validationContext"
            name="customer-email"
            rules="required|email"
          >
            <b-form-group
              label="Email"
              label-for="customer-email"
            >
              <b-form-input
                id="customer-email"
                v-model="customerData.customer_email"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- City -->
          <validation-provider
            #default="validationContext"
            name="customer-city"
            rules="required"
          >
            <b-form-group
              label="City"
              label-for="customer-city"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerData.customer_city"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="cityOptions"
                :clearable="false"
                input-id="customer-city"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Customer Type -->
          <validation-provider
            #default="validationContext"
            name="customertype"
            rules="required"
          >
            <b-form-group
              label="Customer Type"
              label-for="customer-type"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerData.customer_type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="typeOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="customer-type"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Activity Area -->
          <validation-provider
            #default="validationContext"
            name="customer-activity"
            rules="required"
          >
            <b-form-group
              label="Activity Area"
              label-for="customer-activity"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerData.customer_activity"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="activityOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="customer-activity"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Status -->
          <validation-provider
            #default="validationContext"
            name="customer-status"
            rules="required"
          >
            <b-form-group
              label="Status"
              label-for="customer-status"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerData.customer_status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="customer-status"
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
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
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

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewCustomerSidebarActive',
    event: 'update:is-add-new-customer-sidebar-active',
  },
  props: {
    isAddNewCustomerSidebarActive: {
      type: Boolean,
      required: true,
    },
    nextCustomerId: {
      type: String,
      required: true,
    },
    cityOptions: {
      type: Array,
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
    }
  },
  setup(props, { emit }) {
    const blankCustomerData = {
      customer_name: '',
      customer_email: '',
      customer_type: null,
      customer_activity: null,
      customer_status: null,
      customer_city: '',
      customer_phone: '',
    }
    const customerData = ref(JSON.parse(JSON.stringify(blankCustomerData)))
    const resetcustomerData = () => {
      customerData.value = JSON.parse(JSON.stringify(blankCustomerData))
    }
    const onSubmit = () => {
      store.dispatch('app-customer/addCustomer', customerData.value)
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

#add-new-customer-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
