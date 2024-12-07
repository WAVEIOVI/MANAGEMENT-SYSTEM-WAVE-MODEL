<template>
  <b-sidebar
    id="update-customer-location-sidebar"
    :visible="isUpdateCustomerLocationSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-customer-location-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update Location
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

          <!-- Location Id -->
          <validation-provider
            #default="validationContext"
            name="location-id"
            rules="required"
          >
            <b-form-group
              label="Location ID"
              label-for="location-id"
            >
              <b-form-input
                id="location-id"
                v-model="customerLocationData.location_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="LOC00001"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Description -->
          <validation-provider
            #default="validationContext"
            name="description"
            rules="required"
          >
            <b-form-group
              label="Description"
              label-for="description"
            >
              <v-select
                v-model="customerLocationData.location_description"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="locationDescriptionOptions"
                :clearable="false"
                input-id="description"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Contact -->
          <validation-provider
            #default="validationContext"
            name="location-contact"
            rules="required"
          >
            <b-form-group
              label="Contact (Phone)"
              label-for="location-contact"
            >
              <b-form-input
                id="location-contact"
                v-model="customerLocationData.location_phone"
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
            name="location-email"
            rules="required|email"
          >
            <b-form-group
              label="Email"
              label-for="location-email"
            >
              <b-form-input
                id="location-email"
                v-model="customerLocationData.location_email"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Address -->
          <validation-provider
            #default="validationContext"
            name="location-address"
            rules="required"
          >
            <b-form-group
              label="Address"
              label-for="location-address"
              :state="getValidationState(validationContext)"
            >
              <b-form-input
                id="location-address"
                v-model="customerLocationData.location_address"
                :state="getValidationState(validationContext)"
                trim
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Post Code -->
          <validation-provider
            #default="validationContext"
            name="postcode"
            rules="required"
          >
            <b-form-group
              label="Post Code"
              label-for="postcode"
              :state="getValidationState(validationContext)"
            >
              <b-form-input
                id="postcode"
                v-model="customerLocationData.location_postcode"
                :state="getValidationState(validationContext)"
                trim
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- City -->
          <validation-provider
            #default="validationContext"
            name="location-city"
            rules="required"
          >
            <b-form-group
              label="City"
              label-for="location-city"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerLocationData.location_city"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="cityOptions"
                :clearable="false"
                input-id="location-city"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <div>
            {{ customerLocationData.location_coordinator }}
          </div>
          <!-- COORDINATOR -->
          <validation-provider
            #default="validationContext"
            name="location-coordinator"
          >
            <b-form-group
              label="Coordinator"
              label-for="location-coordinator"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerLocationData.location_coordinator"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="contactOptions"
                :reduce="(option) => option.contact_full_name"
                :clearable="false"
                input-id="location-coordinator"
              >
                <template v-slot:option="option">
                  {{ option.contact_full_name }}
                </template>
              </v-select>
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Opening Hours -->
          <validation-provider
            #default="validationContext"
            name="opening-hours"
          >
            <b-form-group
              label="Opening Hours"
              label-for="opening-hours"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="customerLocationData.location_opening"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="openingOptions"
                :clearable="false"
                input-id="opening-hours"
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
import router from '@/router'
import store from '@/store'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
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

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isUpdateCustomerLocationSidebarActive',
    event: 'update:is-update-customer-location-sidebar-active',
  },
  props: {
    isUpdateCustomerLocationSidebarActive: {
      type: Boolean,
      required: true,
    },
    customerLocationData: {
      type: Array,
      required: true,
    },
    cityOptions: {
      type: Array,
      required: true,
    },
    locationDescriptionOptions: {
      type: Array,
      required: true,
    },
    openingOptions: {
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
      this.$emit('submit', this.customerLocationData)
      this.isUpdateCustomerLocationSidebarActive = false
      this.$emit('refetch-data')
    },
  },

  setup() {
    const { refFormObserver, getValidationState, resetForm } = formValidation()

    const contactOptions = ref([])
    const contactsData = ref(null)
    store
      .dispatch('app-location/fetchCustomerContacts', { id: router.currentRoute.params.id })
      .then(response => {
        contactsData.value = response.data.data
        contactOptions.value = contactsData.value.map(contact => ({
          contact_full_name: contact.contact_full_name,
        }))
        console.log(contactsData.value)
        console.log(contactOptions)
      })
      .catch(error => {
        if (error.response.status === 404) {
          contactsData.value = undefined
        }
      })
    return {
      contactOptions,
      contactsData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

  <style lang="scss">
  @import '~@resources/scss/vue/libs/vue-select.scss';

  #update-customer-location-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
