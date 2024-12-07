<template>
  <b-sidebar
    id="add-new-certificate-sidebar"
    :visible="isAddNewCertificateSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-certificate-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Certificate
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

          <!-- Certificate Id -->
          <validation-provider
            #default="validationContext"
            name="certificate-id"
            rules="required"
          >
            <b-form-group
              label="Certificate ID"
              label-for="certificate-id"
            >
              <b-form-input
                id="certificate-id"
                v-model="certificateData.certificate_id"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="CER23000001"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Certificate Date -->
          <validation-provider
            #default="validationContext"
            name="certificate-date"
            rules="required"
          >
            <b-form-group
              label="Certificate Date"
              label-for="certificate-date"
            >
              <flat-pickr
                v-model="certificateData.certificate_date"
                class="form-control"
                :config="{ dateFormat: 'Y-m-d'}"
                placeholder="YYYY-MM-DD"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Intervention Id -->
          <validation-provider
            #default="validationContext"
            name="intervention-id"
          >
            <b-form-group
              label="Intervention ID"
              label-for="intervention-id"
            >
              <v-select
                v-model="certificateData.intervention_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="interventionOptions"
                :reduce="(option) => option.id"
                label="intervention_id"
                :clearable="false"
                input-id="intervention-id"
              >
                <template v-slot:option="option">
                  {{ option.intervention_id }} | {{ option.intervention_date }} | {{ option.customer_name }}
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
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'
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
    flatPickr,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewCertificateSidebarActive',
    event: 'update:is-add-new-certificate-sidebar-active',
  },
  props: {
    isAddNewCertificateSidebarActive: {
      type: Boolean,
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
    const blankCertificateData = {
      certificate_id: '',
      certificate_date: '',
      intervention_id: '',
    }

    const interventionOptions = ref([])
    const interventionsData = ref(null)
    const certificateData = ref(JSON.parse(JSON.stringify(blankCertificateData)))
    const resetcertificateData = () => {
      certificateData.value = JSON.parse(JSON.stringify(blankCertificateData))
    }
    const onSubmit = () => {
      store.dispatch('app-certificate/addCertificate', certificateData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-certificate-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetcertificateData)
    store
      .dispatch('app-certificate/fetchInterventions', { id: certificateData.value.customer_id })
      .then(response => {
        interventionsData.value = response.data.data
        interventionOptions.value = interventionsData.value.map(intervention => ({
          id: intervention.id,
          intervention_id: intervention.intervention_id,
          intervention_date: intervention.intervention_date,
          customer_name: intervention.customer_name,
        }))
        console.log(interventionsData.value)
        console.log(interventionOptions)
      })
      .catch(error => {
        if (error.response.status === 404) {
          interventionsData.value = undefined
        }
      })

    return {
      certificateData,
      interventionsData,
      interventionOptions,
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

#add-new-certificate-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
@import '~@resources/scss/vue/libs/vue-flatpicker.scss';
</style>
