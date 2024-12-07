<template>
  <b-sidebar
    id="add-new-equipment-sidebar"
    :visible="isAddNewEquipmentSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-equipment-sidebar-active', val)"
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

          <!-- Equipment Id -->
          <validation-provider
            #default="validationContext"
            name="equipmentid"
            rules="required"
          >
            <b-form-group
              label="Equipment ID"
              label-for="equipmentid"
            >
              <b-form-input
                id="equipmentid"
                v-model="equipmentData.equipment_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="CL330001"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Equipmentname -->
          <validation-provider
            #default="validationContext"
            name="Equipmentname"
            rules="required"
          >
            <b-form-group
              label="Equipment Name"
              label-for="equipmentname"
            >
              <b-form-input
                id="equipmentname"
                v-model="equipmentData.equipment_name"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Contact -->
          <validation-provider
            #default="validationContext"
            name="equipmentcontact"
            rules="required"
          >
            <b-form-group
              label="Contact (Phone)"
              label-for="equipmentcontact"
            >
              <b-form-input
                id="equipmentcontact"
                v-model="equipmentData.equipment_phone"
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
            name="equipment-email"
            rules="required|email"
          >
            <b-form-group
              label="Email"
              label-for="equipment-email"
            >
              <b-form-input
                id="equipment-email"
                v-model="equipmentData.equipment_email"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- City -->
          <validation-provider
            #default="validationContext"
            name="equipment-city"
            rules="required"
          >
            <b-form-group
              label="City"
              label-for="equipment-city"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="equipmentData.equipment_city"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="cityOptions"
                :clearable="false"
                input-id="equipment-city"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Equipment Type -->
          <validation-provider
            #default="validationContext"
            name="equipmenttype"
            rules="required"
          >
            <b-form-group
              label="Equipment Type"
              label-for="equipment-type"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="equipmentData.equipment_type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="typeOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="equipment-type"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Activity Area -->
          <validation-provider
            #default="validationContext"
            name="equipment-activity"
            rules="required"
          >
            <b-form-group
              label="Activity Area"
              label-for="equipment-activity"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="equipmentData.equipment_activity"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="activityOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="equipment-activity"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Status -->
          <validation-provider
            #default="validationContext"
            name="equipment-status"
            rules="required"
          >
            <b-form-group
              label="Status"
              label-for="equipment-status"
              :state="getValidationState(validationContext)"
            >
              <v-select
                v-model="equipmentData.equipment_status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="equipment-status"
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
    prop: 'isAddNewEquipmentSidebarActive',
    event: 'update:is-add-new-equipment-sidebar-active',
  },
  props: {
    isAddNewEquipmentSidebarActive: {
      type: Boolean,
      required: true,
    },
    cityOptions: {
      type: Array,
      required: true,
    },
    typeOptions: {
      type: Array,
      required: true,
    },
    activityOptions: {
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
  setup(props, { emit }) {
    const blankEquipmentData = {
      equipment_id: '',
      equipment_name: '',
      equipment_email: '',
      equipment_type: null,
      equipment_activity: null,
      equipment_status: null,
      equipment_city: '',
      equipment_phone: '',
    }

    const equipmentData = ref(JSON.parse(JSON.stringify(blankEquipmentData)))
    const resetequipmentData = () => {
      equipmentData.value = JSON.parse(JSON.stringify(blankEquipmentData))
    }
    const onSubmit = () => {
      store.dispatch('app-equipment/addEquipment', equipmentData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-equipment-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetequipmentData)

    return {
      equipmentData,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

<style lang="scss">
@import '~@resources/scss/vue/libs/vue-select.scss';

#add-new-equipment-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
