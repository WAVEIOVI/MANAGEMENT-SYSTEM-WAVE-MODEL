<template>
  <b-sidebar
    id="update-intervention-general-checklist-sidebar"
    :visible="isUpdateInterventionGeneralChecklistSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-intervention-general-checklist-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update General Checklist
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
          <!-- Header: Personal Info -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="FileIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Documentation
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- Employee Information -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="employee-information"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.employee_information"
                  class="custom-control-success"
                  value="checked"
                >
                  Employee Information
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- work-orders -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="work-orders"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.work_orders"
                  class="custom-control-success"
                  value="checked"
                >
                  Work-Orders
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- Team Information -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="team-information"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.team_information"
                  class="custom-control-success"
                  value="checked"
                >
                  Team Information
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- CIN -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="cin"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.cin"
                  class="custom-control-success"
                  value="checked"
                >
                  CIN
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- Driver's License -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="driver-license"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.driver_license"
                  class="custom-control-success"
                  value="checked"
                >
                  Driver's License
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- Vehicle Insurance -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="vehicle-insurance"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.vehicle_insurance"
                  class="custom-control-success"
                  value="checked"
                >
                  Vehicle Insurance
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- Vehicle Registration -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="vehicle-registration"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.vehicle_registration"
                  class="custom-control-success"
                  value="checked"
                >
                  Vehicle Registration
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>
          <!-- Header: PPE -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="UserIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Personal Protective Equipment
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- PPE -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="ppe"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.ppe"
                  class="custom-control-success"
                  value="checked"
                >
                  PPE (Hard Hat; Safety Glasses; Gloves; Safety Shoes; Respirator/Mask)
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>
          <!-- Emergency Kit -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="AlertTriangleIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Emergency Kit
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- First Aid Kit -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="first-aid-kit"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.first_aid_kit"
                  class="custom-control-success"
                  value="checked"
                >
                  First Aid Kit
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- fire-extinguisher -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="fire-extinguisher"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.fire_extinguisher"
                  class="custom-control-success"
                  value="checked"
                >
                  Fire Extinguisher
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>
          <!-- Vehicle Maintenance -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="TruckIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Vehicle Maintenance
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- Fuel Level -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="fuel-level"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.fuel_level"
                  class="custom-control-success"
                  value="checked"
                >
                  Fuel Level
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- Tire Pressure -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="tire-pressure"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.tire_pressure"
                  class="custom-control-success"
                  value="checked"
                >
                  Tire Pressure
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- Spare Tire -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="spare-tire"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.spare_tire"
                  class="custom-control-success"
                  value="checked"
                >
                  Spare Tire
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- Windshield Wipers -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="windshield-wipers"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.windshield_wipers"
                  class="custom-control-success"
                  value="checked"
                >
                  Windshield Wipers
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- lights -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="lights"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.lights"
                  class="custom-control-success"
                  value="checked"
                >
                  Lights (Headlights, Taillights, Brake Lights, Turn Signals)
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- Brakes -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="brakes"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.brakes"
                  class="custom-control-success"
                  value="checked"
                >
                  Brakes
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- Battery -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="battery"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.battery"
                  class="custom-control-success"
                  value="checked"
                >
                  Battery
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- Transmission Fluid -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="transmission-fluid"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.transmission_fluid"
                  class="custom-control-success"
                  value="checked"
                >
                  Transmission Fluid
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- Engine Oil Level -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="engine-oil-level"
              >
                <b-form-checkbox
                  v-model="generalChecklistData.engine_oil_level"
                  class="custom-control-success"
                  value="checked"
                >
                  Engine Oil Level
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>
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
  BSidebar, BForm, BButton, BFormCheckbox, BFormInvalidFeedback, BRow, BCol,
//    BFormTextarea,   BCardBody, BFormGroup,
} from 'bootstrap-vue'
// import router from '@/router'
// import store from '@/store'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
// import vSelect from 'vue-select'

export default {
  components: {
    BSidebar,
    BForm,
    BFormCheckbox,
    BRow,
    BCol,
    // BCardBody,
    // BFormGroup,
    // BFormTextarea,
    BFormInvalidFeedback,
    BButton,
    // vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isUpdateInterventionGeneralChecklistSidebarActive',
    event: 'update:is-update-intervention-general-checklist-sidebar-active',
  },
  props: {
    isUpdateInterventionGeneralChecklistSidebarActive: {
      type: Boolean,
      required: true,
    },
    generalChecklistData: {
      type: Object,
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
      this.$emit('submit', this.generalChecklistData)
      this.isUpdateInterventionGeneralChecklistSidebarActive = false
      this.$emit('refetch-data')
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
    @import '~@resources/scss/vue/libs/vue-flatpicker.scss';
    #update-intervention-general-checklist-sidebar {
      .vs__dropdown-menu {
        max-height: 200px !important;
      }
    }
</style>
