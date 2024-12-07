<template>
  <b-sidebar
    id="add-new-intervention-sidebar"
    :visible="isAddNewInterventionSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-intervention-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Intervention
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

          <!-- Intervention Id -->
          <validation-provider
            #default="validationContext"
            name="intervention-id"
            rules="required"
          >
            <b-form-group
              label="Intervention ID"
              label-for="intervention-id"
            >
              <b-form-input
                id="intervention-id"
                v-model="interventionData.intervention_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="MP230001"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Customer Id -->
          <validation-provider
            #default="validationContext"
            name="customer-id"
            rules="required"
          >
            <b-form-group
              label="Customer ID"
              label-for="customer-id"
            >
              <v-select
                v-model="interventionData.customer_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="customerOptions"
                :reduce="(option) => option.id"
                label="customer_name"
                :clearable="false"
                input-id="customer-id"
                @input="fetchDataAssociate"
              >
                <template v-slot:option="option">
                  {{ option.customer_id }} | {{ option.customer_name }}
                </template>
              </v-select>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Location ID -->
          <validation-provider
            #default="validationContext"
            name="location-id"
          >
            <b-form-group
              label="Location ID"
              label-for="location-id"
            >
              <v-select
                v-model="interventionData.park_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="locationOptions"
                :reduce="(option) => option.id"
                label="location_id"
                :clearable="false"
                input-id="location-id"
              >
                <template v-slot:option="option">
                  {{ option.location_id }} | {{ option.location_description }}
                </template>
              </v-select>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Order Id -->
          <validation-provider
            #default="validationContext"
            name="order-id"
          >
            <b-form-group
              label="Order ID"
              label-for="order-id"
            >
              <v-select
                v-model="interventionData.order_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="orderOptions"
                :reduce="val => val.value"
                label="order_id"
                :clearable="false"
                input-id="order-id"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Status -->
          <validation-provider
            #default="validationContext"
            name="intervention-status"
            rules="required"
          >
            <b-form-group
              label="Status"
              label-for="intervention-status"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="interventionData.intervention_status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="intervention-status"
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
    prop: 'isAddNewInterventionSidebarActive',
    event: 'update:is-add-new-intervention-sidebar-active',
  },
  props: {
    isAddNewInterventionSidebarActive: {
      type: Boolean,
      required: true,
    },
    customersData: {
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
  computed: {
    customerOptions() {
      return this.customersData.map(customer => ({
        id: customer.id,
        customer_id: customer.customer_id,
        customer_name: customer.customer_name,
      }))
    },
  },
  setup(props, { emit }) {
    const blankInterventionData = {
      intervention_id: '',
      customer_id: '',
      order_id: '',
      park_id: '',
      intervention_status: '',
    }

    const interventionData = ref(JSON.parse(JSON.stringify(blankInterventionData)))
    const resetInterventionData = () => {
      interventionData.value = JSON.parse(JSON.stringify(blankInterventionData))
    }
    const onSubmit = () => {
      store.dispatch('app-intervention/addIntervention', interventionData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-intervention-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetInterventionData)

    const locationOptions = ref([])
    const locationsData = ref(null)
    const orderOptions = ref([])
    const ordersData = ref(null)

    const fetchDataAssociate = () => {
      if (!interventionData.value.customer_id) return
      store
        .dispatch('app-intervention/fetchCustomerLocations', { id: interventionData.value.customer_id })
        .then(response => {
          locationsData.value = response.data.data
          locationOptions.value = locationsData.value.map(location => ({
            id: location.id,
            location_id: location.location_id,
            location_description: location.location_description,
          }))
          console.log(locationsData.value)
          console.log(locationOptions)
        })
        .catch(error => {
          if (error.response.status === 404) {
            locationsData.value = undefined
          }
        })
      store
        .dispatch('app-intervention/fetchCustomerOrders', { id: interventionData.value.customer_id })
        .then(response => {
          ordersData.value = response.data.data
          orderOptions.value = ordersData.value.map(order => ({
            id: order.id,
            order_id: order.order_id,
          }))
          console.log(ordersData.value)
          console.log(orderOptions)
        })
        .catch(error => {
          if (error.response.status === 404) {
            ordersData.value = undefined
          }
        })
    }
    return {
      interventionData,
      onSubmit,
      locationsData,
      locationOptions,
      fetchDataAssociate,
      ordersData,
      orderOptions,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

<style lang="scss">
@import '~@resources/scss/vue/libs/vue-select.scss';

#add-new-intervention-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
