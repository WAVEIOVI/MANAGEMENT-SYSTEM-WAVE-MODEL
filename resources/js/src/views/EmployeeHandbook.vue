<template>
  <div>
    <b-row>
      <b-col cols="12">
        <div class="group-area mt-1">
          <h6>1. Welcome Message</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <!-- Welcome Message -->
            <h5 class="mb-1">
              Introduction to the Employee Handbook
            </h5>
            <p>
              Dear SS PLUS Team,
            </p>
            <p>
              Welcome to SS PLUS, where your journey becomes an integral part of our shared success story. This Employee Handbook serves as your guide to understanding the values, policies, and expectations that define our vibrant workplace.
            </p>
            <p>
              As a member of SS PLUS, you play a crucial role in shaping our company's present and future. This handbook has been crafted to empower you with the knowledge and resources needed to thrive in our dynamic environment.
            </p>

            <!-- Overview of SS PLUS and its Values -->
            <h5 class="mb-1">
              Overview of SS PLUS and its Values
            </h5>
            <p>
              <b>Our Mission:</b>
            </p>
            <p>
              At SS PLUS, our mission is to safeguard lives and properties through cutting-edge fire protection services. We are dedicated to providing high-quality fire-fighting equipment, conducting thorough inspections, and ensuring the utmost safety in every project we undertake.
            </p>
            <p>
              <b>Our Vision:</b>
            </p>
            <p>
              We envision a world where fire safety is paramount, and SS PLUS is at the forefront of innovation and excellence in the fire protection industry. Our commitment to continuous improvement drives us to set new standards and exceed expectations.
            </p>
            <p>
              <b>Core Values:</b>
            </p>
            <ul>
              <li><b>Integrity:</b> We uphold the highest standards of honesty, transparency, and ethical conduct in all our interactions.</li>
              <li><b>Excellence:</b> We strive for excellence in everything we do, setting ambitious goals and continuously raising the bar for ourselves and our industry.</li>
              <li><b>Teamwork:</b> Collaboration is at the heart of our success. We value diverse perspectives and work together seamlessly to achieve our common objectives.</li>
              <li><b>Innovation:</b> We embrace innovation as a catalyst for progress. Through creativity and adaptability, we stay ahead of industry trends and provide cutting-edge solutions.</li>
              <li><b>Customer Focus:</b> Our customers are our priority. We are committed to understanding their needs and delivering solutions that exceed their expectations.</li>
            </ul>
            <p>
              By embracing these values, you contribute to the unique culture that defines SS PLUS and distinguishes us in the marketplace.
            </p>
            <p>
              Your dedication and expertise are vital to our continued success. We are excited to embark on this journey together and look forward to achieving great milestones as one cohesive team.
            </p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="kb-search-content-info match-height">
      <b-col
        md="4"
        sm="6"
        class="kb-search-content"
      >
        <b-card
          v-b-modal.company-overview
          class="card-developer-meetup cursor-pointer"
          :img-src="require('@/assets/images/illustration/marketing.svg')"
          img-top
        >
          <h4>2. Company Overview</h4>
        </b-card>
      </b-col>
      <b-col
        md="4"
        sm="6"
        class="kb-search-content"
      >
        <b-card
          v-b-modal.policies-and-guidelines
          class="card-developer-meetup cursor-pointer"
          :img-src="require('@/assets/images/illustration/personalization.svg')"
          img-top
        >
          <h4>3. Policies and Guidelines</h4>
        </b-card>
      </b-col>
      <b-col
        md="4"
        sm="6"
        class="kb-search-content"
      >
        <b-card
          v-b-modal.employee-benefits
          class="card-developer-meetup cursor-pointer"
          :img-src="require('@/assets/images/illustration/api.svg')"
          img-top
        >
          <h4>4. Employee Benefits</h4>
        </b-card>
      </b-col>
      <b-col
        md="4"
        sm="6"
        class="kb-search-content"
      >
        <b-card
          v-b-modal.workplace-resources
          class="card-developer-meetup cursor-pointer"
          :img-src="require('@/assets/images/illustration/demand.svg')"
          img-top
        >
          <h4>5. Workplace Resources</h4>
        </b-card>
      </b-col>
      <b-col
        md="4"
        sm="6"
        class="kb-search-content"
      >
        <b-card
          v-b-modal.employee-relations
          class="card-developer-meetup cursor-pointer"
          :img-src="require('@/assets/images/illustration/sales.svg')"
          img-top
        >
          <h4>6. Employee Relations</h4>
        </b-card>
      </b-col>
      <b-col
        md="4"
        sm="6"
        class="kb-search-content"
      >
        <b-card
          v-b-modal.leaving-the-company
          class="card-developer-meetup cursor-pointer"
          :img-src="require('@/assets/images/illustration/email.svg')"
          img-top
        >
          <h4>7. Leaving the Company</h4>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="group-area mt-1">
          <h6>8. Acknowledgment of Receipt</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <!-- Employee Acknowledgment Form -->
            <h5 class="mb-1">
              Employee Acknowledgment Form
            </h5>
            <p>
              I, _______________ , acknowledge that I have received, read, and understood the contents of the SS PLUS Employee Handbook. I understand that it is my responsibility to familiarize myself with the policies, guidelines, and procedures outlined in the handbook.
            </p>
            <p>
              I understand that SS PLUS may update or revise the Employee Handbook from time to time, and I commit to staying informed about any changes communicated by the company.
            </p>
            <p>
              By signing this acknowledgment, I confirm my commitment to adhere to the policies and guidelines outlined in the SS PLUS Employee Handbook during my employment with the company.
            </p>

            <p class="mt-3">
              Employee Name: ________________________
            </p>
            <p>
              Position: _______________________________
            </p>
            <p>
              Date: _________________________________
            </p>

            <p class="mt-3">
              [Employee Signature]
            </p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <company-overview />
    <policies-and-guidelines />
    <employee-benefits />
    <workplace-resources />
    <employee-relations />
    <leaving-the-company />
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
//   BTable,
//   BLink,
  //   BCardText,
//   BMedia,
  //   BImg,
//   BAvatar,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import CompanyOverview from './handbook/CompanyOverview.vue'
import PoliciesAndGuidelines from './handbook/PoliciesAndGuidelines.vue'
import EmployeeBenefits from './handbook/EmployeeBenefits.vue'
import WorkplaceResources from './handbook/WorkplaceResources.vue'
import EmployeeRelations from './handbook/EmployeeRelations.vue'
import LeavingTheCompany from './handbook/LeavingTheCompany.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    // BTable,
    // BLink,
    // BCardText,
    // BMedia,
    // BImg,
    // BAvatar,
    CompanyOverview,
    PoliciesAndGuidelines,
    EmployeeBenefits,
    WorkplaceResources,
    EmployeeRelations,
    LeavingTheCompany,
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
  setup() {
    const procedureColumns = [
      { key: 'processes' },
      { key: 'id' },
      { key: 'procedure' },
      { key: 'description' },
    ]
    const instructionColumns = [
      { key: 'processes' },
      { key: 'id' },
      { key: 'instruction' },
      { key: 'description' },
    ]
    const data = {
      procedureItems: [
        {
          id: 'PRO|01',
          processes: 'Sales Processes',
          procedure: 'Lead Generation Procedure',
          description: '<ul class="mb-2"><li>Identify potential clients through marketing campaigns, industry events, and client referrals.</li><li>Initiate contact to gather information on client needs and challenges.</li><li>Document client information and inquiries for further analysis.</li></ul>',
          modal: 'lead-generation-procedure',
        },
        {
          id: 'PRO|02',
          processes: 'Sales Processes',
          procedure: 'Proposal and Negotiation Procedure',
          description: '<ul class="mb-2"><li>Develop detailed proposals outlining services, pricing, and terms.</li><li>Present proposals to clients, addressing any queries or concerns.</li><li>Engage in negotiation to reach mutually agreed-upon terms and conditions.</li></ul>',
          modal: 'proposal-and-negotiation-procedure',
        },
        {
          id: 'PRO|03',
          processes: 'Sales Processes',
          procedure: 'Contractual Agreements Procedure',
          description: '<ul class="mb-2"><li>Prepare contractual agreements detailing discussed terms and conditions.</li><li>Internally review contracts to ensure compliance with organizational policies and legal requirements.</li><li>Seek approval from the relevant authorities before finalizing and executing contracts.</li></ul>',
          modal: 'contractual-agreements-procedure',
        },
        {
          id: 'PRO|04',
          processes: 'Inspection and Maintenance',
          procedure: 'Scheduling and Coordination Procedure',
          description: '<ul class="mb-2"><li>Efficiently schedule combined inspection and maintenance interventions based on client requirements.</li><li>Coordinate resources, including technicians and equipment, to optimize efficiency.</li></ul>',
          modal: 'scheduling-and-coordination-procedure',
        },
        {
          id: 'PRO|05',
          processes: 'Inspection and Maintenance',
          procedure: 'On-Site Inspection and Maintenance Procedure',
          description: '<ul class="mb-2"><li>Simultaneously execute thorough examination and maintenance tasks during on-site interventions.</li><li>Document inspection findings and implement necessary maintenance actions.</li></ul>',
          modal: 'on-site-inspection-and-maintenance-procedure',
        },
        {
          id: 'PRO|06',
          processes: 'Inspection and Maintenance',
          procedure: 'Service Planning and Implementation Procedure',
          description: '<ul class="mb-2"><li>Plan maintenance schedules based on inspection findings.</li><li>Integrate inspection results to inform and guide maintenance procedures.</li><li>Adhere to safety protocols and quality standards for both inspection and maintenance activities.</li></ul>',
          modal: 'service-planning-and-implementation-procedure',
        },
        {
          id: 'PRO|07',
          processes: 'Inspection and Maintenance',
          procedure: 'Client Communication Procedure',
          description: '<ul class="mb-2"><li>Timely communicate with clients regarding combined inspection and maintenance activities.</li><li>Provide comprehensive reports, including both inspection findings and performed maintenance tasks.</li><li>Proactively communicate recommendations for future maintenance needs based on inspection outcomes.</li></ul>',
          modal: 'client-communication-procedure',
        },
        {
          id: 'PRO|08',
          processes: 'Quality Control',
          procedure: 'Internal Audits Procedure',
          description: '<ul class="mb-2"><li>Conduct regular internal audits to assess compliance with quality standards.</li><li>Identify areas for improvement and implement corrective actions.</li></ul>',
          modal: 'internal-audits-procedure',
        },
        {
          id: 'PRO|09',
          processes: 'Quality Control',
          procedure: 'Client Feedback Integration Procedure',
          description: '<ul class="mb-2"><li>Incorporate client feedback into quality improvement initiatives.</li><li>Continuously refine operational processes based on client experiences.</li></ul>',
          modal: 'client-feedback-integration-procedure',
        },
        {
          id: 'PRO|10',
          processes: 'Financial and Administrative',
          procedure: 'Financial Planning and Reporting Procedure',
          description: '<ul class="mb-2"><li></li><li></li></ul>',
          modal: 'financial-planning-and-reporting-procedure',
        },
        {
          id: 'PRO|11',
          processes: 'Financial and Administrative',
          procedure: 'Administrative Processes',
          description: '<ul class="mb-2"><li></li><li></li></ul>',
          modal: 'administrative-processes',
        },
        {
          id: 'PRO|12',
          processes: 'Resource Management Process',
          procedure: 'Human Resources Management',
          description: '<ul class="mb-2"><li></li><li></li></ul>',
          modal: 'human-resources-management',
        },
        {
          id: 'PRO|13',
          processes: 'Resource Management Process',
          procedure: 'Material Resources Management',
          description: '<ul class="mb-2"><li></li><li></li></ul>',
          modal: 'material-resources-management',
        },
      ],
      instructionItems: [
        {
          id: 'INS|01',
          processes: 'Sales Processes',
          instruction: 'Client Engagement Protocol',
          description: '<ul class="mb-2"><li>Engage with clients professionally, emphasizing SS PLUSs commitment to their needs.</li><li>Utilize active listening techniques to understand client requirements thoroughly.</li><li>Maintain a customer-focused approach during all interactions.</li></ul>',
          modal: 'client-engagement-protocol',
        },
        {
          id: 'INS|02',
          processes: 'Sales Processes',
          instruction: 'Proposal Presentation Guidelines',
          description: '<ul class="mb-2"><li>Present proposals in a clear and organized manner.</li><li>Highlight key service offerings, pricing details, and benefits to the client.</li><li>Address client queries promptly and comprehensively.</li></ul>',
          modal: 'proposal-presentation-guidelines',
        },
        {
          id: 'INS|3',
          processes: 'Inspection and Maintenance',
          instruction: 'On-Site Intervention Protocol',
          description: '<ul class="mb-2"><li>Conduct on-site interventions with a professional and respectful demeanor.</li><li>Simultaneously perform thorough inspections and maintenance tasks efficiently.</li><li>Adhere to safety protocols and communicate effectively with clients during interventions.</li></ul>',
        },
        {
          id: 'INS|05',
          processes: 'Inspection and Maintenance',
          instruction: 'Service Planning and Implementation Guidelines',
          description: '<ul class="mb-2"><li>Plan maintenance schedules based on inspection findings.</li><li>Coordinate resources effectively for seamless implementation of maintenance activities.</li><li>Document and report maintenance actions taken during interventions.</li></ul>',
        },
        {
          id: 'INS|06',
          processes: 'Inspection and Maintenance',
          instruction: 'Client Communication Best Practices',
          description: '<ul class="mb-2"><li>Communicate inspection findings and maintenance outcomes clearly to clients.</li><li>Provide recommendations for future maintenance needs based on inspection results.</li><li>Foster a transparent and collaborative relationship with clients through effective communication.</li></ul>',
        },
        {
          id: 'INS|07',
          processes: 'Inspection and Maintenance',
          instruction: 'Technical Instruction | Equipment Handling and Operation',
          description: '<ul class="mb-2"><li>Provide detailed instructions on the proper handling and operation of fire protection equipment.</li><li>Conduct regular training sessions to keep staff updated on the latest technical aspects.</li><li>Emphasize the importance of adherence to technical standards and best practices.</li></ul>',
        },
        {
          id: 'INS|08',
          processes: 'Safety Instructions',
          instruction: 'General Safety Guidelines',
          description: '<ul class="mb-2"><li>Emphasize the importance of adhering to safety protocols in all operational activities.</li><li>Provide training on the use of personal protective equipment (PPE) and other safety measures.</li><li>Encourage a safety-first culture within the organization.</li></ul>',
        },
      ],
    }
    return {
      procedureColumns,
      instructionColumns,
      data,
    }
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
