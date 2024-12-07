<template>
  <b-sidebar
    id="add-new-report-sidebar"
    :visible="isAddNewReportSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-report-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Report
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

          <!-- Report Id -->
          <validation-provider
            #default="validationContext"
            name="report-id"
            rules="required"
          >
            <b-form-group
              label="Report ID"
              label-for="report-id"
            >
              <b-form-input
                id="report-id"
                v-model="reportData.report_id"
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

          <!-- Report Type -->
          <validation-provider
            #default="validationContext"
            name="report-type"
            rules="required"
          >
            <b-form-group
              label="Report Type"
              label-for="report-type"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="reportData.report_type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="typeOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="report-type"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Mission Id -->
          <validation-provider
            #default="validationContext"
            name="mission-id"
            rules="required"
          >
            <b-form-group
              label="Mission ID"
              label-for="mission-id"
            >
              <v-select
                v-model="reportData.mission_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="missionOptions"
                :reduce="(option) => option.id"
                label="mission_name"
                :clearable="false"
                input-id="mission-id"
                @input="fetchDataAssociate"
              >
                <template v-slot:option="option">
                  {{ option.mission_id }} | {{ option.mission_name }}
                </template>
              </v-select>

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
    prop: 'isAddNewReportSidebarActive',
    event: 'update:is-add-new-report-sidebar-active',
  },
  props: {
    isAddNewReportSidebarActive: {
      type: Boolean,
      required: true,
    },
    customersData: {
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
    missionOptions() {
      return this.missionsData.map(mission => ({
        id: mission.id,
        mission_id: mission.mission_id,
      }))
    },
  },
  setup(props, { emit }) {
    const blankReportData = {
      report_id: '',
      report_type: '',
      intervention_frequency: '',
      customer_id: '',
      order_id: '',
      park_id: '',
      report_status: '',
    }

    const reportData = ref(JSON.parse(JSON.stringify(blankReportData)))
    const resetReportData = () => {
      reportData.value = JSON.parse(JSON.stringify(blankReportData))
    }
    const onSubmit = () => {
      store.dispatch('app-report/addReport', reportData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-report-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetReportData)

    const locationOptions = ref([])
    const locationsData = ref(null)
    const orderOptions = ref([])
    const ordersData = ref(null)

    const fetchDataAssociate = () => {
      if (!reportData.value.customer_id) return
      store
        .dispatch('app-report/fetchCustomerLocations', { id: reportData.value.customer_id })
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
        .dispatch('app-report/fetchCustomerOrders', { id: reportData.value.customer_id })
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
      reportData,
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

#add-new-report-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
