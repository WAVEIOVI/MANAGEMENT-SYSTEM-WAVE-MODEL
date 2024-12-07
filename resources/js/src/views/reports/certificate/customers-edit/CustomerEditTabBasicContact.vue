<template>
  <div>

    <!-- Customer Info: Input Fields -->
    <b-form
      @submit.prevent="onSubmit"
    >

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="MapPinIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Address
        </h4>
      </div>
      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">

        <!-- Field: Address Line 1 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Address Line 1"
            label-for="address-line-1"
          >
            <b-form-input
              id="address-line-1"
              v-model="customerData.address_line1"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Address Line 2 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Address Line 2"
            label-for="address-line-2"
          >
            <b-form-input
              id="address-line-2"
              v-model="customerData.address_line2"
              placeholder="Los Santos"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Postcode -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Postcode"
            label-for="postcode"
          >
            <b-form-input
              id="postcode"
              v-model="customerData.customer_postcode"
              type="number"
              placeholder="597626"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">

        <!-- Field: City -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="City"
            label-for="city"
          >
            <v-select
              v-model="customerData.customer_city"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="cityOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="customercity"
            />
          </b-form-group>

        </b-col>

        <!-- Field: Country -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Country"
            label-for="customer-country"
          >
            <v-select
              v-model="customerData.customer_country"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="countryOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="customer-country"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex">
        <feather-icon
          icon="UserIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          General Coordinator
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Birth Date -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Name"
            label-for="gc_name"
          >
            <b-form-input
              id="mobile"
              v-model="customerData.general_coordinator"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Mobile -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Mobile"
            label-for="mobile"
          >
            <b-form-input
              id="mobile"
              v-model="customerData.gc_phone"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Email"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="customerData.gc_email"
              type="email"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">

        <!-- Field: Language -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Language"
            label-for="language"
          >
            <v-select
              v-model="customerData.gc_language"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="languageOptions"
              :clearable="false"
              input-id="language"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Gender -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Gender"
            label-for="gender"
            label-class="mb-1"
          >
            <b-form-radio-group
              id="gender"
              v-model="customerData.gc_gender"
              :options="genderOptions"
              value="male"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Contact Options -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Contact Options"
            label-for="contact-options"
            label-class="mb-1"
          >
            <b-form-checkbox-group
              id="contact-options"
              v-model="customerData.gc_contact_options"
              :options="contactTypeOptions"
              switch
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Action Buttons -->
      <b-button
        variant="primary"
        type="submit"
        class="mb-1 mb-sm-0 mr-0 mr-sm-1"
        :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      >
        Save Changes
      </b-button>
      <b-button
        variant="outline-secondary"
        type="reset"
        :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      >
        Reset
      </b-button>
    </b-form>
  </div>
</template>

<script>
import {
  BButton,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BForm,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import useCustomersEdit from './useCustomersEdit'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
    BFormRadioGroup,
    BFormCheckboxGroup,
  },
  directives: {
    Ripple,
  },
  props: {
    customerData: {
      type: Object,
      required: true,
    },
    languageOptions: {
      type: Array,
      required: true,
    },
    contactTypeOptions: {
      type: Array,
      required: true,
    },
    genderOptions: {
      type: Array,
      required: true,
    },
    cityOptions: {
      type: Array,
      required: true,
    },
    countryOptions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.customerData)
    },
  },
  setup() {
    const {
      resolveCustomerTypeVariant,
    } = useCustomersEdit()
    return {
      resolveCustomerTypeVariant,
    }
  },
}
</script>

    <style lang="scss">
    @import '~@resources/scss/vue/libs/vue-select.scss';
    @import '~@resources/scss/vue/libs/vue-flatpicker.scss';
    </style>
