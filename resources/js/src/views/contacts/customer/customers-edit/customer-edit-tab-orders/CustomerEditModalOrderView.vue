<template>
  <b-modal
    id="modal-order-view"
    cancel-variant="outline-secondary"
    cancel-title="Close"
    ok-title="Accept"
    size="sm"
    title="Customer Order"
  >
    <!-- body -->
    <b-card-body>
      <b-row>

        <b-col>
          <b-card-text class="text-primary">
            Order Date :
          </b-card-text>
          <b-card-text>
            {{ customerOrderData.order_date }}
          </b-card-text>
          <b-card-text class="text-primary">
            Order ID :
          </b-card-text>
          <b-card-text>
            {{ customerOrderData.order_id }}
          </b-card-text>
          <b-card-text class="text-primary">
            Contract ID :
          </b-card-text>
          <b-card-text>
            {{ customerOrderData.order_contract_id }}
          </b-card-text>
          <b-card-text class="text-primary">
            Location ID :
          </b-card-text>
          <b-card-text>
            {{ customerOrderData.order_location_id }}
          </b-card-text>
        </b-col>
        <b-col>
          <b-card-text class="text-primary">
            Sending Type:
          </b-card-text>
          <b-card-text>
            {{ customerOrderData.order_sending_type }}
          </b-card-text>
          <b-card-text class="text-primary">
            Status:
          </b-card-text>
          <b-card-text>
            {{ customerOrderData.order_status }}
          </b-card-text>
          <b-card-text class="text-primary">
            Total :
          </b-card-text>
          <b-card-text>
            {{ customerOrderData.order_total }}
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
    customerOrderData: {
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
