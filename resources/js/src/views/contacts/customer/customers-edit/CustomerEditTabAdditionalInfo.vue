<template>
  <div>

    <!-- Customer Info: Input Fields -->
    <b-form
      @submit.prevent="onSubmit"
    >

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="KeyIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Accounting Informations
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Tax ID -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Tax ID"
            label-for="tax-id"
          >
            <b-form-input
              id="tax-id"
              v-model="customerData.tax_id"
            />
          </b-form-group>
        </b-col>

        <!-- Field: RNE ID -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="RNE ID"
            label-for="rne-id"
          >
            <b-form-input
              id="rne-id"
              v-model="customerData.rne_id"
              placeholder="B66479974"
            />
          </b-form-group>
        </b-col>

        <!-- Field:  RNE Verification -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="RNE Verification"
            label-for="rneverification"
          >
            <b-badge
              variant="primary"
              class="badge-glow"
            >
              <b-link
                href="https://www.registre-entreprises.tn/"
                target="_blank"
              >
                <feather-icon
                  icon="AlertCircleIcon"
                  class="mr-25"
                />
                Verification
              </b-link></b-badge>
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
            label="VAT Exemption Certificate"
            label-for="cerificate-exemption"
          >
            <b-form-input
              id="cerificate-exemption"
              v-model="customerData.vat_exemption"
              placeholder="4556479974"
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
            label="Date of issue"
            label-for="date-issue"
          >
            <flat-pickr
              v-model="customerData.vat_exemption_start"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d'}"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Expiration Date"
            label-for="expiration-date"
          >
            <flat-pickr
              v-model="customerData.vat_exemption_end"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d'}"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-1">

        <!-- Field: Company Form Legal -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Company Form Legal"
            label-for="company-form-legal"
          >
            <b-form-input
              id="company-form-legal"
              v-model="customerData.company_form_legal"
              placeholder="SARL"
            />
          </b-form-group>

        </b-col>

        <!-- Field: Company Capital -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Company Capital"
            label-for="company-capital"
          >
            <b-form-input
              id="company-capital"
              v-model="customerData.company_capital"
              placeholder="10 000,000 TND"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Created Date -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Created Date"
            label-for="created-date"
          >
            <flat-pickr
              v-model="customerData.created_date"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d'}"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Header: Banking Info -->
      <div class="d-flex">
        <feather-icon
          icon="ArchiveIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Banking Informations
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Bank name -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Bank Name"
            label-for="bank-name"
          >
            <b-form-input
              id="bank-name"
              v-model="customerData.bank_name"
              placeholder="BIAT"
            />
          </b-form-group>

        </b-col>

        <!-- Field: Bank Agency -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Bank Agency"
            label-for="bank-agency"
          >
            <b-form-input
              id="bank-agency"
              v-model="customerData.bank_agency"
              placeholder="B17"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Bank RIB -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Bank RIB"
            label-for="bank-rib"
          >
            <b-form-input
              id="bank-agency"
              v-model="customerData.bank_rib"
              placeholder="B17"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Banking Info -->
      <div class="d-flex">
        <feather-icon
          icon="DollarSignIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Payment Method
        </h4>
      </div>
      <b-row class="mt-1">

        <!-- Field: Payment Method: -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Payment Method"
            label-for="payment-method"
          >
            <b-form-input
              id="payment-method"
              v-model="customerData.customer_payment_method"
              placeholder="CASH"
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
  BBadge,
  BLink,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    flatPickr,
    BBadge,
    BLink,
  },
  props: {
    customerData: {
      type: Object,
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
