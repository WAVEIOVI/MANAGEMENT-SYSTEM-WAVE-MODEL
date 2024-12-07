<template>
  <b-sidebar
    id="update-intervention-report-sidebar"
    :visible="isUpdateInterventionReportSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    width="100%"
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-intervention-report-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update Report
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- Header -->
      <b-card-body class="invoice-padding pb-0">

        <b-row>
          <b-col cols="7">

            <!-- Header: Left Content -->
            <p class="card-text mb-25">
              {{ reportData.customer_id }}
            </p>
            <p class="card-text mb-25">
              {{ reportData.customer_name }}
            </p>
            <p class="card-text mb-0">
              {{ reportData.location_id }}
            </p>
            <p class="card-text mb-0">
              {{ reportData.location_address }}
            </p>
            <p class="card-text mb-0">
              {{ reportData.customer_coordinator }}
            </p>
            <p class="card-text mb-0">
              {{ reportData.coordinator_post }}
            </p>
            <p class="card-text mb-0">
              {{ reportData.coordinator_phone }} | {{ reportData.coordinator_email }}
            </p>
          </b-col>
          <b-col
            cols="5"
            class="text-right"
          >

            <!-- Header: Right Content -->
            <h5 class="invoice-title">
              Intervention
              <span class="invoice-number">#{{ reportData.mission_id }}</span>
            </h5>
            <div class="invoice-date-wrapper">
              <p class="card-text mb-0">
                Mission Date:
                {{ reportData.mission_date }}
              </p>
            </div>
            <div class="invoice-date-wrapper">
              <p class="card-text mb-0">
                Intervention Date:
                {{ reportData.intervention_date }}
              </p>
            </div>
            <br>
            <div>
              <p class="card-text mb-0">
                Team Leader:
                {{ reportData.team_leader }}
              </p>
            </div>
            <div>
              <p class="card-text mb-0">
                Team:
                {{ reportData.team }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
      <!-- Spacer -->
      <hr class="invoice-spacing">
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

          <b-row class="mt-1">
            <b-col
              cols="12"
              lg="6"
            >
              <!-- observations-->
              <validation-provider
                #default="validationContext"
                name="observations"
              >
                <b-form-group
                  label="Observations"
                  label-for="observations"
                >
                  <b-form-textarea
                    id="textarea-no-resize"
                    v-model="reportData.observations"
                    no-resize
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              lg="6"
            >
              <!-- Recommendations -->
              <validation-provider
                #default="validationContext"
                name="recommendations"
              >
                <b-form-group
                  label="Recommendations"
                  label-for="recommendations"
                >
                  <b-form-textarea
                    id="textarea-no-resize"
                    v-model="reportData.recommendations"
                    no-resize
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
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
              Approved
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
      <!-- Spacer -->
      <hr class="invoice-spacing">
      <intervention-view-tasks />
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormTextarea, BFormInvalidFeedback, BButton, BRow, BCol, BCardBody,
} from 'bootstrap-vue'
// import router from '@/router'
// import store from '@/store'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
// import vSelect from 'vue-select'
import InterventionViewTasks from '../../interventions-equipment/InterventionViewTasksReportCustomer.vue'

export default {
  components: {
    BSidebar,
    BForm,
    BRow,
    BCol,
    BCardBody,
    BFormGroup,
    BFormTextarea,
    BFormInvalidFeedback,
    BButton,
    // vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
    InterventionViewTasks,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isUpdateInterventionReportSidebarActive',
    event: 'update:is-update-intervention-report-sidebar-active',
  },
  props: {
    isUpdateInterventionReportSidebarActive: {
      type: Boolean,
      required: true,
    },
    reportData: {
      type: Object,
      required: true,
    },
    // reportDescriptionOptions: {
    //   type: Array,
    //   required: true,
    // },
  },
  data() {
    return {
      required,
      email,
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.reportData)
      this.isUpdateInterventionReportSidebarActive = false
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
    #update-intervention-report-sidebar {
      .vs__dropdown-menu {
        max-height: 200px !important;
      }
    }
</style>

<style lang="scss" scoped>
@import "~@resources/scss/base/pages/app-invoice.scss";
</style>
