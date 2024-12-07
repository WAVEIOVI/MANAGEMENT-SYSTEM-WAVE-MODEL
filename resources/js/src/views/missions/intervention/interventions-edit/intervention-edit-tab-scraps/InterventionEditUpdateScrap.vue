<template>
  <b-sidebar
    id="update-intervention-scrap-sidebar"
    :visible="isUpdateInterventionScrapSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    width="40%"
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-update-intervention-scrap-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Update Scrap
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

          <!-- equipment -->
          <validation-provider
            #default="validationContext"
            name="equipment"
            rules="required"
          >
            <b-form-group
              label="Equipment"
              label-for="equipment"
            >
              <b-form-input
                id="equipment"
                v-model="interventionScrapData.equipment_type"
                placeholder="Enter Equipment"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Status -->
          <validation-provider
            #default="validationContext"
            name="equipment_status"
            rules="required"
          >
            <b-form-group
              label="Status"
              label-for="equipment_status"
            >
              <b-form-rating
                v-model="interventionScrapData.equipment_status"
                variant="warning"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- quantity -->
          <validation-provider
            #default="validationContext"
            name="quantity"
            rules="required"
          >
            <b-form-group
              label="Quantity"
              label-for="quantity"
            >
              <b-form-input
                id="quantity"
                v-model="interventionScrapData.quantity"
                type="number"
                placeholder="Enter quantity"
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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton, BFormInput, BFormRating,
} from 'bootstrap-vue'
// import router from '@/router'
// import store from '@/store'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    BButton,
    BFormInput,
    BFormRating,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isUpdateInterventionScrapSidebarActive',
    event: 'update:is-update-intervention-scrap-sidebar-active',
  },
  props: {
    isUpdateInterventionScrapSidebarActive: {
      type: Boolean,
      required: true,
    },
    interventionScrapData: {
      type: Array,
      required: true,
    },
    scrapDescriptionOptions: {
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
      this.$emit('submit', this.interventionScrapData)
      this.isUpdateInterventionScrapSidebarActive = false
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

  #update-intervention-scrap-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
