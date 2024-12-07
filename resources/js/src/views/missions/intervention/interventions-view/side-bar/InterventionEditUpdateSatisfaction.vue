<template>
  <b-sidebar
    id="update-intervention-satisfaction-sidebar"
    :visible="isUpdateInterventionSatisfactionSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    width="70%"
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-intervention-satisfaction-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update Satisfaction
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
              {{ satisfactionData.customer_id }}
            </p>
            <p class="card-text mb-25">
              {{ satisfactionData.customer_name }}
            </p>
            <p class="card-text mb-0">
              {{ satisfactionData.location_id }}
            </p>
            <p class="card-text mb-0">
              {{ satisfactionData.location_address }}
            </p>
            <p class="card-text mb-0">
              {{ satisfactionData.customer_coordinator }}
            </p>
            <p class="card-text mb-0">
              {{ satisfactionData.coordinator_post }}
            </p>
            <p class="card-text mb-0">
              {{ satisfactionData.coordinator_phone }} | {{ satisfactionData.coordinator_email }}
            </p>
          </b-col>
          <b-col
            cols="5"
            class="text-right"
          >

            <!-- Header: Right Content -->
            <h5 class="invoice-title">
              Intervention
              <span class="invoice-number">#{{ satisfactionData.mission_id }}</span>
            </h5>
            <div class="invoice-date-wrapper">
              <p class="card-text mb-0">
                Mission Date:
                {{ satisfactionData.mission_date }}
              </p>
            </div>
            <div class="invoice-date-wrapper">
              <p class="card-text mb-0">
                Intervention Date:
                {{ satisfactionData.intervention_date }}
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
          <!-- quality_of_service -->
          <validation-provider
            #default="validationContext"
            name="quality-of-service"
          >
            <b-form-group
              label="How satisfied were you with the quality of service provided by our team?"
              label-for="quality-of-service"
            >
              <b-col
                cols="4"
              >
                <v-select
                  v-model="satisfactionData.quality_of_service"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="qualityOfServiceOptions"
                  :reduce="val => val.value"
                  label="text"
                  :clearable="false"
                  input-id="quality-of-service"
                />
              </b-col>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- knowledgeable_about_equipment -->
          <validation-provider
            #default="validationContext"
            name="knowledgeable-about-equipment"
          >
            <b-form-group
              label="How knowledgeable was our team about the firefighting equipment they were inspecting and maintaining?"
              label-for="knowledgeable-about-equipment"
            >
              <b-col
                cols="4"
              >
                <v-select
                  v-model="satisfactionData.knowledgeable_about_equipment"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="knowledgeableAboutEquipmentOptions"
                  :reduce="val => val.value"
                  label="text"
                  :clearable="false"
                  input-id="knowledgeable-about-equipment"
                />
              </b-col>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- arrived_on_time -->
          <validation-provider
            #default="validationContext"
            name="arrived-on-time"
          >
            <b-form-group
              label="Did our team arrive on time for the scheduled appointment?"
              label-for="arrived-on-time"
            >
              <b-col
                cols="4"
              >
                <v-select
                  v-model="satisfactionData.arrived_on_time"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="arrivedOnTimeOptions"
                  :reduce="val => val.value"
                  label="text"
                  :clearable="false"
                  input-id="arrived-on-time"
                />
              </b-col>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- communication_during_process -->
          <validation-provider
            #default="validationContext"
            name="communication-during-process"
          >
            <b-form-group
              label="How well did our team communicate with you during the inspection and maintenance process?"
              label-for="communication-during-process"
            >
              <b-col
                cols="4"
              >
                <v-select
                  v-model="satisfactionData.communication_during_process"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="communicationDuringProcessOptions"
                  :reduce="val => val.value"
                  label="text"
                  :clearable="false"
                  input-id="communication-during-process"
                />
              </b-col>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- explanations-understandable -->
          <validation-provider
            #default="validationContext"
            name="explanations-understandable"
          >
            <b-form-group
              label="Did our team explain the results of the inspection and maintenance in a way that was easy for you to understand?"
              label-for="explanations-understandable"
            >
              <b-col
                cols="6 "
              >
                <v-select
                  v-model="satisfactionData.explanations_understandable"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="explanationsUnderstandableOptions"
                  :reduce="val => val.value"
                  label="text"
                  :clearable="false"
                  input-id="explanations-understandable"
                />
              </b-col>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- likely-to-recommend -->
          <validation-provider
            #default="validationContext"
            name="likely-to-recommend"
          >
            <b-form-group
              label="Did our team explain the results of the inspection and maintenance in a way that was easy for you to understand?"
              label-for="likely-to-recommend"
            >
              <b-col
                cols="4"
              >
                <v-select
                  v-model="satisfactionData.likely_to_recommend"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="likelyToRecommendOptions"
                  :reduce="val => val.value"
                  label="text"
                  :clearable="false"
                  input-id="likely-to-recommend"
                />
              </b-col>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- feedback -->
          <validation-provider
            #default="validationContext"
            name="feedback"
          >
            <b-form-group
              label="Is there anything we could have done better to improve your experience with our services?"
              label-for="feedback"
            >
              <b-col
                cols="12"
              >
                <b-form-textarea
                  id="textarea-no-resize"
                  v-model="satisfactionData.feedback"
                  no-resize
                />
              </b-col>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <b-card-body>
            Thank you for taking the time to complete this survey. Your feedback is valuable to us and will help us improve our services in the future.
          </b-card-body>

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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton, BRow, BCol, BCardBody, BFormTextarea,
} from 'bootstrap-vue'
// import router from '@/router'
// import store from '@/store'
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
    // BFormInput,
    BFormTextarea,
    BFormInvalidFeedback,
    BButton,
    BRow,
    BCol,
    BCardBody,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isUpdateInterventionSatisfactionSidebarActive',
    event: 'update:is-update-intervention-satisfaction-sidebar-active',
  },
  props: {
    isUpdateInterventionSatisfactionSidebarActive: {
      type: Boolean,
      required: true,
    },
    satisfactionData: {
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
      this.$emit('submit', this.satisfactionData)
      this.isUpdateInterventionSatisfactionSidebarActive = false
      this.$emit('refetch-data')
    },
  },

  setup() {
    const { refFormObserver, getValidationState, resetForm } = formValidation()
    const qualityOfServiceOptions = ref([
      { text: 'a. Extremely satisfied', value: 'Extremely satisfied' },
      { text: 'b. Somewhat satisfied', value: 'Somewhat satisfied' },
      { text: 'c. Neither satisfied nor dissatisfied', value: 'Neither satisfied nor dissatisfied' },
      { text: 'd. Somewhat dissatisfied', value: 'Somewhat dissatisfied' },
      { text: 'e. Extremely dissatisfied', value: 'Extremely dissatisfied' },
    ])
    const knowledgeableAboutEquipmentOptions = ref([
      { text: 'a. Extremely knowledgeable', value: 'Extremely knowledgeable' },
      { text: 'b. Somewhat knowledgeable', value: 'Somewhat knowledgeable' },
      { text: 'c. Neither knowledgeable nor ignorant', value: 'Neither knowledgeable nor ignorant' },
      { text: 'd. Somewhat ignorant', value: 'Somewhat ignorant' },
      { text: 'e. Extremely ignorant', value: 'Extremely ignorant' },
    ])
    const arrivedOnTimeOptions = ref([
      { text: 'a. Yes, they arrived on time', value: 'Yes, they arrived on time' },
      { text: 'b. They arrived late', value: 'They arrived late' },
      { text: 'c. They arrived early', value: 'They arrived early' },
      { text: 'd. They did not arrive at all', value: 'They did not arrive at all' },
    ])
    const communicationDuringProcessOptions = ref([
      { text: 'a. Very well', value: 'Very well' },
      { text: 'b. Somewhat well', value: 'Somewhat well' },
      { text: 'c. Neither well nor poorly', value: 'Neither well nor poorly' },
      { text: 'd. Somewhat poorly', value: 'Somewhat poorly' },
      { text: 'e. Very poorly', value: 'Very poorly' },
    ])
    const explanationsUnderstandableOptions = ref([
      { text: 'a. Yes, they explained everything clearly', value: 'Yes, they explained everything clearly' },
      { text: 'b. They explained some things clearly, but not everything', value: 'They explained some things clearly, but not everything' },
      { text: 'c. I did not fully understand what they were saying', value: 'I did not fully understand what they were saying' },
      { text: 'd. They did not explain anything clearly', value: 'They did not explain anything clearly' },
    ])
    const likelyToRecommendOptions = ref([
      { text: 'a. Very likely', value: 'Very likely' },
      { text: 'b. Somewhat likely', value: 'Somewhat likely' },
      { text: 'c. Neither likely nor unlikely', value: 'Neither likely nor unlikely' },
      { text: 'd. Somewhat unlikely', value: 'Somewhat unlikely' },
      { text: 'e. Very unlikely', value: 'Very unlikely' },
    ])
    return {
      refFormObserver,
      getValidationState,
      resetForm,
      qualityOfServiceOptions,
      knowledgeableAboutEquipmentOptions,
      arrivedOnTimeOptions,
      communicationDuringProcessOptions,
      explanationsUnderstandableOptions,
      likelyToRecommendOptions,
    }
  },
}
</script>

    <style lang="scss">
    @import '~@resources/scss/vue/libs/vue-select.scss';

    #update-intervention-satisfaction-sidebar {
      .vs__dropdown-menu {
        max-height: 200px !important;
      }
    }
    </style>
<style lang="scss" scoped>
@import "~@resources/scss/base/pages/app-invoice.scss";
</style>
