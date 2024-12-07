<template>
  <b-sidebar
    id="add-new-intervention-scrap-sidebar"
    :visible="isAddNewInterventionScrapSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    width="40%"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-intervention-scrap-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Scrap
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
                v-model="interventionData.equipment_type"
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
                v-model="interventionData.equipment_status"
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
                v-model="interventionData.quantity"
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
  BSidebar, BForm, BFormGroup, BFormInvalidFeedback, BButton, BFormInput, BFormRating,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import router from '@/router'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

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
    prop: 'isAddNewInterventionScrapSidebarActive',
    event: 'update:is-add-new-intervention-scrap-sidebar-active',
  },
  props: {
    isAddNewInterventionScrapSidebarActive: {
      type: Boolean,
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
  setup(props, { emit }) {
    const blankInterventionData = {
      intervention_scrap: '',
    }

    const interventionData = ref(JSON.parse(JSON.stringify(blankInterventionData)))
    const resetinterventionData = () => {
      interventionData.value = JSON.parse(JSON.stringify(blankInterventionData))
    }

    const onSubmit = () => {
      store.dispatch('app-scrap/addInterventionScrap', { id: router.currentRoute.params.id, interventionData: interventionData.value })
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-intervention-scrap-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetinterventionData)

    return {
      interventionData,
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

  #add-new-intervention-scrap-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
