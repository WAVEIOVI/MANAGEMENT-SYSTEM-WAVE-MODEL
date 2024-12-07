<template>
  <b-sidebar
    id="update-intervention-material-checklist-sidebar"
    :visible="isUpdateInterventionMaterialChecklistSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-intervention-material-checklist-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update Material Checklist
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
          <!-- Header: Raw Materials -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="DatabaseIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Raw Materials
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- raw_materials_labeled -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="raw-materials-labeled"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.raw_materials_labeled"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all raw materials are properly labeled and stored according to their properties.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- raw_materials_expired -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="raw-materials-expired"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.raw_materials_expired"
                  class="custom-control-success"
                  value="checked"
                >
                  Check that all raw materials are within their expiration dates.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- ppe_available -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="ppe-available"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.ppe_available"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all required personal protective equipment (PPE) is available and in use.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>
          <!-- Spare Parts -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="DatabaseIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Spare Parts
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- raw_materials_labeled -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="spare-parts-labeled"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.spare_parts_labeled"
                  class="custom-control-success"
                  value="checked"
                >
                  Check that all spare parts are properly labeled and stored according to their properties.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- spare_parts_working -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="spare-parts-working"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.spare_parts_working"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all spare parts are in good working condition and not damaged.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- spare_parts_expired -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="spare-parts-expired"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.spare_parts_expired"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all spare parts are within their expiration dates.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>
          <!-- Tools and Equipment -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="DatabaseIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Tools and Equipment
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- tools_labeled -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="tools-labeled"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.tools_labeled"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all tools and equipment are properly labeled and stored according to their properties.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- tools_calibrated -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="tools-calibrated"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.tools_calibrated"
                  class="custom-control-success"
                  value="checked"
                >
                  Check that all tools and equipment are in good working condition and properly calibrated.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- tools_maintained -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="tools-maintained"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.tools_maintained"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all tools and equipment are properly maintained and cleaned after use.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>
          <!-- Fire Fighting Equipment -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="DatabaseIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Fire Fighting Equipment
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- firefighting_equipment_working -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="firefighting-equipment-working"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.firefighting_equipment_working"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all fire fighting equipment is in good working condition and properly maintained.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- fire_extinguishers_charged -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="fire_extinguishers_charged"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.fire_extinguishers_charged"
                  class="custom-control-success"
                  value="checked"
                >
                  Check that all fire extinguishers are properly charged and within their expiration dates.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- fire_hoses_nozzles_stored -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="fire-hoses-nozzles-stored"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.fire_hoses_nozzles_stored"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all fire hoses, nozzles, and other equipment are properly stored and ready for use.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
          </b-row>
          <!-- Inspection Forms -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="FileIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Inspection Forms
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- inspection_forms_updated -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="inspection-forms-updated"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.inspection_forms_updated"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all inspection forms are up to date and properly completed.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- inspections_completed -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="inspections-completed"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.inspections_completed"
                  class="custom-control-success"
                  value="checked"
                >
                  Check that all inspections have been completed according to schedule.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- inspections_signed_off -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="inspections-signed-off"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.inspections_signed_off"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all inspections have been properly signed off by authorized personnel.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-col>
          </b-row>
          <!-- Maintenance Logs -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="ToolIcon"
              size="19"
            />
            <h4 class="mb-0 ml-50">
              Maintenance Logs
            </h4>
          </div>
          <b-row class="mt-1">
            <!-- maintenance_logs_updated -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="maintenance_logs_updated"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.maintenance_logs_updated"
                  class="custom-control-success"
                  value="checked"
                >
                  Verify that all maintenance logs are up to date and properly completed.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- maintenance_activities_completed -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="maintenance-activities-completed"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.maintenance_activities_completed"
                  class="custom-control-success"
                  value="checked"
                >
                  Check that all inspections have been completed according to schedule.
                </b-form-checkbox>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
            </b-col>
            <!-- maintenance_logs_signed_off -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="validationContext"
                name="maintenance-logs-signed-off"
              >
                <b-form-checkbox
                  v-model="materialChecklistData.maintenance_logs_signed_off"
                  class="custom-control-success"
                  value="checked"
                >
                  Ensure that all inspections have been properly signed off by authorized personnel.
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
    prop: 'isUpdateInterventionMaterialChecklistSidebarActive',
    event: 'update:is-update-intervention-material-checklist-sidebar-active',
  },
  props: {
    isUpdateInterventionMaterialChecklistSidebarActive: {
      type: Boolean,
      required: true,
    },
    materialChecklistData: {
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
      this.$emit('submit', this.materialChecklistData)
      this.isUpdateInterventionMaterialChecklistSidebarActive = false
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
      #update-intervention-material-checklist-sidebar {
        .vs__dropdown-menu {
          max-height: 200px !important;
        }
      }
  </style>
