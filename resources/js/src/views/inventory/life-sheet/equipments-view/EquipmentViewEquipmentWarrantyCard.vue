<template>
  <b-card
    bg-variant="transparent"
    border-variant="primary"
  >
    <div class="item-features">
      <div class="row text-center">
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <div
            v-if="equipmentTasksData.updated_at !== ''"
            class="w-75 mx-auto"
          >
            <b-avatar
              rounded
              variant="light-primary"
              size="50"
            >
              <feather-icon
                icon="ShieldIcon"
                size="35"
              />
            </b-avatar>
            <h4 class="mt-2 mb-1">
              1 Year Warranty
            </h4>
            <h3 class="card-text">
              {{ calculateFutureDateWarranty(equipmentTasksData.updated_at) }} <!-- Call the function here -->
            </h3>
            <h6 class="card-text">
              {{ calculateTimeLeftWarranty(equipmentTasksData.updated_at) }}
            </h6>
          </div>
        </div>
        <div
          v-if="equipmentTasksData.intervention_frequency === 'half-yearly'"
          class="col-12 col-md-4 mb-4 mb-md-0"
        >
          <div class="w-75 mx-auto">
            <b-avatar
              rounded
              variant="light-primary"
              size="50"
            >
              <feather-icon
                icon="ClockIcon"
                size="35"
              />
            </b-avatar>
            <h4
              variant="primary"
              class="mt-2 mb-1"
            >
              Plan 06 months
            </h4>
            <h3 class="card-text">
              {{ calculateFutureDatePlan(equipmentTasksData.updated_at) }} <!-- Call the function here -->
            </h3>
            <h6 class="card-text">
              {{ calculateTimeLeftPlan(equipmentTasksData.updated_at) }}
            </h6>
          </div>
        </div>
        <div
          v-if="equipmentData.mfg_date !== ''"
          class="col-12 col-md-4 mb-4 mb-md-0"
        >
          <div class="w-75 mx-auto">
            <b-avatar
              rounded
              variant="light-primary"
              size="50"
            >
              <feather-icon
                icon="ToolIcon"
                size="35"
              />
            </b-avatar>
            <h4 class="mt-2 mb-1">
              Hydraulic test
            </h4>
            <h3 class="card-text">
              {{ calculateFutureDate(equipmentData.mfg_date) }} <!-- Call the function here -->
            </h3>
            <h6 class="card-text">
              {{ calculateTimeLeft(equipmentData.mfg_date) }}
            </h6>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import {
  BCard,
  BAvatar,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
  },
  props: {
    equipmentData: {
      type: Object,
      required: true,
    },
    equipmentTasksData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    calculateFutureDate(mfgDate) {
      const currentDate = new Date(mfgDate)
      currentDate.setFullYear(currentDate.getFullYear() + 10)
      // You can format the date as needed here
      return currentDate.toISOString().split('T')[0]
    },
    calculateTimeLeft(mfgDate) {
      const currentDate = new Date()
      const futureDate = new Date(mfgDate)
      futureDate.setFullYear(futureDate.getFullYear() + 10)

      let timeDiff = futureDate.getTime() - currentDate.getTime() // Declare as 'let'

      const yearsLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25))
      timeDiff -= yearsLeft * (1000 * 60 * 60 * 24 * 365.25)
      const monthsLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.4375))
      timeDiff -= monthsLeft * (1000 * 60 * 60 * 24 * 30.4375)
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

      return `${yearsLeft} years, ${monthsLeft} months, and ${daysLeft} days left to do the Hydraulic test.`
    },

    calculateFutureDatePlan(mfgDate) {
      const currentDate = new Date(mfgDate)
      const futureDate = new Date(currentDate)
      futureDate.setMonth(futureDate.getMonth() + 6)

      // You can format the date as needed here
      return futureDate.toISOString().split('T')[0]
    },
    calculateTimeLeftPlan(mfgDate) {
      const currentDate = new Date()
      const futureDate = new Date(mfgDate)
      futureDate.setMonth(futureDate.getMonth() + 6)

      let timeDiff = futureDate.getTime() - currentDate.getTime()

      const monthsLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.4375))
      timeDiff -= monthsLeft * (1000 * 60 * 60 * 24 * 30.4375)
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

      return `${monthsLeft} months, and ${daysLeft} days left to do the next intervention (with the possibility of delay some days).`
    },

    calculateFutureDateWarranty(mfgDate) {
      const currentDate = new Date(mfgDate)
      currentDate.setFullYear(currentDate.getFullYear() + 1)
      // You can format the date as needed here
      return currentDate.toISOString().split('T')[0]
    },
    calculateTimeLeftWarranty(mfgDate) {
      const currentDate = new Date()
      const futureDate = new Date(mfgDate)
      futureDate.setFullYear(futureDate.getFullYear() + 1)

      let timeDiff = futureDate.getTime() - currentDate.getTime() // Declare as 'let'

      const yearsLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25))
      timeDiff -= yearsLeft * (1000 * 60 * 60 * 24 * 365.25)
      const monthsLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.4375))
      timeDiff -= monthsLeft * (1000 * 60 * 60 * 24 * 30.4375)
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

      return `${yearsLeft} years, ${monthsLeft} months, and ${daysLeft} days left to end Warranty (according to Tunisian law).`
    },
  },
}
</script>

  <style>

  </style>
