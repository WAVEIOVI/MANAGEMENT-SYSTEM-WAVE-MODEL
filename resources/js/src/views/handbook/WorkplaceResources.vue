<template>
  <b-modal
    id="workplace-resources"
    title="5. Workplace Resources"
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
            <!-- Office Facilities -->
            <h5 class="mb-1">
              a. Office Facilities
            </h5>

            <!-- Workstations -->
            <h5 class="mb-1">
              Workstations
            </h5>
            <p>
              SS PLUS provides comfortable and efficient workstations to support the productivity and well-being of its team members. Key points related to workstations include:
            </p>
            <ul>
              <li><b>Ergonomic Design:</b> Workstations are designed with ergonomic principles to promote proper posture, reduce fatigue, and enhance overall comfort.</li>
              <li><b>Equipment and Tools:</b> Each workstation is equipped with the necessary tools and equipment required for specific roles, ensuring team members have access to the resources they need.</li>
              <li><b>Personalization:</b> Team members are encouraged to personalize their workstations within the guidelines provided, creating a comfortable and inspiring work environment.</li>
              <li><b>Maintenance:</b> Regular maintenance and checks are conducted to ensure that workstations are in optimal condition, and any issues are addressed promptly.</li>
            </ul>

            <!-- Common Areas -->
            <h5 class="mb-1">
              Common Areas
            </h5>
            <p>
              SS PLUS recognizes the importance of providing inviting and functional common areas where team members can collaborate, relax, and engage in informal discussions. Key points related to common areas include:
            </p>
            <ul>
              <li><b>Collaboration Spaces:</b> Common areas are designed to facilitate collaboration, with designated spaces for team meetings, brainstorming sessions, and discussions.</li>
              <li><b>Cleanliness and Maintenance:</b> Regular cleaning schedules and maintenance checks are in place to ensure that common areas remain clean, organized, and conducive to a positive work environment.</li>
              <li><b>Guidelines for Usage:</b> Team members are encouraged to use common areas responsibly, respecting the needs and preferences of their colleagues. Any specific guidelines for usage will be communicated clearly.</li>
            </ul>

            <p>
              SS PLUS is committed to providing a workplace that supports the comfort and well-being of its team members, fostering a positive and collaborative atmosphere.
            </p>
          </div>
          <div class="blog-content">
            <!-- Technology and Equipment -->
            <h5 class="mb-1">
              b. Technology and Equipment
            </h5>

            <!-- Proper Use of Company Devices -->
            <h5 class="mb-1">
              Proper Use of Company Devices
            </h5>
            <p>
              SS PLUS provides team members with access to various technological devices to support their work. It is essential to use these devices responsibly and in alignment with company policies. Key points related to the proper use of company devices include:
            </p>
            <ul>
              <li><b>Authorized Use:</b> Company devices, including computers, laptops, tablets, and smartphones, are provided for work-related activities. Unauthorized personal use may be subject to disciplinary action.</li>
              <li><b>Security Measures:</b> Team members are responsible for implementing security measures, such as password protection and data encryption, to safeguard company information stored on devices.</li>
              <li><b>Software Usage:</b> Install only authorized software on company devices. Obtain approval from the IT department before installing any third-party software or applications.</li>
              <li><b>Reporting Issues:</b> Report any issues, malfunctions, or loss of company devices promptly to the IT department to ensure timely resolution and prevent potential security risks.</li>
            </ul>

            <!-- IT Security Policies -->
            <h5 class="mb-1">
              IT Security Policies
            </h5>
            <p>
              SS PLUS prioritizes the security of its digital assets, and team members are expected to adhere to IT security policies to prevent unauthorized access and protect sensitive information. Key points related to IT security policies include:
            </p>
            <ul>
              <li><b>Access Control:</b> Access to company systems and data is restricted based on job roles. Team members should not share login credentials, and access should only be granted to individuals with the necessary permissions.</li>
              <li><b>Confidentiality:</b> Treat all company information as confidential. Do not disclose sensitive information to unauthorized individuals, and be cautious about discussing work-related matters in public or insecure environments.</li>
              <li><b>Data Backup:</b> Regularly back up important data to prevent data loss in case of device malfunction or other unforeseen circumstances. Follow company guidelines for data backup procedures.</li>
              <li><b>Security Training:</b> SS PLUS provides periodic training on IT security best practices. Team members are required to participate in these training sessions to stay informed about potential threats and security protocols.</li>
            </ul>

            <p>
              By following proper procedures for the use of company devices and adhering to IT security policies, team members contribute to a secure and efficient digital environment at SS PLUS.
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
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BModal,
    BRow,
    BCol,
  },
}
</script>
