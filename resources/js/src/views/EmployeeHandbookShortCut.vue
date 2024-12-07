<template>
  <div>
    <b-row>
      <b-col cols="12">
        <div class="group-area mt-1">
          <h6>{{ $t('Welcome Message') }}</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <!-- Welcome Message -->
            <h5 class="mb-1">
              {{ $t('welcomeMessage') }}
            </h5>
            <p>{{ $t('dearTeam') }}</p>
            <p>{{ $t('welcomeText') }}</p>
            <p>{{ $t('memberRole') }}</p>
            <!-- Overview of SS PLUS and its Values -->
            <h5 class="mb-1">
              {{ $t('valuesHeading') }}
            </h5>

            <p> <b>{{ $t('missionTitle') }}</b> {{ $t('mission') }}</p>
            <p> <b>{{ $t('visionTitle') }}</b> {{ $t('vision') }}</p>
            <p> <b>{{ $t('coreValuesTitle') }}</b> {{ $t('coreValues') }}</p>
            <p>{{ $t('dedicationText') }}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="group-area mt-1">
          <h6>{{ $t('2. Attendance and Punctuality') }}</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <!-- Office Hours Introduction -->
            <p>{{ $t('officeHoursIntro') }}</p>
            <!-- Standard Office Hours -->
            <h5 class="mb-1">
              {{ $t('a. Office Hours') }}
            </h5>
            <ul>
              <li><b>{{ $t('standardOfficeHoursTitle') }}</b> {{ $t('standardOfficeHours') }}</li>
              <li><b>{{ $t('summerTimeTitle') }}</b> {{ $t('summerTime') }}</li>
              <li><b>{{ $t('ramadanTimeTitle') }}</b> {{ $t('ramadanTime') }}</li>
              <li><b>{{ $t('punctualityTitle') }}</b> {{ $t('punctuality') }}</li>
              <li><b>{{ $t('lateArrivalProcedureTitle') }}</b> {{ $t('lateArrivalProcedure') }}</li>
              <li><b>{{ $t('recognitionForPunctualityTitle') }}</b> {{ $t('recognitionForPunctuality') }}</li>
              <li><b>{{ $t('earlyArrivalBonusTitle') }}</b> {{ $t('earlyArrivalBonus') }}</li>
              <li><b>{{ $t('additionalHoursTitle') }}</b> {{ $t('additionalHours') }}</li>
            </ul>
            <p>{{ $t('teamAvailability') }}</p>
            <!-- Breaks and Lunch -->
            <!-- Breaks and Lunch -->
            <h5 class="mb-1">
              {{ $t('b. Breaks and Lunch') }}
            </h5>
            <!-- Breaks and Lunch Introduction -->
            <p>{{ $t('breaksAndLunchIntro') }}</p>
            <!-- Breaks and Lunch List -->
            <ul>
              <li
                v-for="item in $t('breaksAndLunchList')"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
            <!-- Breaks and Lunch Conclusion -->
            <p>{{ $t('breaksAndLunchConclusion') }}</p>
            <!-- Travel and Accommodation -->
            <h5 class="mb-1">
              {{ $t('c. Travel and Accommodation') }}
            </h5>
            <!-- Travel and Accommodation Introduction -->
            <p>{{ $t('travelAndAccommodationIntro') }}</p>
            <!-- Travel and Accommodation List -->
            <ul>
              <li
                v-for="item in $t('travelAndAccommodationList')"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
            <!-- Travel and Accommodation Conclusion -->
            <p>{{ $t('travelAndAccommodationConclusion') }}</p>
            <!-- Dress Code -->
            <h5 class="mb-1">
              {{ $t('d. Dress Code') }}
            </h5>
            <!-- Appropriate Attire for Different Roles -->
            <h5 class="mb-1">
              {{ $t('appropAttireTitle') }}
            </h5>
            <p v-html="$t('appropAttireIntro')" />
            <!-- Appropriate Attire List -->
            <ul>
              <li
                v-for="item in $t('appropAttireList')"
                :key="item"
                v-html="item"
              />
            </ul>

            <!-- Safety Considerations -->
            <h5 class="mb-1">
              {{ $t('Safety Considerations') }}
            </h5>
            <p>{{ $t('safetyIntro') }}</p>
            <!-- Safety Considerations List -->
            <ul>
              <li
                v-for="item in $t('safetyList')"
                :key="item"
                v-html="item"
              />
            </ul>
            <p>{{ $t('safetyConclusion') }}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="group-area mt-1">
          <h6>{{ $t('3. Exploring Your Benefits title') }}</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <!-- Compensation and Payroll -->
            <h5 class="mb-1">
              {{ $t('Compensation and Payroll title') }}
            </h5>
            <!-- Pay Structure -->
            <h5 class="mb-1">
              {{ $t('Pay Structure title') }}
            </h5>
            <p>{{ $t('SS PLUS is committed to offering competitive...') }}</p>
            <ul>
              <li><b>{{ $t('Base Salary') }}</b> {{ $t('The base salary is determined based on...') }}</li>
              <li><b>{{ $t('Performance-Based Incentives') }}</b> {{ $t('In addition to the base salary, performance-based...') }}</li>
              <li><b>{{ $t('Salary Reviews') }}</b> {{ $t('Periodic salary reviews will be conducted...') }}</li>
              <li><b>{{ $t('Transparent Communication') }}</b> {{ $t('SS PLUS is committed to transparent communication...') }}</li>
              <li><b>{{ $t('Pay Structures') }}</b>
                <ul>
                  <li><b>{{ $t('Staff Office') }}</b> {{ $t('Paid per the number of worked days...') }}</li>
                  <li><b>{{ $t('Fire Protection Equipment Technicians') }}</b> {{ $t('Paid per worked hour in the month...') }}</li>
                  <li><b>{{ $t('Mission/Action/Operation') }}</b> {{ $t('Payment is based on specific contracts...') }}</li>
                </ul>
              </li>
            </ul>

            <!-- Payroll Schedule -->
            <h5 class="mb-1">
              {{ $t('Payroll Schedule title') }}
            </h5>
            <p>{{ $t('The payroll schedule outlines the frequency...') }}</p>
            <ul>
              <li><b>{{ $t('Payment Frequency') }}</b> {{ $t('Salaries are typically paid on...') }}</li>
              <li><b>{{ $t('Direct Deposit') }}</b> {{ $t('SS PLUS encourages team members to...') }}</li>
              <li><b>{{ $t('Payroll Cycles') }}</b> {{ $t('Payroll cycles are aligned with the...') }}</li>
              <li><b>{{ $t('Payroll Inquiries') }}</b> {{ $t('For any payroll-related inquiries or concerns...') }}</li>
            </ul>

            <p>{{ $t('SS PLUS values the dedication and hard work...') }}</p>

            <!-- Leave Policies -->
            <h5 class="mb-1">
              {{ $t('Leave Policies title') }}
            </h5>

            <!-- Vacation -->
            <h5 class="mb-1">
              {{ $t('Vacation title') }}
            </h5>
            <p>{{ $t('SS PLUS recognizes the importance of providing...') }}</p>
            <ul>
              <li><b>{{ $t('Accrual and Entitlement') }}</b> {{ $t('Team members accrue vacation leave based on...') }}</li>
              <li><b>{{ $t('Request and Approval') }}</b> {{ $t('Submit vacation leave requests through the...') }}</li>
              <li><b>{{ $t('Response Time') }}</b> {{ $t('Employees will receive a response within...') }}</li>
              <li><b>{{ $t('Refused Requests') }}</b> {{ $t('If a vacation leave request is refused...') }}</li>
              <li><b>{{ $t('Maximum Accumulation') }}</b> {{ $t('There may be a maximum limit on...') }}</li>
              <li><b>{{ $t('Usage Guidelines') }}</b> {{ $t('Ensure that vacation days are used in...') }}</li>
            </ul>

            <!-- Sick Leave -->
            <h5 class="mb-1">
              {{ $t('Sick Leave title') }}
            </h5>
            <p>{{ $t('SS PLUS understands that team members may...') }}</p>
            <ul>
              <li><b>{{ $t('Accrual and Entitlement') }}</b> {{ $t('Team members accrue sick leave based on...') }}</li>
              <li><b>{{ $t('Medical Documentation') }}</b> {{ $t('In cases of extended sick leave, a medical...') }}</li>
              <li><b>{{ $t('Notification') }}</b> {{ $t('Notify supervisors as soon as possible if...') }}</li>
              <li><b>{{ $t('Return-to-Work Process') }}</b> {{ $t('After a period of sick leave, team members...') }}</li>
            </ul>

            <!-- Holidays -->
            <h5 class="mb-1">
              {{ $t('Holidays title') }}
            </h5>
            <p>{{ $t('SS PLUS observes public holidays to allow...') }}</p>
            <ul>
              <li><b>{{ $t('Recognition of Public Holidays') }}</b> {{ $t('The company recognizes and observes the following...') }}
                <ul>
                  <li>Monday, January 1, 2024: New Year</li>
                  <li>Wednesday, March 20, 2024: Tunisian Independence Day</li>
                  <li>Tuesday, April 9, 2024: Martyrs' Day</li>
                  <li>Tuesday, April 9, 2024: Eid El Fitr holiday (2 days – The date may be shifted by one day, depending on whether or not the crescent moon marking the start of the month is taken into account.)</li>
                  <li>Wednesday, May 1, 2024: Labor Day</li>
                  <li>Sunday, June 16, 2024: Eid El Idha (2 days – The date may be shifted by one day, depending on whether or not the crescent moon marking the start of the month is taken into account.)</li>
                  <li>Monday, July 8, 2024: New Year’s Day Hegira (Ras El Am El Hijri) (to be confirmed)</li>
                  <li>Thursday, July 25, 2024: Republic Day</li>
                  <li>Tuesday, August 13, 2024: Women's Day</li>
                  <li>Monday, September 16, 2024 (to be confirmed): Al Mawlid</li>
                  <li>Tuesday, October 15, 2024: Evacuation Day</li>
                  <li>Tuesday, December 17, 2024: Revolution Day</li>
                  <!-- <li><b>Monday, January 1, 2024:</b> {{ $t('New Year') }}</li>
                  <li><b>Wednesday, March 20, 2024:</b> {{ $t('Tunisian Independence Day') }}</li> -->
                  <!-- ... (add translations for other holidays) -->
                </ul>
              </li>
              <li><b>{{ $t('Compensation for Working Holidays') }}</b> {{ $t('Team members required to work on public...') }}</li>
              <li><b>{{ $t('Communication of Holiday Schedule') }}</b> {{ $t('The holiday schedule for the year will...') }}</li>
            </ul>

            <p>{{ $t('SS PLUS values the well-being of its...') }}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="group-area mt-1">
          <h6>{{ $t('Investing in Your Growth title') }}</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <!-- Professional Development -->
            <h5 class="mb-1">
              {{ $t('Professional Development title') }}
            </h5>

            <!-- Career Advancement -->
            <h5 class="mb-1">
              {{ $t('Career Advancement title') }}
            </h5>
            <p>{{ $t('Career Advancement SS PLUS recognizes the importance of providing...') }}</p>
            <ul>
              <li><b>{{ $t('Technician Categories') }}</b> {{ $t('Fire Protection Equipment Technicians are initially categorized...') }}</li>
              <li><b>{{ $t('Salary Structure') }}</b> {{ $t('The monthly salary of Fire Protection Equipment Technicians is...') }}</li>
              <li><b>{{ $t('Evaluation Axes') }}</b> {{ $t('Evaluation criteria include punctuality, discipline, expertise, communication, and other relevant factors.') }}</li>
            </ul>

            <!-- Career Advancement Opportunities -->
            <p>{{ $t('Key points related to career advancement include:') }}</p>
            <ul>
              <li><b>{{ $t('Promotion Opportunities') }}</b> {{ $t('Eligible team members may have the opportunity...') }}</li>
              <li><b>{{ $t('Succession Planning') }}</b> {{ $t('SS PLUS engages in succession planning to identify...') }}</li>
              <li><b>{{ $t('Performance Reviews') }}</b> {{ $t('Regular performance reviews provide a platform for discussions about...') }}</li>
              <li><b>{{ $t('Professional Growth Support') }}</b> {{ $t('SS PLUS may provide support for team members pursuing further education, certifications, or additional qualifications...') }}</li>
            </ul>

            <p>{{ $t('By investing in professional development and career advancement...') }}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="group-area mt-1">
          <h6>{{ $t('5. Navigating the Workplace') }}</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <!-- Office Facilities -->
            <h5 class="mb-1">
              {{ $t('a. Office Facilities') }}
            </h5>

            <!-- Workstations -->
            <h5 class="mb-1">
              {{ $t('Workstations title') }}
            </h5>
            <p>{{ $t('SS PLUS provides comfortable and efficient workstations to support the productivity and well-being of its team members. Key points related to workstations include:') }}</p>
            <ul>
              <li><b>{{ $t('Ergonomic Design') }}</b> {{ $t('Workstations are designed with ergonomic principles...') }}</li>
              <li><b>{{ $t('Equipment and Tools') }}</b> {{ $t('Each workstation is equipped with the necessary tools and equipment required for specific roles...') }}</li>
              <li><b>{{ $t('Personalization') }}</b> {{ $t('Team members are encouraged to personalize their workstations within the guidelines provided, creating a comfortable and inspiring work environment.') }}</li>
              <li><b>{{ $t('Maintenance') }}</b> {{ $t('Regular maintenance and checks are conducted to ensure that workstations are in optimal condition, and any issues are addressed promptly.') }}</li>
            </ul>

            <!-- Common Areas -->
            <h5 class="mb-1">
              {{ $t('Common Areas title') }}
            </h5>
            <p>{{ $t('SS PLUS recognizes the importance of providing inviting and functional common areas where team members can collaborate, relax, and engage in informal discussions. Key points related to common areas include:') }}</p>
            <ul>
              <li><b>{{ $t('Collaboration Spaces') }}</b> {{ $t('Common areas are designed to facilitate collaboration, with designated spaces for team meetings, brainstorming sessions, and discussions.') }}</li>
              <li><b>{{ $t('Cleanliness and Maintenance') }}</b> {{ $t('Regular cleaning schedules and maintenance checks are in place to ensure that common areas remain clean, organized, and conducive to a positive work environment.') }}</li>
              <li><b>{{ $t('Guidelines for Usage') }}</b> {{ $t('Team members are encouraged to use common areas responsibly, respecting the needs and preferences of their colleagues. Any specific guidelines for usage will be communicated clearly.') }}</li>
            </ul>

            <!-- Technicians' Workshop Responsibilities -->
            <h5 class="mb-1">
              {{ $t('Technicians\' Workshop Responsibilities title') }}
            </h5>
            <p>{{ $t('Technicians at SS PLUS play a crucial role in maintaining the cleanliness and organization of the workshop. Responsibilities include:') }}</p>
            <ul>
              <li><b>{{ $t('Daily Cleanliness') }}</b> {{ $t('Technicians working in the workshop are responsible for ensuring that workstations are clean, equipment and tools are in their designated places, and all electrical equipment is turned off 15 minutes before closing time each day.') }}</li>
              <li><b>{{ $t('Monthly General Clean') }}</b> {{ $t('On the 14th and 28th of each month, technicians collectively conduct a general cleaning session. If these dates are inconvenient, the session can be rescheduled within one to three days before or after the original date.') }}</li>
              <li><b>{{ $t('Reporting') }}</b> {{ $t('Any issues or concerns related to workshop cleanliness or maintenance should be promptly reported to the designated authority.') }}</li>
            </ul>
            <p>{{ $t('SS PLUS is committed to providing a workplace that supports the comfort and well-being of its team members, fostering a positive and collaborative atmosphere.') }}</p>
            <!-- Technology and Equipment -->
            <!-- Technology and Equipment -->
            <h5 class="mb-1">
              {{ $t('Technology and Equipment title') }}
            </h5>

            <!-- Proper Use of Company Devices -->
            <h5 class="mb-1">
              {{ $t('Proper Use of Company Devices title') }}
            </h5>
            <p>{{ $t('SS PLUS provides team members with access to various technological devices to support their work. It is essential to use these devices responsibly and in alignment with company policies. Key points related to the proper use of company devices include:') }}</p>
            <ul>
              <li><b>{{ $t('Authorized Use') }}</b> {{ $t('Company devices, including computers, laptops, tablets, and smartphones, are provided for work-related activities. Unauthorized personal use may be subject to disciplinary action.') }}</li>
              <li><b>{{ $t('Security Measures') }}</b> {{ $t('Team members are responsible for implementing security measures, such as password protection and data encryption, to safeguard company information stored on devices.') }}</li>
              <li><b>{{ $t('Software Usage') }}</b> {{ $t('Install only authorized software on company devices. Obtain approval from the IT department before installing any third-party software or applications.') }}</li>
              <li><b>{{ $t('Reporting Issues') }}</b> {{ $t('Report any issues, malfunctions, or loss of company devices promptly to the IT department to ensure timely resolution and prevent potential security risks.') }}</li>
            </ul>

            <!-- IT Security Policies -->
            <h5 class="mb-1">
              {{ $t('IT Security Policies title') }}
            </h5>
            <p>{{ $t('SS PLUS prioritizes the security of its digital assets, and team members are expected to adhere to IT security policies to prevent unauthorized access and protect sensitive information. Key points related to IT security policies include:') }}</p>
            <ul>
              <li><b>{{ $t('Access Control') }}</b> {{ $t('Access to company systems and data is restricted based on job roles. Team members should not share login credentials, and access should only be granted to individuals with the necessary permissions.') }}</li>
              <li><b>{{ $t('Confidentiality') }}</b> {{ $t('Treat all company information as confidential. Do not disclose sensitive information to unauthorized individuals, and be cautious about discussing work-related matters in public or insecure environments.') }}</li>
              <li><b>{{ $t('Data Backup') }}</b> {{ $t('Regularly back up important data to prevent data loss in case of device malfunction or other unforeseen circumstances. Follow company guidelines for data backup procedures.') }}</li>
              <li><b>{{ $t('Security Training') }}</b> {{ $t('SS PLUS provides periodic training on IT security best practices. Team members are required to participate in these training sessions to stay informed about potential threats and security protocols.') }}</li>
            </ul>
            <p>{{ $t('By following proper procedures for the use of company devices and adhering to IT security policies, team members contribute to a secure and efficient digital environment at SS PLUS.') }}</p>

            <!-- Proper Use of Company Cars -->
            <h5 class="mb-1">
              {{ $t('Proper Use of Company Cars title') }}
            </h5>
            <p>{{ $t('SS PLUS is committed to ensuring the proper use and maintenance of company cars. Key points related to the proper use of company cars include:') }}</p>
            <ul>
              <li><b>{{ $t('List of Authorized Drivers') }}</b> {{ $t('SS PLUS maintains a list of authorized drivers with specified levels of authorization. Authorization is indicated by a badge provided to authorized drivers.') }}</li>
              <li><b>{{ $t('Checklist for Car Check') }}</b> {{ $t('Even authorized drivers must fill out a checklist for car checks before embarking on any missions to ensure the vehicle is in optimal condition.') }}</li>
              <li><b>{{ $t('Priority Usage') }}</b> {{ $t('Company cars are categorized as service cars (for company services) and company cars (with broader authorization). Technicians may use service cars within 2 hours after and before office hours, while company cars have broader usage.') }}</li>
              <li><b>{{ $t('Responsibility of Drivers') }}</b> {{ $t('Drivers are responsible for the proper use of the cars, including adherence to authorized usage times and prioritizing company-related missions.') }}</li>
              <li><b>{{ $t('Disciplinary Actions') }}</b> {{ $t('In case of non-priority usage, drivers may face disciplinary meetings with supervisors and HR responsible. All company cars are equipped with GPS trackers for monitoring purposes.') }}</li>
              <li><b>{{ $t('Vacation or Sick Leave') }}</b> {{ $t('In the absence of an authorized driver due to vacation or sick leave, the company car should be parked at SS PLUS.') }}</li>
              <li><b>{{ $t('GPS Tracker') }}</b> {{ $t('All company cars are equipped with GPS trackers to monitor their location and usage.') }}</li>
            </ul>

            <!-- Tools and Equipment -->
            <h5 class="mb-1">
              {{ $t('Tools and Equipment title') }}
            </h5>
            <p>{{ $t('SS PLUS places importance on the responsible use and maintenance of tools and equipment. Key points related to tools and equipment include:') }}</p>
            <ul>
              <li><b>{{ $t('Lost or Broken Tools') }}</b> {{ $t('In case of lost or broken tools or equipment due to improper usage, the cost of replacement is shared among the team. The replacement must be approved by supervisors and HR responsible.') }}</li>
              <li><b>{{ $t('Equipment in Workshop') }}</b> {{ $t('If equipment is lost or broken in the workshop, the cost is deducted from the salaries of all present technicians on that day.') }}</li>
              <li><b>{{ $t('Equipment in Mobile Workstations') }}</b> {{ $t('If equipment is lost or broken in mobile workstations (cars or client on-site), the cost is deducted from the salaries of the team leader and her team.') }}</li>
            </ul>
            <p>{{ $t('SS PLUS emphasizes responsible use and maintenance to ensure the longevity of tools, equipment, and vehicles, contributing to the efficiency and effectiveness of the workplace.') }}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <!-- Conclusion -->
        <div class="group-area mt-1">
          <h6>{{ $t('Conclusion title') }}</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <h5 class="mb-1">
              {{ $t('Conclusion title') }}
            </h5>
            <p>{{ $t('Congratulations on joining SS PLUS! As a valued team member, your commitment to our shared values and policies is crucial for a successful journey. This handbook provides essential guidelines for your work life, benefits, growth, and navigating the workplace.') }}</p>
            <p>{{ $t('By adhering to these principles, you contribute to a positive work environment, ensuring the success of both yourself and SS PLUS. Remember, your growth is important, and SS PLUS is committed to supporting you in your career advancement and development.') }}</p>
            <p>{{ $t('We appreciate your dedication and hard work. Together, let\'s create a thriving and successful journey at SS PLUS!') }}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="group-area mt-1">
          <h6>{{ $t('Acknowledgment of Receipt title') }}</h6>
          <hr>
        </div>
        <b-card>
          <div class="blog-content">
            <!-- Employee Acknowledgment Form -->
            <h5 class="mb-1">
              {{ $t('Employee Acknowledgment Form title') }}
            </h5>
            <p>{{ $t('I, _______________ , acknowledge that I have received, read, and understood the contents of the SS PLUS Employee Handbook (Short Version). I understand that it is my responsibility to familiarize myself with the policies, guidelines, and procedures outlined in the handbook.') }}</p>
            <p>{{ $t('I understand that SS PLUS may update or revise the Employee Handbook (Short Version) from time to time, and I commit to staying informed about any changes communicated by the company.') }}</p>
            <p>{{ $t('By signing this acknowledgment, I confirm my commitment to adhere to the policies and guidelines outlined in the SS PLUS Employee Handbook (Short Version) during my employment with the company.') }}</p>

            <p class="mt-3">
              {{ $t('Employee Name: ________________________') }}
            </p>
            <p>{{ $t('Position: _______________________________') }}</p>
            <p>{{ $t('Date: _________________________________') }}</p>

            <p class="mt-3">
              {{ $t('[Employee Signature]') }}
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
