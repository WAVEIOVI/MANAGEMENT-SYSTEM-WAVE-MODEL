<template>
  <b-modal
    id="company-overview"
    title="2. Company Overview"
    cancel-variant="outline-secondary"
    cancel-title="Close"
    size="lg"
    ok-only
    ok-title="Done"
    centered
  >
    <b-row>
      <b-col cols="12">
        <b-card>
          <div class="blog-content">
            <!-- Mission and Vision -->
            <h5 class="mb-1">
              Mission and Vision
            </h5>
            <p>
              <b>Mission:</b> At SS PLUS, our mission is to safeguard lives and properties through cutting-edge fire protection services. We are dedicated to providing high-quality fire-fighting equipment, conducting thorough inspections, and ensuring the utmost safety in every project we undertake.
            </p>
            <p>
              <b>Vision:</b> Our vision at SS PLUS is to envision a world where fire safety is paramount, and SS PLUS is at the forefront of innovation and excellence in the fire protection industry. Our commitment to continuous improvement drives us to set new standards and exceed expectations. Through a commitment to excellence and innovation, we aim to enhance fire safety globally and be recognized as leaders in the industry.
            </p>

            <!-- Organizational Structure -->
            <h5 class="mb-1">
              Organizational Structure
            </h5>
            <p>
              The success of SS PLUS is built upon a well-defined organizational structure that facilitates effective communication, collaboration, and operational efficiency. Our structure is designed to ensure that each team member contributes to the overall success of the company.
            </p>
            <p>
              The main components of our organizational structure include:
            </p>
            <ul>
              <li>
                <b-link
                  class="font-weight-bold d-block text-nowrap"
                >
                  <b>CEO (Chief Executive Officer):</b>
                </b-link>
                As the leader of SS PLUS, the CEO plays a pivotal role in strategic leadership and decision-making. They provide oversight of organizational performance and ensure alignment with strategic objectives.</li>
              <li>
                <b-link
                  class="font-weight-bold d-block text-nowrap"
                >
                  <b>Operations Manager:</b>
                </b-link>
                The Operations Manager oversees day-to-day operational activities at SS PLUS. They coordinate resources for efficient service delivery and play a key role in ensuring the smooth execution of projects.</li>
              <li>
                <b-link
                  class="font-weight-bold d-block text-nowrap"
                >
                  <b>Financial and Administrative Manager:</b>
                </b-link>
                Responsible for financial planning, budgeting, and reporting, the Financial and Administrative Manager also oversees human resources, facilities, and administrative processes to ensure the overall efficiency of operations.</li>
              <li>
                <b-link
                  class="font-weight-bold d-block text-nowrap"
                >
                  <b>Sales Manager:</b>
                </b-link>
                The Sales Manager is responsible for developing and executing sales strategies at SS PLUS. They manage client relationships and work towards achieving sales targets to contribute to the company's growth.</li>
              <li>
                <b-link
                  class="font-weight-bold d-block text-nowrap"
                >
                  <b>Debt Collector:</b>
                </b-link>
                Managing accounts receivable and collection processes, the Debt Collector collaborates with financial stakeholders to address outstanding debts and maintain financial stability for SS PLUS.</li>
              <li>
                <b-link
                  class="font-weight-bold d-block text-nowrap"
                >
                  <b>Team Leaders:</b>
                </b-link>
                Team Leaders provide supervision and guidance to Fire Protection Equipment Technicians. They report to the Operations Manager on team performance and challenges, ensuring efficient workflow.</li>
              <li>
                <b-link
                  class="font-weight-bold d-block text-nowrap"
                >
                  <b>Fire Protection Equipment Technicians:</b>
                </b-link>
                Technicians at SS PLUS are responsible for the execution of fire equipment inspections, maintenance, and installations. They adhere to safety protocols and quality standards to ensure the highest level of service delivery.</li>
            </ul>
            <p>
              Clear communication channels and reporting structures have been established to ensure that information flows seamlessly within the organization.
            </p>

          </div>
        </b-card>
      </b-col>
    </b-row>

  </b-modal>
</template>
<script>
import {
  BCard,
  BModal,
  BRow,
  BCol,
  BLink,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BModal,
    BRow,
    BCol,
    BLink,
  },
}
</script>
