<template>
  <div>
    <div class="d-flex mt-2">
      <feather-icon
        icon="UserIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50 text-primary">
        {{ customerData.customer_name }}
      </h4>
    </div>

    <!-- Customer Info: Input Fields -->
    <b-form
      @submit.prevent="onSubmit"
    >

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="DatabaseIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Basic Informations
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Customer ID -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Customer ID"
            label-for="customerid"
          >
            <b-form-input
              id="customerid"
              v-model="customerData.customer_id"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Customer Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Customer Name"
            label-for="customername"
          >
            <b-form-input
              id="customername"
              v-model="customerData.customer_name"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">

        <!-- Field: Phone -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Phone"
            label-for="phone"
          >
            <b-form-input
              id="phone"
              v-model="customerData.customer_phone"
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
              v-model="customerData.customer_email"
              type="email"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Website -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Website"
            label-for="website"
          >
            <b-form-input
              id="website"
              v-model="customerData.customer_website"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <!-- Field: Type -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Customer Type"
            label-for="customer-type"
          >
            <v-select
              v-model="customerData.customer_type"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="typeOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="customer-type"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Activity Area -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Activity Area"
            label-for="customer-activity"
          >
            <v-select
              v-model="customerData.customer_activity"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="activityOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="customer-activity"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Status -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Status"
            label-for="customer-status"
          >
            <v-select
              v-model="customerData.customer_status"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="customer-status"
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
  BForm,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    customerData: {
      type: Object,
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
  methods: {
    onSubmit() {
      this.$emit('submit', this.customerData)
    },
  },
}
</script>

      <style lang="scss">
      @import '~@resources/scss/vue/libs/vue-select.scss';
      @import '~@resources/scss/vue/libs/vue-flatpicker.scss';
      </style>
