<template>
  <b-sidebar
    id="update-intervention-area-checklist-sidebar"
    :visible="isUpdateInterventionAreaChecklistSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-intervention-area-checklist-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update Work Area Checklist
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

          <!-- Site Assessment -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="MapPinIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Site Assessment
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- hazards -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="hazards"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.hazards"
                  class="custom-control-success"
                  value="checked"
                >
                  Check for any hazards or safety concerns in the work area.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- work_zone -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="work-zone"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.work_zone"
                  class="custom-control-success"
                  value="checked"
                >
                  Establish a safe work zone and clearly mark it with signage and barriers.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- customer_notification -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="customer-notification"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.customer_notification"
                  class="custom-control-success"
                  value="checked"
                >
                  Notify the customer of any identified hazards.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>

          <!-- Fire Equipment Inspection -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="DatabaseIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Fire Equipment Inspection
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- fire_equipment_access -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="fire-equipment-access"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.fire_equipment_access"
                  class="custom-control-success"
                  value="checked"
                >
                  Check that all fire equipment is easily accessible and unobstructed.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- fire_alarm_sprinklers -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="fire-alarm-sprinklers"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.fire_alarm_sprinklers"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that fire alarms and sprinklers are in good working condition.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>

          <!-- Equipment Storage -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="DatabaseIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Equipment Storage
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- equipment_storage -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="equipment-storage"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.equipment_storage"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all equipment and materials are stored in designated areas.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- material_storage -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="material-storage"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.material_storage"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all materials are properly labeled and stored according to their properties
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>
          <!-- Electrical Safety -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="AlertCircleIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Electrical Safety
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- electrical-outlets-wiring -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="electrical-outlets-wiring"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.electrical_outlets_wiring"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all electrical outlets and wiring are in good working condition.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- electrical_equipment -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="work-zone"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.electrical_equipment"
                  class="custom-control-success"
                  value="checked"
                >
                  Check that all electrical equipment is properly grounded.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- electrical_panels_breakers -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="electrical-panels-breakers"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.electrical_panels_breakers"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that electrical panels and circuit breakers are properly labeled and accessible.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>
          <!-- Fall Protection -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="AlertCircleIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Fall Protection
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- ladders_scaffolds_elevated -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="ladders-scaffolds-elevated"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.ladders_scaffolds_elevated"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all ladders, scaffolds, and elevated work areas are secure and stable.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- fall_protection -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="fall-protection"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.fall_protection"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all fall protection equipment is properly maintained and in good working condition.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>

          <!-- Emergency Procedures -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="AlertTriangleIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Emergency Procedures
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- emergency_evacuation_plan -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="emergency-evacuation-plan"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.emergency_evacuation_plan"
                  class="custom-control-success"
                  value="checked"
                >
                  Establish an emergency evacuation plan and ensure that all team members are aware of it.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- emergency_contact_info -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="emergency-contact-info"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.emergency_contact_info"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all necessary emergency contact information is posted in a visible location.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
            <!-- emergency_equipment_access -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="emergency-equipment-access"
              >
                <b-form-checkbox
                  v-model="areaChecklistData.emergency_equipment_access"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all emergency equipment, such as first aid kits and fire extinguishers, is accessible and in good working condition.
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
    prop: 'isUpdateInterventionAreaChecklistSidebarActive',
    event: 'update:is-update-intervention-area-checklist-sidebar-active',
  },
  props: {
    isUpdateInterventionAreaChecklistSidebarActive: {
      type: Boolean,
      required: true,
    },
    areaChecklistData: {
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
      this.$emit('submit', this.areaChecklistData)
      this.isUpdateInterventionAreaChecklistSidebarActive = false
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
      #update-intervention-area-checklist-sidebar {
        .vs__dropdown-menu {
          max-height: 200px !important;
        }
      }
  </style>
