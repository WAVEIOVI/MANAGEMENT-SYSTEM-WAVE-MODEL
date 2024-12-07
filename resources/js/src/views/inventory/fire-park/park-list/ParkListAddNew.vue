<template>
  <b-sidebar
    id="add-new-park-sidebar"
    :visible="isAddNewParkSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-park-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Park
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
            name="customer-id"
            rules="required"
          >
            <b-form-group
              label="Customer ID"
              label-for="customer-id"
            >
              <v-select
                v-model="parkData.customer_id"
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
          <div>
            <p>
              {{ parkData.customer_id }}
            </p>
          </div>

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
                v-model="parkData.location_id"
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
          <div>
            <p>
              {{ parkData.location_id }}
            </p>
          </div>

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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton,
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
    prop: 'isAddNewParkSidebarActive',
    event: 'update:is-add-new-park-sidebar-active',
  },
  props: {
    isAddNewParkSidebarActive: {
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
    const blankParkData = {
      park_id: '',
      customer_id: '',
      order_id: '',
      location_id: '',
      park_status: '',
    }

    const parkData = ref(JSON.parse(JSON.stringify(blankParkData)))
    const resetParkData = () => {
      parkData.value = JSON.parse(JSON.stringify(blankParkData))
    }
    const onSubmit = () => {
      store.dispatch('app-park/addPark', parkData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-park-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetParkData)

    const locationOptions = ref([])
    const locationsData = ref(null)
    const orderOptions = ref([])
    const ordersData = ref(null)

    const fetchDataAssociate = () => {
      if (!parkData.value.customer_id) return
      store
        .dispatch('app-park/fetchCustomerLocations', { id: parkData.value.customer_id })
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
    }
    return {
      parkData,
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

#add-new-park-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
