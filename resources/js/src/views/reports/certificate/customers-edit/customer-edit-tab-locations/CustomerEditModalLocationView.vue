<template>
  <b-modal
    id="modal-location-view"
    ok-only
    ok-title="Done"
    size="sm"
    centered
    title="Customer Location Information"
  >
    <b-card-text class="text-primary">
      Location ID :
    </b-card-text>
    <b-card-text>
      {{ customerLocationData.location_id }}
    </b-card-text>
    <b-card-text class="text-primary">
      Location Description :
    </b-card-text>
    <b-card-text>
      {{ customerLocationData.location_description }}
    </b-card-text>
    <b-card-text class="text-primary">
      Opening Hours :
    </b-card-text>
    <b-card-text>
      {{ customerLocationData.location_opening }}
    </b-card-text>
    <b-card-text class="text-primary">
      Location Address :
    </b-card-text>
    <b-card-text>
      {{ customerLocationData.location_address }} {{ customerLocationData.location_postcode }} {{ customerLocationData.location_city }} {{ customerLocationData.location_country }}
    </b-card-text>
    <b-card-text class="text-primary">
      Contact Information: :
    </b-card-text>
    <b-card-text> {{ customerLocationData.location_phone }} </b-card-text>
    <b-card-text> {{ customerLocationData.location_email }} </b-card-text>
    <b-card-text class="text-primary">
      Coordinator :
    </b-card-text>
    <b-card-text>
      {{ customerLocationData.location_coordinator }} | {{ customerLocationData.coordinator_post }}
    </b-card-text>
    <b-card-text>
      {{ customerLocationData.coordinator_phone }} | {{ customerLocationData.coordinator_email }}
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
    isUpdateCustomerLocationSidebarActive: {
      type: Boolean,
      required: true,
    },
    customerLocationData: {
      type: Array,
      required: true,
    },
  },
}
</script>
