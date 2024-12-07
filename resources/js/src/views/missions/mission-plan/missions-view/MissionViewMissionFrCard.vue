<template>
  <b-card
    title="Finance"
    bg-variant="transparent"
    border-variant="primary"
  >
    <blockquote
      v-if="missionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="BatteryChargingIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Fuel / Transportation
          </h6>
          <small>{{ missionData.fuel_transportation }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="missionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="HomeIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Accommodation
          </h6>
          <small>{{ missionData.accommodation }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="missionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="ShoppingCartIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Meals / Food
          </h6>
          <small>{{ missionData.meals_food }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="missionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="PercentIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Pocket Money / Allowance
          </h6>
          <small>{{ missionData.pocket_money }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="missionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="ToolIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Maintenance / Repair costs
          </h6>
          <small>{{ missionData.repair_costs }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
    <blockquote
      v-if="missionData"
      class="blockquote pl-1 border-left-primary border-left-3"
    >
      <b-media
        no-body
      >
        <b-media-aside class="mr-1">
          <b-avatar
            rounded
            variant="light-primary"
            size="34"
          >
            <feather-icon
              icon="AlertCircleIcon"
              size="18"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">
            Miscellaneous Expenses
          </h6>
          <small>{{ missionData.miscellaneous_expenses }}</small>
        </b-media-body>
      </b-media>
    </blockquote>
  </b-card>
</template>

<script>
import {
  BCard,
  BAvatar,
  BMedia,
  BMediaAside,
  BMediaBody,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
    BMedia,
    BMediaAside,
    BMediaBody,
  },
  props: {
    missionData: {
      type: Object,
      required: true,
    },
  },
}
</script>

    <style>

    </style>
