<template>
  <b-modal
    id="modal-price-list-view"
    cancel-variant="outline-secondary"
    cancel-title="Close"
    ok-title="Accept"
    size="lg"
    title="Price List"
  >
    <!-- body -->
    <b-card-body>
      <b-form
        @submit.prevent="onSubmit"
      >
        <b-card-title class="text-primary">
          Article 1: Inspection & Verification
        </b-card-title>
        <!-- Form: Personal Info Form -->
        <b-row class="mt-1">
          <!-- Verification all portable fire extinguisher  -->
          <b-form-group
            label-cols="9"
            label-cols-lg="10"
            label-size="sm"
            label="Inspection & Verification all portable fire extinguishers (01->12kg)"
            label-for="inspection-portable"
          >
            <b-form-input
              id="inspection-portable"
              v-model="customerPriceData.price_inspection_portable"
              size="sm"
            />
          </b-form-group>
        </b-row>
        <b-row class="mt-1">
          <!-- Verification all mobile fire extinguisher  -->
          <b-form-group
            label-cols="9"
            label-cols-lg="10"
            label-size="sm"
            label="Inspection & Verification all mobile fire extinguishers (12->150kg)"
            label-for="inspection-mobile"
          >
            <b-form-input
              id="inspection-mobile"
              v-model="customerPriceData.price_inspection_mobile"
              size="sm"
            />
          </b-form-group>
        </b-row>
        <b-card-title class="text-primary">
          Article 2: Extinguishing Agent
        </b-card-title>
        <b-row class="mt-1">
          <!-- Extinguishing Agent: Powder ABC -->
          <b-form-group
            label-cols="9"
            label-cols-lg="10"
            label-size="sm"
            label="Powder ABC (1kg)"
            label-for="extinguishing-agent-powder"
          >
            <b-form-input
              id="extinguishing-agent-powder"
              v-model="customerPriceData.price_extinguishing_agent_powder"
              size="sm"
            />
          </b-form-group>
        </b-row>
        <b-row class="mt-1">
          <!-- Extinguishing Agent: CO2 -->
          <b-form-group
            label-cols="9"
            label-cols-lg="10"
            label-size="sm"
            label="CO2 (1kg)"
            label-for="extinguishing-agent-co2"
          >
            <b-form-input
              id="extinguishing-agent-co2"
              v-model="customerPriceData.price_extinguishing_agent_co2"
              size="sm"
            />
          </b-form-group>
        </b-row>
        <b-row class="mt-1">
          <!-- Extinguishing Agent: water spray -->
          <b-form-group
            label-cols="9"
            label-cols-lg="10"
            label-size="sm"
            label="Water Spray (1L)"
            label-for="extinguishing-agent-water-spray"
          >
            <b-form-input
              id="extinguishing-agent-water-spray"
              v-model="customerPriceData.price_extinguishing_agent_water_spray"
              size="sm"
            />
          </b-form-group>
        </b-row>
        <b-row class="mt-1">
          <!-- Extinguishing Agent: foam -->
          <b-form-group
            label-cols="9"
            label-cols-lg="10"
            label-size="sm"
            label="Foam (1L)"
            label-for="extinguishing-agent-foam"
          >
            <b-form-input
              id="extinguishing-agent-foam"
              v-model="customerPriceData.price_extinguishing_agent_foam"
              size="sm"
            />
          </b-form-group>
        </b-row>
        <b-row class="mt-1">
          <!-- Extinguishing Agent: foam -->
          <b-form-group
            label-cols="9"
            label-cols-lg="10"
            label-size="sm"
            label="Foam (1L)"
            label-for="extinguishing-agent-foam"
          >
            <b-form-input
              id="extinguishing-agent-foam"
              v-model="customerPriceData.price_extinguishing_agent_foam"
              size="sm"
            />
          </b-form-group>
        </b-row>
        <b-card-title class="text-primary">
          Article 2: Extinguishing Agent
        </b-card-title>
        <b-row class="mt-1">
          <!-- Verification all  fire hose  -->
          <b-form-group
            label-cols="9"
            label-cols-lg="10"
            label-size="sm"
            label="Inspection & Verification all fire hose"
            label-for="inspection-hose"
          >
            <b-form-input
              id="inspection-hose"
              v-model="customerPriceData.price_inspection_hose"
              size="sm"
            />
          </b-form-group>
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
    </b-card-body>
  </b-modal>
</template>

<script>
import {

  BModal,
  VBModal,
  BCardTitle,
  BCardBody,
  BButton,
  BRow,
  //   BCol,
  BFormGroup,
  BFormInput,
  //   BFormRadioGroup,
  //   BFormCheckboxGroup,
  BForm,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    BCardTitle,
    BCardBody,
    BButton,
    BRow,
    // BCol,
    BFormGroup,
    BFormInput,
    // BFormRadioGroup,
    // BFormCheckboxGroup,
    BForm,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
//   props: {
//     customerContractData: {
//       type: Array,
//       required: true,
//     },
//     customerData: {
//       type: Array,
//       required: true,
//     },
//   },
}
</script>
