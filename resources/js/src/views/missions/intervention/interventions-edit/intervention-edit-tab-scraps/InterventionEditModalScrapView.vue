<template>
  <b-modal
    id="modal-scrap-view"
    ok-only
    ok-title="Done"
    size="sm"
    centered
    title="Intervention Scrap Information"
  >
    <b-card-text class="text-primary">
      Scrap:
    </b-card-text>
    <b-card-text>
      {{ interventionScrapData.intervention_scrap }}
    </b-card-text>
    <b-card-text v-if="interventionScrapData.intervention_scrap === 'Basic'">
      Description of Scrap:
      <ul>
        <li>Regular inspection and maintenance of fire extinguishers and fire hoses</li>
        <li>Intervention Frequency: Yearly</li>
        <li>Advantages: This plan ensures that all fire extinguishers are in proper working condition and compliant with local regulations</li>
        <li>Type of reporting: Basic report including inspection status and recommendations</li>
        <li>Technical support: Basic level</li>
        <li>Priority: Standard</li>
      </ul>
    </b-card-text>
    <b-card-text v-else-if="interventionScrapData.intervention_scrap === 'Basic Plus'">
      Description of Scrap:
      <ul>
        <li>Regular inspection and maintenance of fire extinguishers and fire hoses</li>
        <li>Intervention Frequency: half-yearly</li>
        <li>Advantages: This plan provides added protection for clients with emergency scrap call-outs for urgent maintenance needs</li>
        <li>Type of reporting: Basic report including inspection status and recommendations</li>
        <li>Technical support: Basic level</li>
        <li>Priority: Standard</li>
      </ul>
    </b-card-text>
    <b-card-text v-else-if="interventionScrapData.intervention_scrap === 'Company'">
      Description of Scrap:
      <ul>
        <li>Regular inspection and maintenance of fire extinguishers and fire hoses, emergency scrap call-outs, and additional consulting scraps</li>
        <li>Intervention Frequency: half-yearly</li>
        <li>Advantages: This plan offers comprehensive protection for clients with added consulting scraps for fire safety and compliance</li>
        <li>Access to Wave Plus portal</li>
        <li>Type of reporting: Detailed report including inspection status, recommendations, and consulting scraps</li>
        <li>Technical support: Intermediate level</li>
        <li>Priority: Above standard</li>
      </ul>
    </b-card-text>
    <b-card-text v-else-if="interventionScrapData.intervention_scrap === 'Entreprise'">
      Description of Scrap:
      <ul>
        <li>Regular inspection and maintenance of fire equipements, emergency scrap call-outs, consulting scraps, and customized training for employees</li>
        <li>Intervention Frequency: half-yearly</li>
        <li>Advantages: This plan offers the highest level of protection and compliance for clients with added customized training for employees</li>
        <li>Extra Discount: 10%</li>
        <li>Access to Wave Plus portal</li>
        <li>Type of reporting: Detailed report including inspection status, recommendations, consulting scraps, and training reports</li>
        <li>Technical support: Advanced level</li>
        <li>Priority: High</li>
      </ul>
    </b-card-text>
    <b-card-text v-else-if="interventionScrapData.intervention_scrap === 'Elite'">
      Description of Scrap:
      <ul>
        <li>Regular inspection and maintenance of fire equipments, emergency scrap call-outs, consulting scraps, customized training for employees, and 24/7 availability</li>
        <li>Intervention Frequency: half-yearly (plus free check-up visit) </li>
        <li>Advantages: This plan offers the ultimate level of protection and compliance for clients with 24/7 availability for emergencies, plus free check-up visit</li>
        <li>Extra Discount: 15%</li>
        <li>Access to Wave Plus portal</li>
        <li>Type of reporting: Detailed report including inspection status, recommendations, consulting scraps, and training reports</li>
        <li>Free tablet</li>
        <li>Technical support: Advanced level</li>
        <li>Priority: Urgent</li>
      </ul>
    </b-card-text>
    <b-card-text v-else>
      Unknown Scrap
    </b-card-text>
  </b-modal>
</template>
<script>
import {
  BModal,
  BCardText,
} from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BCardText,
  },
  props: {
    isUpdateInterventionScrapSidebarActive: {
      type: Boolean,
      required: true,
    },
    interventionScrapData: {
      type: Array,
      required: true,
    },
  },
}
</script>
