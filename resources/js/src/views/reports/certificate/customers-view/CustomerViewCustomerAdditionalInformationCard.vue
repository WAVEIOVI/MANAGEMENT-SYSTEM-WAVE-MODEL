<template>
  <b-card
    title="Additional Informations"
  >
    <b-list-group>
      <b-list-group-item>
        <b-badge variant="light-info">
          Tax ID
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.tax_id }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        <b-badge variant="light-info">
          RNE ID
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.rne_id }}
        </b-badge>
        <b-badge
          variant="warning"
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
            RNE Verification
          </b-link></b-badge>
      </b-list-group-item>
      <b-list-group-item>
        <b-badge variant="light-info">
          VAT EXEMPTION CERT:
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.vat_exemption }}
        </b-badge>
        <b-badge variant="light-success">
          <feather-icon
            icon="CalendarIcon"
            class="mr-25"
          />
          {{ customerData.vat_exemption_start }}
        </b-badge>
        <b-badge variant="light-danger">
          <feather-icon
            icon="CalendarIcon"
            class="mr-25"
          />
          {{ customerData.vat_exemption_end }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        <b-badge variant="light-info">
          Created Date
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.created_date }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        <b-badge variant="light-info">
          Company Form Legal:
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.company_form_legal }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        <b-badge variant="light-info">
          Company Capital:
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.company_capital }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        <b-badge variant="light-info">
          Bank Info:
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.bank_name }}
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.bank_agency }}
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.bank_rib }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item>
        <b-badge variant="light-info">
          Payment Method:
        </b-badge>
        <b-badge variant="light-primary">
          {{ customerData.customer_payment_method }}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item class="text-right">
        <b-link
          :href="customerData.customer_website"
          class="font-weight-bold d-block text-nowrap"
          target="_blank"
        >
          <feather-icon
            icon="GlobeIcon"
          />
          {{ customerData.customer_website }}
        </b-link>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import {
  BCard,
  BBadge,
  BListGroup,
  BListGroupItem,
  BLink,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BBadge,
    BListGroup,
    BListGroupItem,
    BLink,
  },
  props: {
    customerData: {
      type: Object,
      required: true,
    },
  },
}
</script>

  <style>

  </style>
