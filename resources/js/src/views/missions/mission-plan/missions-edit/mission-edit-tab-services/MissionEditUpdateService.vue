<template>
  <b-sidebar
    id="update-mission-service-sidebar"
    :visible="isUpdateMissionServiceSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    width="40%"
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-mission-service-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update Service
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
                v-model="missionServiceData.mission_service"
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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
// import router from '@/router'
// import store from '@/store'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

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
    prop: 'isUpdateMissionServiceSidebarActive',
    event: 'update:is-update-mission-service-sidebar-active',
  },
  props: {
    isUpdateMissionServiceSidebarActive: {
      type: Boolean,
      required: true,
    },
    missionServiceData: {
      type: Array,
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
  methods: {
    onSubmit() {
      this.$emit('submit', this.missionServiceData)
      this.isUpdateMissionServiceSidebarActive = false
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

  #update-mission-service-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
