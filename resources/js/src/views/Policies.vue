<template>
  <b-row>
    <client-satisfaction-policy />
    <quality-assurance-policy />
    <safety-policy />
    <ethical-business-practices-policy />
    <compliance-policy />
    <innovation-policy />
    <!-- blogs -->
    <b-col cols="12">
      <b-card
        title="III. Policies"
      />
      <section id="knowledge-base-content">

        <!-- content -->
        <b-row class="kb-search-content-info match-height">
          <b-col
            md="4"
            sm="6"
            class="kb-search-content"
          >
            <b-card
              v-b-modal.client-satisfaction-policy
              class="card-developer-meetup cursor-pointer"
              :img-src="require('@/assets/images/illustration/marketing.svg')"
              img-top
            >
              <h4>3.1 Client Satisfaction Policy</h4>
              <b-card-text class="mt-1">
                <h5>
                  Policy Statement:
                </h5>
                <p>
                  SS PLUS is dedicated to achieving and exceeding client satisfaction in all aspects of its operations, including the sale, inspection, and maintenance of fire protection equipment. This commitment extends to the continuous improvement of client interactions and service delivery.
                </p>
                <h5>
                  Key Elements:
                </h5>
                <ul class="mb-2">
                  <li>Implement feedback mechanisms to assess and address client needs and expectations.</li>
                  <li>Regularly review and enhance client engagement strategies to foster lasting relationships.</li>
                </ul>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col
            md="4"
            sm="6"
            class="kb-search-content"
          >
            <b-card
              v-b-modal.quality-assurance-policy
              class="card-developer-meetup cursor-pointer"
              :img-src="require('@/assets/images/illustration/personalization.svg')"
              img-top
            >
              <h4>3.2 Quality Assurance Policy</h4>
              <b-card-text class="mt-1">
                <h5>
                  Policy Statement:
                </h5>
                <p>
                  SS PLUS is committed to maintaining the highest standards of quality in the sale, inspection, and maintenance of fire protection equipment. This policy ensures that all operational activities consistently meet or exceed industry benchmarks.
                </p>
                <h5>
                  Key Elements:
                </h5>
                <ul class="mb-2">
                  <li>Establish standardized procedures and protocols for quality assurance in all operational processes.</li>
                  <li>Conduct regular internal audits to monitor and enhance quality standards.</li>
                </ul>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col
            md="4"
            sm="6"
            class="kb-search-content"
          >
            <b-card
              v-b-modal.safety-policy
              class="card-developer-meetup cursor-pointer"
              :img-src="require('@/assets/images/illustration/api.svg')"
              img-top
            >
              <h4>3.3 Safety Policy</h4>
              <b-card-text class="mt-1">
                <h5>
                  Policy Statement:
                </h5>
                <p>
                  SS PLUS prioritizes safety in all its activities, emphasizing the protection of clients, staff, and the community. This policy ensures the integration of safety measures in the sale, inspection, and maintenance of fire protection equipment.
                </p>
                <h5>
                  Key Elements:
                </h5>
                <ul class="mb-2">
                  <li>Develop and enforce safety protocols for all operational procedures.</li>
                  <li>Provide ongoing training to staff on safety practices and emergency response.</li>
                </ul>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col
            md="4"
            sm="6"
            class="kb-search-content"
          >
            <b-card
              v-b-modal.ethical-business-practices-policy
              class="card-developer-meetup cursor-pointer"
              :img-src="require('@/assets/images/illustration/demand.svg')"
              img-top
            >
              <h4>3.4 Ethical Business Practices Policy</h4>
              <b-card-text class="mt-1">
                <h5>
                  Policy Statement:
                </h5>
                <p>
                  SS PLUS conducts its business with the highest ethical standards, emphasizing integrity, honesty, and transparency in all interactions. This policy extends to all aspects of SS PLUS's operations, including sales, inspections, and maintenance activities.
                </p>
                <h5>
                  Key Elements:
                </h5>
                <ul class="mb-2">
                  <li>Communicate and uphold a code of ethics for all staff members.</li>
                  <li>Establish mechanisms to ensure compliance with ethical standards in business practices.</li>
                </ul>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col
            md="4"
            sm="6"
            class="kb-search-content"
          >
            <b-card
              v-b-modal.compliance-policy
              class="card-developer-meetup cursor-pointer"
              :img-src="require('@/assets/images/illustration/sales.svg')"
              img-top
            >
              <h4>3.5 Compliance Policy</h4>
              <b-card-text class="mt-1">
                <h5>
                  Policy Statement:
                </h5>
                <p>
                  SS PLUS is committed to adhering to all relevant laws, regulations, and industry standards. This policy ensures that all operations, including sales, inspections, and maintenance activities, comply with legal and regulatory requirements.
                </p>
                <h5>
                  Key Elements:
                </h5>
                <ul class="mb-2">
                  <li>Regularly review and update internal procedures to align with changing regulations.</li>
                  <li>Provide staff with ongoing training to ensure awareness and compliance.</li>
                </ul>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col
            md="4"
            sm="6"
            class="kb-search-content"
          >
            <b-card
              v-b-modal.innovation-policy
              class="card-developer-meetup cursor-pointer"
              :img-src="require('@/assets/images/illustration/email.svg')"
              img-top
            >
              <h4>3.6 Innovation Policy</h4>
              <b-card-text class="mt-1">
                <h5>
                  Policy Statement:
                </h5>
                <p>
                  SS PLUS embraces innovation as a key driver for success in the fire protection industry. This policy encourages the exploration and integration of new technologies and practices in all operational aspects, including sales, inspections, and maintenance.
                </p>
                <h5>
                  Key Elements:
                </h5>
                <ul class="mb-2">
                  <li>Foster a culture of innovation among staff members.</li>
                  <li>Collaborate with technology partners to explore and implement cutting-edge solutions.</li>
                </ul>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <!--/ blogs -->
  </b-row>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ClientSatisfactionPolicy from './policies/ClientSatisfactionPolicy.vue'
import QualityAssurancePolicy from './policies/QualityAssurancePolicy.vue'
import CompliancePolicy from './policies/CompliancePolicy.vue'
import EthicalBusinessPracticesPolicy from './policies/EthicalBusinessPracticesPolicy.vue'
import SafetyPolicy from './policies/SafetyPolicy.vue'
import InnovationPolicy from './policies/InnovationPolicy.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BCardText,
    ClientSatisfactionPolicy,
    QualityAssurancePolicy,
    SafetyPolicy,
    CompliancePolicy,
    InnovationPolicy,
    EthicalBusinessPracticesPolicy,
  },
  directives: {
    Ripple,
  },
  methods: {
    tagsColor(tag) {
      if (tag === 'Quote') return 'light-info'
      if (tag === 'Gaming') return 'light-danger'
      if (tag === 'Fashion') return 'light-primary'
      if (tag === 'Video') return 'light-warning'
      if (tag === 'Food') return 'light-success'
      return 'light-primary'
    },
  },
}
</script>

<style lang="scss">
@import '~@resources/scss/vue/pages/page-blog.scss';
@import '~@resources/scss/vue/pages/page-knowledge-base.scss';
</style>
<style>
.card-developer-meetup {
  transition: transform 0.2s ease-in-out;
}

.card-developer-meetup:hover {
  transform: scale(1.05);
}
</style>
