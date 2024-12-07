<template>
  <b-sidebar
    id="add-new-park-area-sidebar"
    :visible="isAddNewParkAreaSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-park-area-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Area
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

          <!-- Area Id -->
          <validation-provider
            #default="validationContext"
            name="area-id"
            rules="required"
          >
            <b-form-group
              label="Area ID"
              label-for="area-id"
            >
              <b-form-input
                id="area-id"
                v-model="parkData.area_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="AR001"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Area description -->
          <validation-provider
            #default="validationContext"
            name="area-description"
            rules="required"
          >
            <b-form-group
              label="Area description"
              label-for="area-description"
            >
              <b-form-input
                id="area-description"
                v-model="parkData.area_description"
                autofocus
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Area accessibility -->
          <validation-provider
            #default="validationContext"
            name="Area accessibility"
            rules="required"
          >
            <b-form-group
              label="Area accessibility"
              label-for="area-accessibility"
            >
              <v-select
                v-model="parkData.area_accessibility"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="areaAccessibilityOptions"
                :clearable="false"
                input-id="area-accessibility"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Area classification -->
          <validation-provider
            #default="validationContext"
            name="Area Classification"
            rules="required"
          >
            <b-form-group
              label="Area Classification"
              label-for="area-classification"
            >
              <v-select
                v-model="parkData.area_classification"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="areaClassificationOptions"
                :clearable="false"
                input-id="area-classification"
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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton, BFormInput,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormInput,
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
    prop: 'isAddNewParkAreaSidebarActive',
    event: 'update:is-add-new-park-area-sidebar-active',
  },
  props: {
    isAddNewParkAreaSidebarActive: {
      type: Boolean,
      required: true,
    },
    areaAccessibilityOptions: {
      type: Array,
      required: true,
    },
    areaClassificationOptions: {
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
    const blankParkData = {
      area_id: '',
      area_description: '',
      area_accessibility: '',
      area_classification: '',
    }

    const parkData = ref(JSON.parse(JSON.stringify(blankParkData)))
    const resetParkData = () => {
      parkData.value = JSON.parse(JSON.stringify(blankParkData))
    }

    const onSubmit = () => {
      store.dispatch('app-park/addParkArea', { id: router.currentRoute.params.id, parkData: parkData.value })
        .then(() => {
          emit('refetch-area-data')
          emit('update:is-add-new-park-area-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetParkData)

    return {
      parkData,
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

  #add-new-park-area-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
