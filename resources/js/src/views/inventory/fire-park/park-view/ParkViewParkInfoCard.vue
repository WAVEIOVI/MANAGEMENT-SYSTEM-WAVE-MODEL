<template>
  <b-card>

    <b-row>

      <!-- Park Info: Left col -->
      <b-col
        cols="12"
        xl="5"
        class="d-flex justify-content-between flex-column"
      >
        <!-- Park Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :text="avatarText(parkData.park_location_id)"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ parkData.park_location_id }}
              </h4>
            </div>
            <div class="d-flex flex-wrap">
              <!-- <b-button
                :to="{ name: 'parks-park-plan-edit', params: { id: park_location_id } }"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
              >
                Delete
              </b-button> -->
            </div>
          </div>
        </div>

        <!-- Park Stats -->
        <!-- <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="CrosshairIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                {{ totalParks }}
              </h5>
              <small>Area</small>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <b-avatar
              variant="light-success"
              rounded
            >
              <feather-icon
                icon="DatabaseIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                {{ totalParks }}
              </h5>
              <small>Total Equipments</small>
            </div>
          </div>
        </div> -->
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="7"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="TagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Customer ID</span>
            </th>
            <td class="pb-50">
              {{ parkData.park_customer_id }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Customer Name</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ parkData.customer_name }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="MapPinIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Park Address</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ parkData.location_address }}, {{ parkData.location_postcode }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="MapIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">City</span>
            </th>
            <td>
              {{ parkData.location_city }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="FlagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Country</span>
            </th>
            <td>
              {{ parkData.location_country }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    parkData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      avatarText,
    }
  },
}
</script>

  <style>

  </style>
