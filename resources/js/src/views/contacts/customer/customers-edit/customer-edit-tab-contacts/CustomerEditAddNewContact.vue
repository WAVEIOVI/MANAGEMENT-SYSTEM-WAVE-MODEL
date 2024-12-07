<template>
  <b-sidebar
    id="add-new-customer-contact-sidebar"
    :visible="isAddNewCustomerContactSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-customer-contact-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Contact
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

          <!-- full name -->
          <validation-provider
            #default="validationContext"
            name="full-name"
            rules="required"
          >
            <b-form-group
              label="Full Name"
              label-for="full-name"
            >
              <b-form-input
                id="full-name"
                v-model="customerContactData.contact_full_name"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="ahmed TOUNSI"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Title -->
          <validation-provider
            #default="validationContext"
            name="post"
            rules="required"
          >
            <b-form-group
              label="Post "
              label-for="post"
            >
              <b-form-input
                id="post"
                v-model="customerContactData.contact_post"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="Safety Manger"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Contact -->
          <validation-provider
            #default="validationContext"
            name="phone"
            rules="required"
          >
            <b-form-group
              label="Contact (Phone)"
              label-for="phone"
            >
              <b-form-input
                id="phone"
                v-model="customerContactData.contact_phone"
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
            name="contact-email"
            rules="required|email"
          >
            <b-form-group
              label="Email"
              label-for="contact-email"
            >
              <b-form-input
                id="contact-email"
                v-model="customerContactData.contact_email"
                :state="getValidationState(validationContext)"
                trim
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
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
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
    BFormInput,
    BFormInvalidFeedback,
    BButton,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewCustomerContactSidebarActive',
    event: 'update:is-add-new-customer-contact-sidebar-active',
  },
  props: {
    isAddNewCustomerContactSidebarActive: {
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
    const blankCustomerContactData = {
      contact_full_name: '',
      contact_post: '',
      contact_phone: '',
      contact_email: '',
    }

    const customerContactData = ref(JSON.parse(JSON.stringify(blankCustomerContactData)))
    const resetCustomerData = () => {
      customerContactData.value = JSON.parse(JSON.stringify(blankCustomerContactData))
    }

    const onSubmit = () => {
      store.dispatch('app-contact/addCustomerContact', { id: router.currentRoute.params.id, customerContactData: customerContactData.value })
        .then(() => {
          emit('refetch-contact-data')
          emit('update:is-add-new-customer-contact-sidebar-active', false)
        })
    }

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetCustomerData)

    return {
      customerContactData,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

  <style lang="scss">

  #add-new-customer-contact-sidebar {
    .vs__dropdown-menu {
      max-height: 200px !important;
    }
  }
  </style>
