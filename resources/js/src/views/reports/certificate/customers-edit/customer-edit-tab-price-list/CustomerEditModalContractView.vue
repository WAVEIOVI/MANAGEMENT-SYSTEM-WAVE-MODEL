<template>
  <b-modal
    id="modal-contract-view"
    cancel-variant="outline-secondary"
    cancel-title="Close"
    ok-title="Accept"
    size="lg"
    title="Service Provider Contract"
  >
    <!-- body -->
    <b-card-body>
      <b-card-text class="text-primary">
        Service Provider Contract {{ customerContractData.contract_id }}
      </b-card-text>
      <b-card-text>
        This Service Provider Contract (“Agreement”) is made and entered into on {{ customerContractData.contract_date }} , by and between ‘SECURITE SERVICES PLUS’, with its principal place of business at Gabes Road Km 3.5 Sfax, 3000, Tunisia, and {{ customerData.customer_name }}, with its principal place of business at {{ customerData.address_line1 }} {{ customerData.address_line2 }} {{ customerData.customer_postcode }} {{ customerData.customer_city }} {{ customerData.customer_country }}.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 1: Description of Service Provider
      </b-card-text>
      <b-card-text>
        ‘SECURITE SERVICES PLUS’ is a specialist in firefighting equipment maintenance and inspection, with a focus on portable firefighting equipment such as fire extinguishers and fire hoses. The company is committed to providing top-quality services to its clients and is currently upgrading its work system to ensure the highest level of service.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 2: Description of Client and Services Provided
      </b-card-text>
      <b-card-text>
        The Client, {{ customerData.customer_name }}, is in need of the services provided by ‘SECURITE SERVICES PLUS’, including firefighting equipment maintenance and inspection, as well as other related services.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 3: Services as Plan
      </b-card-text>
      <b-card-text>
        ‘SECURITE SERVICES PLUS’ offers four (04) plans of services to its clients, including the Basic Plan, Basic+ Plan, Company Plan, and Enterprise Plan.
        The Client, {{ customerData.customer_name }}, has chosen the {{ customerContractData.contract_plan }} Plan.
      </b-card-text>
      <b-card-text v-if="customerContractData.contract_plan === 'Basic'">
        Description of Basic Plan:
        <ul>
          <li>Regular inspection and maintenance of fire extinguishers and fire hoses</li>
          <li>Intervention Frequency: Yearly</li>
          <li>Advantages: This plan ensures that all fire extinguishers are in proper working condition and compliant with local regulations</li>
          <li>Type of reporting: Basic report including inspection status and recommendations</li>
          <li>Technical support: Basic level</li>
          <li>Priority: Standard</li>
        </ul>
      </b-card-text>
      <b-card-text v-else-if="customerContractData.contract_plan === 'Basic Plus'">
        Description of Basic Plus Plan:
        <ul>
          <li>Regular inspection and maintenance of fire extinguishers and fire hoses</li>
          <li>Intervention Frequency: half-yearly</li>
          <li>Advantages: This plan provides added protection for clients with emergency service call-outs for urgent maintenance needs</li>
          <li>Type of reporting: Basic report including inspection status and recommendations</li>
          <li>Technical support: Basic level</li>
          <li>Priority: Standard</li>
        </ul>
      </b-card-text>
      <b-card-text v-else-if="customerContractData.contract_plan === 'Company'">
        Description of Company Plan:
        <ul>
          <li>Regular inspection and maintenance of fire extinguishers and fire hoses, emergency service call-outs, and additional consulting services</li>
          <li>Intervention Frequency: half-yearly</li>
          <li>Advantages: This plan offers comprehensive protection for clients with added consulting services for fire safety and compliance</li>
          <li>Access to Wave Plus portal</li>
          <li>Type of reporting: Detailed report including inspection status, recommendations, and consulting services</li>
          <li>Technical support: Intermediate level</li>
          <li>Priority: Above standard</li>
        </ul>
      </b-card-text>
      <b-card-text v-else-if="customerContractData.contract_plan === 'Entreprise'">
        Description of Entreprise Plan:
        <ul>
          <li>Regular inspection and maintenance of fire equipements, emergency service call-outs, consulting services, and customized training for employees</li>
          <li>Intervention Frequency: half-yearly</li>
          <li>Advantages: This plan offers the highest level of protection and compliance for clients with added customized training for employees</li>
          <li>Extra Discount: 10%</li>
          <li>Access to Wave Plus portal</li>
          <li>Type of reporting: Detailed report including inspection status, recommendations, consulting services, and training reports</li>
          <li>Technical support: Advanced level</li>
          <li>Priority: High</li>
        </ul>
      </b-card-text>
      <b-card-text v-else-if="customerContractData.contract_plan === 'Elite'">
        Description of Elite Plan:
        <ul>
          <li>Regular inspection and maintenance of fire equipements, emergency service call-outs, consulting services, customized training for employees, and 24/7 availability</li>
          <li>Intervention Frequency: half-yearly (plus free check-up visit) </li>
          <li>Advantages: This plan offers the ultimate level of protection and compliance for clients with 24/7 availability for emergencies, plus free check-up visit</li>
          <li>Extra Discount: 15%</li>
          <li>Access to Wave Plus portal</li>
          <li>Type of reporting: Detailed report including inspection status, recommendations, consulting services, and training reports</li>
          <li>Free tablet</li>
          <li>Technical support: Advanced level</li>
          <li>Priority: Urgent</li>
        </ul>
      </b-card-text>
      <b-card-text v-else>
        Unknown plan
      </b-card-text>
      <b-card-text>
        The {{ customerContractData.contract_plan }} Plan is described in more detail in the Annex attached to this Agreement. It should be noted that the Annex includes further details regarding the services offered under the plan. In addition to the services described in the plan description, ‘SECURITE SERVICES PLUS’ may also provide other services not included in the plan at the client’s request and expense.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 4: Duration
      </b-card-text>
      <b-card-text>
        This Agreement shall commence on {{ customerContractData.contract_start_date }} and shall continue until {{ customerContractData.contract_end_date }}. Either party may terminate this Agreement upon written notice to the other party, subject to a notice period of 60 days.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 5: Renewal
      </b-card-text>
      <b-card-text>
        This Agreement may be renewed upon mutual agreement between the parties.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 6: Price List
      </b-card-text>
      <b-card-text>
        The price list for the services, spare parts, accessories, and safety signs offered under each plan is available with more detail in the Annex attached to this Agreement.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 7: Payment
      </b-card-text>
      <b-card-text>
        Payment for services rendered shall be due {{ customerContractData.contract_payment_deadline }} after the date of invoice and shall be in {{ customerContractData.contract_payment_method }}.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 8: Travel and Transportation
      </b-card-text>
      <b-card-text>
        Service Provider shall be responsible for arranging and paying for its own travel, transportation, and accommodation in connection with the services provided under this Contract. For interventions in Grand Tunis and Sfax, travel and transportation costs will be covered by the Service Provider. For interventions outside of Grand Tunis and Sfax, the Client shall reimburse Service Provider for any reasonable expenses incurred in connection with such travel, transportation, and accommodation, upon presentation of receipts or other documentation reasonably acceptable to the Client.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 9: Warranty
      </b-card-text>
      <b-card-text>
        The Provider shall provide a warranty on repaired or replaced equipment during the term of the contract.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 10: Confidentiality
      </b-card-text>
      <b-card-text>
        The parties shall not disclose the other party's confidential information obtained in connection with this agreement.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 11: Liability
      </b-card-text>
      <b-card-text>
        The Provider shall not be liable for damages caused by events beyond its control such as fires, floods, vandalism, etc.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 12: Insurance
      </b-card-text>
      <b-card-text>
        The Provider must possess professional liability insurance to cover risks arising from the execution of this agreement.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 13: Equipment Upgrades
      </b-card-text>
      <b-card-text>
        The Provider shall inform the Client of new firefighting equipment available on the market and shall propose upgrades to existing equipment to improve performance.
      </b-card-text>
      <b-card-text class="text-primary">
        Article 14: Exclusivity Clause
      </b-card-text>
      <b-card-text>
        The Client shall not use the services of any other firefighting equipment maintenance provider during the term of this Agreement.
      </b-card-text>
      <hr>
      <b-card-text>
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.
      </b-card-text>
      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <b-card-text>
            SECURITE SERVICES PLUS
          </b-card-text>
        </b-col>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-end"
        >
          <b-card-text>
            {{ customerData.customer_name }}
          </b-card-text>
        </b-col>
      </b-row>
    </b-card-body>
  </b-modal>
</template>

<script>
import {

  BModal,
  VBModal,
  BCardText,
  BCardBody,
  BRow,
  BCol,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    BCardText,
    BCardBody,
    BRow,
    BCol,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    customerContractData: {
      type: Array,
      required: true,
    },
    customerData: {
      type: Array,
      required: true,
    },
  },
}
</script>
