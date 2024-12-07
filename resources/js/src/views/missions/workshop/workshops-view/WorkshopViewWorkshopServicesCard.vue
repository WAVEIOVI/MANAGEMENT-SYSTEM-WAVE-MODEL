<template>
  <b-card
    bg-variant="transparent"
    border-variant="primary"
    no-body
    class="card-revenue-budget"
  >
    <b-row class="mx-0">
      <b-col
        md="7"
        class="revenue-report-wrapper"
      >
        <div class="d-sm-flex justify-content-between align-items-center mb-3">
          <h4 class="card-title mb-50 mb-sm-0">
            Workshop Services
          </h4>
        </div>

        <!-- services List -->
        <b-list-group
          v-for="(service,index) in services"
          :key="index"
        >
          <b-list-group-item
            class="d-flex"
          >
            <span class="mr-1">
              <feather-icon
                icon="ToolIcon"
                size="16"
              />
            </span>
            {{ service.mission_service }}
          </b-list-group-item>
        </b-list-group>
      </b-col>

      <b-col
        md="5"
        class="budget-wrapper"
      >
        <vue-apex-charts
          type="radialBar"
          height="245"
          class="my-2"
          :options="goalOverviewRadialBar"
          :series="series"
        />
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          :to="{ name: 'missions-workshop-equipment-view', params: { id: workshopData.id } }"
          variant="primary"
        >
          Workshop Tasks
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BButton, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import Ripple from 'vue-ripple-directive'
import router from '@/router'
import workshopStoreModule from '../workshopStoreModule'

const $strokeColor = '#ebe9f1'
const $textHeadingColor = '#5e5873'
const $goalStrokeColor2 = '#51e5a8'
export default {
  components: {
    VueApexCharts,
    BCard,
    BButton,
    BRow,
    BCol,
    BListGroup,
    BListGroupItem,
  },
  directives: {
    Ripple,
  },
  props: {
    workshopData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      series: [20],
      goalOverviewRadialBar: {
        chart: {
          height: 245,
          type: 'radialBar',
          sparkline: {
            enabled: true,
          },
          dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1,
          },
        },
        colors: [$goalStrokeColor2],
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: '77%',
            },
            track: {
              background: $strokeColor,
              strokeWidth: '50%',
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                color: $textHeadingColor,
                fontSize: '2.86rem',
                fontWeight: '600',
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: [$themeColors.success],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        grid: {
          padding: {
            bottom: 30,
          },
        },
      },
    }
  },
  setup() {
    const INTERVENTION_APP_STORE_MODULE_NAME = 'app-workshop'

    // Register module
    if (!store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.registerModule(INTERVENTION_APP_STORE_MODULE_NAME, workshopStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.unregisterModule(INTERVENTION_APP_STORE_MODULE_NAME)
    })

    const services = ref([])

    store
      .dispatch('app-workshop/fetchWorkshopServices', { id: router.currentRoute.params.id })
      .then(response => {
        services.value = response.data.data
        console.log(services.value)
      })
    return {
      services,
    }
  },
}
</script>
