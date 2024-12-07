<template>
  <b-sidebar
    id="add-new-mission-service-sidebar"
    :visible="isAddNewMissionServiceSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    width="70%"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-mission-service-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Service
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

          <!-- Description -->
          <validation-provider
            #default="validationContext"
            name="Service"
            rules="required"
          >
            <b-form-group
              label="Service"
              label-for="service"
            >
              <v-select
                v-model="missionData.mission_service"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="serviceDescriptionOptions"
                :reduce="(option) => option.service"
                :clearable="false"
                input-id="service"
                label="service"
              >
                <template #option="{ type, service}">
                  <feather-icon
                    icon="ToolIcon"
                    size="16"
                    class="align-middle mr-50"
                  />
                  <span> {{ service }} </span>
                  <footer class="blockquote-footer text-right">
                    {{ type }}
                  </footer>
                </template>
              </v-select>

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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton,
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
    prop: 'isAddNewMissionServiceSidebarActive',
    event: 'update:is-add-new-mission-service-sidebar-active',
  },
  props: {
    isAddNewMissionServiceSidebarActive: {
      type: Boolean,
      required: true,
    },
    serviceDescriptionOptions: {
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
    const blankMissionData = {
      mission_service: '',
    }

    const missionData = ref(JSON.parse(JSON.stringify(blankMissionData)))
    const resetmissionData = () => {
      missionData.value = JSON.parse(JSON.stringify(blankMissionData))
    }

    const onSubmit = () => {
      store.dispatch('app-service/addMissionService', { id: router.currentRoute.params.id, missionData: missionData.value })
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-mission-service-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetmissionData)

    return {
      missionData,
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

  #add-new-mission-service-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
