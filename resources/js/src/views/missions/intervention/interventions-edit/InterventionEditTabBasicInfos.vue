<template>
  <div>
    <div class="d-flex mt-2">
      <feather-icon
        icon="UserIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50 text-primary">
        {{ interventionData.customer_name }}
      </h4>
    </div>

    <!-- Intervention Info: Input Fields -->
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
          Basic Information
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Intervention ID -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Intervention ID"
            label-for="intervention-id"
          >
            <b-form-input
              id="intervention-id"
              v-model="interventionData.intervention_id"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Intervention ID -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Customer ID"
            label-for="customer-id"
          >
            <b-form-input
              id="customer-id"
              v-model="interventionData.mission_customer_id"
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
            label-for="customer-name"
          >
            <b-form-input
              id="customer-name"
              v-model="interventionData.customer_name"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <!-- Field: Order ID -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Order ID"
            label-for="order-id"
          >
            <b-form-input
              id="order-id"
              v-model="interventionData.mission_order_id"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Intervention ID -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Location ID"
            label-for="location-id"
          >
            <b-form-input
              id="location-id"
              v-model="interventionData.mission_location_id"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Location Description -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Location Description"
            label-for="location-description"
          >
            <b-form-input
              id="location-description"
              v-model="interventionData.location_description"
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
            label="Intervention Date"
            label-for="intervention-date"
          >
            <flat-pickr
              v-model="interventionData.intervention_date"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d'}"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Activity Area -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Intervention Date"
            label-for="intervention-date"
          >
            <flat-pickr
              v-model="interventionData.intervention_date"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d'}"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Activity Area -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Intervention Duration"
            label-for="intervention-duration"
          >
            <b-form-input
              id="intervention-duration"
              v-model="interventionData.intervention_duration"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          md="8"
        >
          <b-form-group
            label="Note"
            label-for="intervention-note"
          >
            <b-form-textarea
              id="textarea-no-resize"
              v-model="interventionData.intervention_notes"
              rows="3"
              no-resize
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
            label-for="intervention-status"
          >
            <v-select
              v-model="interventionData.intervention_status"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="intervention-status"
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
  BFormTextarea,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
    flatPickr,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  props: {
    interventionData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.interventionData)
    },
  },
}
</script>

      <style lang="scss">
      @import '~@resources/scss/vue/libs/vue-select.scss';
      @import '~@resources/scss/vue/libs/vue-flatpicker.scss';
      </style>
