<template>
  <b-modal
    id="modal-contact-view"
    ok-only
    ok-title="Done"
    size="sm"
    centered
    title="Customer Contact Information"
  >
    <b-card-text class="text-primary">
      Full Name :
    </b-card-text>
    <b-card-text>
      {{ customerContactData.contact_full_name }}
    </b-card-text>
    <b-card-text class="text-primary">
      Contact Post :
    </b-card-text>
    <b-card-text>
      {{ customerContactData.contact_post }}
    </b-card-text>
    <b-card-text class="text-primary">
      Phone :
    </b-card-text>
    <b-card-text> {{ customerContactData.contact_phone }} </b-card-text>
    <b-card-text class="text-primary">
      Email :
    </b-card-text>
    <b-card-text> {{ customerContactData.contact_email }} </b-card-text>
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
    customerContactData: {
      type: Array,
      required: true,
    },
  },
}
</script>
