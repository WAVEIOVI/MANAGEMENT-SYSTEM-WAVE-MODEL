<template>
  <div>

    <!-- Mission Info: Input Fields -->
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
          Location Infos
        </h4>
      </div>
      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">

        <!-- Field: Address Line 1 -->
        <b-col
          cols="12"
          md="5"
          lg="4"
        >
          <b-form-group
            label="Address"
            label-for="location-address"
          >
            <b-form-input
              id="location-address"
              v-model="missionData.location_address"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Postcode -->
        <b-col
          cols="12"
          md="2"
          lg="2"
        >
          <b-form-group
            label="Postcode"
            label-for="postcode"
          >
            <b-form-input
              id="postcode"
              v-model="missionData.location_postcode"
              type="number"
              placeholder="3000"
            />
          </b-form-group>
        </b-col>
        <!-- Field: City -->
        <b-col
          cols="12"
          md="3"
          lg="3"
        >
          <b-form-group
            label="City"
            label-for="location-city"
          >
            <v-select
              v-model="missionData.location_city"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="cityOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="location-city"
            />
          </b-form-group>

        </b-col>

        <!-- Field: Country -->
        <b-col
          cols="12"
          md="3"
          lg="3"
        >
          <b-form-group
            label="Country"
            label-for="location-country"
          >
            <v-select
              v-model="missionData.location_country"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="countryOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="location-country"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">
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
              v-model="missionData.location_phone"
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
              v-model="missionData.location_email"
              type="email"
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
          Coordinator
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
            label="Coordinator"
            label-for="location-coordinator"
          >
            <b-form-input
              id="location-coordinator"
              v-model="missionData.location_coordinator"
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
  //   BFormRadioGroup,
  //   BFormCheckboxGroup,
  BForm,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import useMissionsEdit from './useMissionsEdit'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
    // BFormRadioGroup,
    // BFormCheckboxGroup,
  },
  directives: {
    Ripple,
  },
  props: {
    missionData: {
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
    frequencyOptions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.missionData)
    },
  },
  setup() {
    const {
      resolveMissionTypeVariant,
    } = useMissionsEdit()
    return {
      resolveMissionTypeVariant,
    }
  },
}
</script>

    <style lang="scss">
    @import '~@resources/scss/vue/libs/vue-select.scss';
    @import '~@resources/scss/vue/libs/vue-flatpicker.scss';
    </style>
