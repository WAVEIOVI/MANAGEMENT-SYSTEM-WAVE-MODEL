<template>
  <b-sidebar
    id="add-new-park-equipment-sidebar"
    :visible="isAddNewParkEquipmentSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    width="100%"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-park-equipment-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Equipment
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

          <!-- Header:Equipment identification -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="TagIcon"
            />
            <h6 class="mb-0 ml-50">
              Equipment identification
            </h6>
          </div>
          <b-row class="mt-1">
            <b-col
              cols="12"
              md="2"
            >
              <!-- QRC/ID -->
              <validation-provider
                #default="validationContext"
                name="qrc-id"
                rules="required"
              >
                <b-form-group
                  label="QRC/ID"
                  label-for="qrc-id"
                >
                  <b-form-input
                    v-model="parkData.qrc_id"
                    class="d-inline-block mr-1"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="2"
            >
              <!-- Internal ID -->
              <validation-provider
                #default="validationContext"
                name="internal-id"
              >
                <b-form-group
                  label="Internal ID"
                  label-for="internal-id"
                >
                  <b-form-input
                    v-model="parkData.internal_id"
                    class="d-inline-block mr-1"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="2"
            >
              <!-- Serial Number -->
              <validation-provider
                #default="validationContext"
                name="serial-number"
              >
                <b-form-group
                  label="Serial Number"
                  label-for="serial-number"
                >
                  <b-form-input
                    v-model="parkData.serial_number"
                    class="d-inline-block mr-1"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              md="2"
            />
            <b-col
              cols="12"
              md="2"
            >
              <!-- Status -->
              <validation-provider
                #default="validationContext"
                name="equipment_status"
              >
                <b-form-group
                  label="Status"
                  label-for="equipment_status"
                >
                  <b-form-rating
                    v-model="parkData.equipment_status"
                    variant="warning"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div class="d-flex mt-2">
            <feather-icon
              icon="PackageIcon"
            />
            <h6 class="mb-0 ml-50">
              Equipment Type
            </h6>
          </div>
          <b-row class="mt-1">
            <b-col
              cols="12"
              md="2"
            >
              <!-- Equipment Category -->
              <validation-provider
                #default="validationContext"
                name="equipment-category"
                rules="required"
              >
                <b-form-group
                  label="Equipment Category"
                  label-for="equipment-category"
                >
                  <v-select
                    v-model="parkData.equipment_category"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="categoryOptions"
                    :reduce="val => val.value"
                    label="text"
                    :clearable="false"
                    input-id="equipment-category"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="3"
            >
              <!-- Equipment Model -->
              <validation-provider
                #default="validationContext"
                name="equipment-model"
              >
                <b-form-group
                  label="Equipment Model"
                  label-for="equipment-model"
                >
                  <v-select
                    v-model="parkData.equipment_model"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="modelOptions"
                    :reduce="val => val.value"
                    label="text"
                    :clearable="false"
                    input-id="equipment-model"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="2"
            >
              <!-- Equipment Weight -->
              <validation-provider
                #default="validationContext"
                name="equipment-weight"
              >
                <b-form-group
                  label="Equipment weight"
                  label-for="equipment-weight"
                >
                  <v-select
                    v-model="parkData.equipment_weight"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="weightOptions"
                    :reduce="val => val.value"
                    label="text"
                    :clearable="false"
                    input-id="equipment-weight"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <template
              v-if="parkData.equipment_model === 'Water-based' || parkData.equipment_model === 'Powder ABC' || parkData.equipment_model === 'Foam' || parkData.equipment_model === 'Wet chemical' || parkData.equipment_model === 'Dry powder'"
            >
              <b-col
                cols="12"
                md="3"
              >
                <!-- Pressure -->
                <validation-provider
                  #default="validationContext"
                  name="equipment-pressure"
                >
                  <b-form-group
                    label="Equipment Pressure"
                    label-for="equipment-pressure"
                    label-class="mb-1"
                  >
                    <b-form-radio-group
                      id="equipment-pressure"
                      v-model="parkData.equipment_pressure"
                      :options="pressureOptions"
                    />

                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </template>
          </b-row>
          <!-- Equipment area -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="MapPinIcon"
            />
            <h6 class="mb-0 ml-50">
              Equipment Area
            </h6>
          </div>
          <b-row class="mt-1">
            <b-col
              cols="12"
              md="2"
            >

              <validation-provider
                #default="validationContext"
                name="equipment-area"
              >
                <b-form-group
                  label="Area"
                  label-for="equipment-area"
                >
                  <v-select
                    v-model="parkData.area_id"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="areaOptions"
                    :reduce="(option) => option.id"
                    label="area_description"
                    :clearable="false"
                    input-id="equipment-area"
                  >
                    <template #option="option">
                      <feather-icon
                        icon="MapPinIcon"
                        size="16"
                        class="align-middle mr-50"
                      />
                      <span> {{ option.area_id }} {{ option.area_description }}</span>
                    </template>
                  </v-select>

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="3"
            >
              <!-- equipment-fixation -->
              <validation-provider
                #default="validationContext"
                name="equipment-fixation"
              >
                <b-form-group
                  label="Fixation"
                  label-for="equipment-fixation"
                >
                  <v-select
                    v-model="parkData.equipment_fixation"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="fixationOptions"
                    :reduce="(option) => option.fixation"
                    label="fixation"
                  >
                    <template #option="{ fixation }">
                      <feather-icon
                        icon="ShuffleIcon"
                        size="16"
                        class="align-middle mr-50"
                      />
                      <span> {{ fixation }}</span>
                    </template>
                  </v-select>
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="4"
            >
              <!-- Accessories Availability -->
              <validation-provider
                #default="validationContext"
                name="accessories-availability"
              >
                <b-form-group
                  label="Accessories Availability"
                  label-for="accessories-availability"
                  label-class="mb-1"
                >
                  <b-form-radio-group
                    id="accessories-availability"
                    v-model="parkData.accessories_availability"
                    :options="accessoriesOptions"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <!-- Equipment area -->
          <div class="d-flex mt-2">
            <feather-icon
              icon="ImageIcon"
            />
            <h6 class="mb-0 ml-50">
              Equipment Sign
            </h6>
          </div>
          <b-row class="mt-1">
            <b-col
              cols="6"
              md="2"
            >
              <!-- standard Sign -->
              <validation-provider
                #default="validationContext"
                name="standard-sign"
              >
                <b-form-group
                  label="Standard Sign"
                  label-for="standard-sign"
                >
                  <b-form-checkbox-group
                    v-model="parkData.standard_sign"
                    :options="signOptions"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="6"
              md="2"
            >
              <!-- Big Sign  -->
              <validation-provider
                #default="validationContext"
                name="big-sign"
              >
                <b-form-group
                  label="Big Sign"
                  label-for="big-sign"
                >
                  <b-form-checkbox-group
                    v-model="parkData.big_sign"
                    :options="signOptions"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="6"
              md="2"
            >
              <!-- Medium Sign  -->
              <validation-provider
                #default="validationContext"
                name="medium-sign"
              >
                <b-form-group
                  label="Medium Sign"
                  label-for="medium-sign"
                >
                  <b-form-checkbox-group
                    v-model="parkData.medium_sign"
                    :options="signOptions"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="6"
              md="2"
            >
              <!-- Pictogram  -->
              <validation-provider
                #default="validationContext"
                name="pictogram"
              >
                <b-form-group
                  label="Pictogram"
                  label-for="pictogram"
                >
                  <b-form-checkbox-group
                    v-model="parkData.pictogram"
                    :options="signOptions"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="6"
              md="2"
            >
              <!-- Small Numbering Sign  -->
              <validation-provider
                #default="validationContext"
                name="numbering-s-sign"
              >
                <b-form-group
                  label="Numbering S Sign"
                  label-for="numbering-s-sign"
                >
                  <b-form-checkbox-group
                    v-model="parkData.numbering_s_sign"
                    :options="signOptions"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="6"
              md="2"
            >
              <!-- Big Numbering Sign  -->
              <validation-provider
                #default="validationContext"
                name="numbering-b-sign"
              >
                <b-form-group
                  label="Numbering B Sign"
                  label-for="numbering-b-sign"
                >
                  <b-form-checkbox-group
                    v-model="parkData.numbering_b_sign"
                    :options="signOptions"
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div class="d-flex mt-2">
            <feather-icon
              icon="AlertCircleIcon"
            />
            <h6 class="mb-0 ml-50">
              Equipment Info
            </h6>
          </div>
          <b-row class="mt-1">
            <b-col
              cols="12"
              md="2"
            >

              <validation-provider
                #default="validationContext"
                name="mfg_date"
              >
                <b-form-group
                  label="MFG Date"
                  label-for="mfg_date"
                >
                  <flat-pickr
                    v-model="parkData.mfg_date"
                    class="form-control"
                    :config="{ dateFormat: 'Y-m-d'}"
                    placeholder="YYYY-MM-DD"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="2"
            >
              <validation-provider
                #default="validationContext"
                name="installation-date"
              >
                <b-form-group
                  label="Installation Date"
                  label-for="installation-date"
                >
                  <flat-pickr
                    v-model="parkData.installation_date"
                    class="form-control"
                    :config="{ dateFormat: 'Y-m-d'}"
                    placeholder="YYYY-MM-DD"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="2"
            >
              <!-- Equipment Brand -->
              <validation-provider
                #default="validationContext"
                name="Equipment"
              >
                <b-form-group
                  label="Equipment Brand"
                  label-for="equipment-brand"
                >
                  <b-form-input
                    v-model="parkData.equipment_brand"
                    class="d-inline-block mr-1"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="2"
            >
              <!-- Made in  -->
              <validation-provider
                #default="validationContext"
                name="made-in"
              >
                <b-form-group
                  label="Made In"
                  label-for="made-in"
                >
                  <b-form-input
                    v-model="parkData.made_in"
                    class="d-inline-block mr-1"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col
              cols="12"
              md="2"
            >
              <!-- CE Marking -->
              <validation-provider
                #default="validationContext"
                name="ce-marking"
              >
                <b-form-group
                  label="CE Marking"
                  label-for="ce-marking"
                >
                  <b-form-checkbox-group
                    v-model="parkData.ce_marking"
                    :options="ceOptions"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- <div>
              {{ parkData }}
            </div> -->
          </b-row>
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
  BSidebar,
  BForm,
  BFormGroup,
  BFormInvalidFeedback,
  BButton,
  BFormInput,
  BRow,
  BCol,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BFormRating,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, watch } from '@vue/composition-api'
import { required } from '@validations'
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    BButton,
    BFormInput,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BFormRating,
    flatPickr,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewParkEquipmentSidebarActive',
    event: 'update:is-add-new-park-equipment-sidebar-active',
  },
  props: {
    isAddNewParkEquipmentSidebarActive: {
      type: Boolean,
      required: true,
    },
    fixationOptions: {
      type: Array,
      required: true,
    },
    pressureOptions: {
      type: Array,
      required: true,
    },
    accessoriesOptions: {
      type: Array,
      required: true,
    },
    ceOptions: {
      type: Array,
      required: true,
    },
    signOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      required,
    }
  },
  setup(props, { emit }) {
    const blankParkData = {
      area_id: '',
      qrc_id: '',
      internal_id: '',
      serial_number: '',
      equipment_category: '',
      equipment_model: '',
      equipment_weight: '',
      equipment_pressure: '',
      mfg_date: '',
      installation_date: '',
      equipment_brand: '',
      made_in: '',
      ce_marking: '',
      pictogram: '',
      standard_sign: '',
      medium_sign: '',
      big_sign: '',
      numbering_s_sign: '',
      numbering_b_sign: '',
      accessories_availability: '',
      equipment_fixation: '',
      equipment_status: '',
    }

    const parkData = ref(JSON.parse(JSON.stringify(blankParkData)))
    const resetParkData = () => {
      parkData.value = JSON.parse(JSON.stringify(blankParkData))
    }

    const onSubmit = () => {
      store.dispatch('app-park/addParkEquipment', { id: router.currentRoute.params.id, parkData: parkData.value })
        .then(() => {
          emit('refetch-equipment-data')
          emit('update:is-add-new-park-equipment-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetParkData)

    const modelOptions = ref([])
    const weightOptions = ref([])
    const areaOptions = ref([])
    const areaData = ref()
    const fetchAreas = () => {
      store
        .dispatch('app-park/fetchParkAreas', { id: router.currentRoute.params.id })
        .then(response => {
          areaData.value = response.data.data
          areaOptions.value = areaData.value.map(area => ({
            id: area.id,
            area_id: area.area_id,
            area_description: area.area_description,
          }))
          console.log(areaData.value)
          console.log(areaOptions)
        })
        .catch(error => {
          if (error.response.status === 404) {
            areaData.value = undefined
          }
        })
    }
    watch(() => props.isAddNewParkEquipmentSidebarActive, newVal => {
      if (newVal === true) {
        fetchAreas()
      }
    })

    const categoryOptions = ref([
      { text: 'Fire Extinguisher', value: 'Fire Extinguisher' },
      { text: 'Fire Hoses', value: 'Fire Hoses' },
      { text: 'Fire Sprinklers', value: 'Fire Sprinklers' },
      { text: 'Smoke Detectors', value: 'Smoke Detectors' },
      { text: 'Fire Alarms', value: 'Fire Alarms' },
      { text: 'Fire Suppression Systems', value: 'Fire Suppression Systems' },
    ])
    // Watch the value of parkData.equipment_category
    watch(() => parkData.value.equipment_category, category => {
      switch (category) {
        case 'Fire Extinguisher':
          modelOptions.value = [
            { text: 'Water-based', value: 'Water-based' },
            { text: 'Powder ABC', value: 'Powder ABC' },
            { text: 'CO2', value: 'CO2' },
            { text: 'Foam', value: 'Foam' },
            { text: 'Wet chemical (kitchen-specific)', value: 'Wet chemical' },
            { text: 'Dry powder (Class D)', value: 'Dry powder' },
          ]
          break
        case 'Fire Hoses':
          modelOptions.value = [
            { text: 'Standard', value: 'Standard' },
          ]
          break
        case 'Fire Sprinklers':
          modelOptions.value = [
            { text: 'Standard', value: 'Standard' },
          ]
          break
        case 'Smoke Detectors':
          modelOptions.value = [
            { text: 'Standard', value: 'Standard' },
          ]
          break
        case 'Fire Alarms':
          modelOptions.value = [
            { text: 'Standard', value: 'Standard' },
          ]
          break
        case 'Fire Suppression Systems':
          modelOptions.value = [
            { text: 'Standard', value: 'Standard' },
          ]
          break
        default:
          modelOptions.value = []
      }
    })
    // Watch the value of parkData.equipment_model
    watch(() => parkData.value.equipment_model, model => {
      switch (model) {
        case 'Water-based':
          weightOptions.value = [
            { text: '06kg', value: '06kg' },
            { text: '09kg', value: '09kg' },
            { text: '12kg', value: '12kg' },
            { text: '50kg', value: '50kg' },
          ]
          break
        case 'Powder ABC':
          weightOptions.value = [
            { text: '01kg', value: '01kg' },
            { text: '02kg', value: '02kg' },
            { text: '06kg', value: '06kg' },
            { text: '09kg', value: '09kg' },
            { text: '12kg', value: '12kg' },
            { text: '50kg', value: '50kg' },
            { text: '100kg', value: '100kg' },
          ]
          break
        case 'CO2':
          weightOptions.value = [
            { text: '02kg', value: '02kg' },
            { text: '05kg', value: '05kg' },
            { text: '12kg', value: '12kg' },
            { text: '50kg', value: '50kg' },
          ]
          break
        case 'Foam':
          weightOptions.value = [
            { text: '06kg', value: '06kg' },
            { text: '09kg', value: '09kg' },
            { text: '12kg', value: '12kg' },
            { text: '50kg', value: '50kg' },
          ]
          break
        case 'Wet chemical':
          weightOptions.value = [
            { text: '06kg', value: '06kg' },
            { text: '09kg', value: '09kg' },
            { text: '12kg', value: '12kg' },
            { text: '50kg', value: '50kg' },
          ]
          break
        case 'Dry powder':
          weightOptions.value = [
            { text: '06kg', value: '06kg' },
            { text: '09kg', value: '09kg' },
            { text: '12kg', value: '12kg' },
            { text: '50kg', value: '50kg' },
          ]
          break
        default:
          weightOptions.value = []
      }
    })
    return {
      parkData,
      areaData,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,

      categoryOptions,
      modelOptions,
      weightOptions,
      areaOptions,
    }
  },
}
</script>

  <style lang="scss">
      @import '~@resources/scss/vue/libs/vue-select.scss';
      @import '~@resources/scss/vue/libs/vue-flatpicker.scss';

  #add-new-park-equipment-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
