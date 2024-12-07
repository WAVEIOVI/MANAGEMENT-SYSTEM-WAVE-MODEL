<template>
  <b-modal
    id="modal-service-view"
    ok-only
    ok-title="Done"
    size="sm"
    centered
    title="Mission Service Information"
  >
    <b-card-text class="text-primary">
      Service:
    </b-card-text>
    <b-card-text>
      {{ missionServiceData.mission_service }}
    </b-card-text>
    <b-card-text v-if="missionServiceData.mission_service === 'Basic'">
      Description of Service:
      <ul>
        <li>Regular inspection and maintenance of fire extinguishers and fire hoses</li>
        <li>Intervention Frequency: Yearly</li>
        <li>Advantages: This plan ensures that all fire extinguishers are in proper working condition and compliant with local regulations</li>
        <li>Type of reporting: Basic report including inspection status and recommendations</li>
        <li>Technical support: Basic level</li>
        <li>Priority: Standard</li>
      </ul>
    </b-card-text>
    <b-card-text v-else-if="missionServiceData.mission_service === 'Basic Plus'">
      Description of Service:
      <ul>
        <li>Regular inspection and maintenance of fire extinguishers and fire hoses</li>
        <li>Intervention Frequency: half-yearly</li>
        <li>Advantages: This plan provides added protection for clients with emergency service call-outs for urgent maintenance needs</li>
        <li>Type of reporting: Basic report including inspection status and recommendations</li>
        <li>Technical support: Basic level</li>
        <li>Priority: Standard</li>
      </ul>
    </b-card-text>
    <b-card-text v-else-if="missionServiceData.mission_service === 'Company'">
      Description of Service:
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
    <b-card-text v-else-if="missionServiceData.mission_service === 'Entreprise'">
      Description of Service:
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
    <b-card-text v-else-if="missionServiceData.mission_service === 'Elite'">
      Description of Service:
      <ul>
        <li>Regular inspection and maintenance of fire equipments, emergency service call-outs, consulting services, customized training for employees, and 24/7 availability</li>
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
      Unknown Service
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
    isUpdateMissionServiceSidebarActive: {
      type: Boolean,
      required: true,
    },
    missionServiceData: {
      type: Array,
      required: true,
    },
  },
}
</script>
