<template>
  <b-sidebar
    id="equipment-view-update-task"
    :visible="isEquipmentViewUpdateTaskSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-equipment-view-update-task-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Equipment 'Intervention's Tasks'
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
          <b-card-text class="item-company mb-0">
            <h6 class="item-price mr-1">
              {{ equipmentTasksData.qrc_id }} - {{ equipmentTasksData.internal_id }} - {{ equipmentTasksData.serial_number }}
            </h6>
          </b-card-text>
          <!-- Equipment -->
          <h6>{{ equipmentTasksData.equipment_category }} - {{ equipmentTasksData.equipment_model }} - {{ equipmentTasksData.equipment_weight }} - {{ equipmentTasksData.equipment_pressure }} </h6>
          <b-link class="company-name">
            {{ equipmentTasksData.equipment_brand }}
          </b-link>
          <hr>
          <!-- Verification -->
          <validation-provider
            #default="validationContext"
            name="verification"
          >
            <b-form-group
              label="Equipment Verification"
              label-for="verification"
            >
              <b-form-checkbox
                v-model="equipmentTasksData.equipment_verification"
                class="custom-control-success"
                name="check-button"
                switch
              >
                <span class="switch-icon-left">
                  <feather-icon icon="CheckIcon" />
                </span>
                <span class="switch-icon-right">
                  <feather-icon icon="CheckIcon" />
                </span>
              </b-form-checkbox>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-row>
            <b-col>
              <!-- Azote -->
              <validation-provider
                #default="validationContext"
                name="azote"
              >
                <b-form-group
                  label="Nitrogen Recharge"
                  label-for="azote"
                >
                  <b-form-checkbox
                    v-model="equipmentTasksData.azote_recharged"
                    class="custom-control-success"
                    name="check-button"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    <span class="switch-icon-right">
                      <feather-icon icon="CheckIcon" />
                    </span>
                  </b-form-checkbox>

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

            </b-col>
            <b-col>
              <!-- Raw Material -->
              <validation-provider
                #default="validationContext"
                name="raw-material"
              >
                <b-form-group
                  label="Raw Material Recharge"
                  label-for="raw-material"
                >
                  <b-form-checkbox
                    v-model="equipmentTasksData.raw_material_recharged"
                    class="custom-control-success"
                    name="check-button"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    <span class="switch-icon-right">
                      <feather-icon icon="CheckIcon" />
                    </span>
                  </b-form-checkbox>

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <app-collapse
            type="margin"
            accordion
          >
            <app-collapse-item title="Maintenance">
              <b-list-group>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.head_maintenance"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Head
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.corps_maintenance"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Body
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.hose_maintenance"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Hose
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.sandblasting"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Sandblasting
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.paint"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Paint
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.hydro_test"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Hydraulic Test
                  </b-form-checkbox>
                </b-list-group-item>
              </b-list-group>
            </app-collapse-item>
            <app-collapse-item title="Spare Parts">
              <b-list-group>
                <b-list-group-item>
                  <b-form-checkbox
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Pressure Gauge
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Valve Assembly
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Hose Assembly
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Discharge Nozzle
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Safety Pin
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    O-ring
                  </b-form-checkbox>
                </b-list-group-item>
              </b-list-group>
              <b-list-group>
                <b-list-group-item>
                  <b-form-checkbox
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Handle and Lever
                  </b-form-checkbox>
                </b-list-group-item>
              </b-list-group>
            </app-collapse-item>
            <app-collapse-item title="Sign">
              <b-list-group>
                <b-list-group-item>
                  <b-form-checkbox
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Small Sign
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.big_sign"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Big Sign
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.medium_sign"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Medium Sign
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.pictogram"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Pictogram
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.numbering_s_sign"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Numbering S Sign
                  </b-form-checkbox>
                </b-list-group-item>
                <b-list-group-item>
                  <b-form-checkbox
                    v-model="equipmentTasksData.numbering_b_sign"
                    class="custom-control-success"
                    switch
                  >
                    <span class="switch-icon-left">
                      <feather-icon icon="CheckIcon" />
                    </span>
                    Numbering B Sign
                  </b-form-checkbox>
                </b-list-group-item>
              </b-list-group>
            </app-collapse-item>
          </app-collapse>
          <!-- Status -->
          <hr>
          <validation-provider
            #default="validationContext"
            name="equipment-intervention-status"
          >
            <b-form-group
              label="Status"
              label-for="equipment-intervention-status"
            >

              <b-form-radio-group
                v-model="equipmentTasksData.equipment_intervention_status"
                name="equipment-intervention-status"
                :options="statusOptions"
                class="demo-inline-spacing mb-1"
                value-field="value"
                text-field="text"
              />

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
  BSidebar,
  BForm,
  BFormCheckbox,
  BFormRadioGroup,
  BFormGroup,
  BRow,
  BCol,
  //   BFormRadio,
  BFormInvalidFeedback,
  BButton,
  //   BFormInput,
  //   BFormRadioGroup,
  //   BFormCheckboxGroup,
  //   BFormRating,
  BCardText,
  BLink,
} from 'bootstrap-vue'
// import router from '@/router'
// import store from '@/store'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required } from '@validations'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
// import vSelect from 'vue-select'

export default {
  components: {
    BSidebar,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormRadioGroup,
    BRow,
    BCol,
    // BFormRadio,
    BFormInvalidFeedback,
    BButton,
    // BFormInput,
    // BFormRadioGroup,
    // BFormCheckboxGroup,
    AppCollapse,
    AppCollapseItem,
    // BFormRating,
    // vSelect,
    BCardText,
    BLink,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isEquipmentViewUpdateTaskSidebarActive',
    event: 'update:is-equipment-view-update-task-sidebar-active',
  },
  props: {
    isEquipmentViewUpdateTaskSidebarActive: {
      type: Boolean,
      required: true,
    },
    equipmentTasksData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      required,
      statusOptions: [
        { text: 'In Service', value: 'In service' },
        { text: 'Out Of Order', value: 'Out of order' },
        { text: 'Limited Use', value: 'Limited Use' },
        { text: 'Needs Hydrostatic Testing', value: 'Needs Hydrostatic Testing' },
      ],
    }
  },
  methods: {
    onSubmit() {
      const data = { ...this.equipmentTasksData }
      const newData = { ...data, ...this.formData }
      this.$emit('submit', newData)
      this.isEquipmentViewUpdateTaskSidebarActive = false
      this.$emit('refetch-tasks-data')
    },
  },
  setup() {
    const equipmentTasksData = ref([])
    const { refFormObserver, getValidationState, resetForm } = formValidation()
    return {
      equipmentTasksData,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

    <style lang="scss">
    @import '~@resources/scss/vue/libs/vue-select.scss';

    #update-park-equipment-sidebar {
      .vs__dropdown-menu {
        max-height: 200px !important;
      }
    }
    </style>

<style lang="scss">
@import "~@resources/scss/base/pages/app-ecommerce-details.scss";
</style>
