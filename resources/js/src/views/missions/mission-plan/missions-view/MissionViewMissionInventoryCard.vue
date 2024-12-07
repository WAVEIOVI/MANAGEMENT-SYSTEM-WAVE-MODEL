<template>
  <b-card
    bg-variant="transparent"
    border-variant="primary"
    title="Fire Park"
  >
    <b-row>
      <b-col>
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
                  icon="MapPinIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                Areas
              </h6>
              <small>{{ missionData.total_areas_per_park }} </small>
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
                  icon="DatabaseIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                Fire Equipments
              </h6>
              <small>{{ missionData.total_equipments_per_park }} </small>
            </b-media-body>
          </b-media>
        </blockquote>
      </b-col>
      <b-col>
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
                  icon="BoxIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                Fire Extinguisher
              </h6>
              <small>{{ missionData.total_fire_extinguisher_per_park }} </small>
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
                  icon="PackageIcon"
                  size="18"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body>
              <h6 class="mb-0">
                Others Equipments
              </h6>
              <small>{{ missionData.total_others_equipments_per_park }} </small>
            </b-media-body>
          </b-media>
        </blockquote>
      </b-col>
    </b-row>
    <hr>
    <b-card-title class="mb-1">
      Statistics
    </b-card-title>
    <b-row>
      <b-col cols="6">
        <div class="font-small-2">
          Fire Equipments
        </div>
        <h5 class="mb-1">
          Categories
        </h5>
      </b-col>
      <b-col cols="6">
        <!-- chart -->
        <vue-apex-charts
          type="donut"
          height="250"
          :options="categoryEquipment.chartOptions"
          :series="categoryEquipment.series"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <div class="font-small-2">
          Fire Equipments
        </div>
        <h5 class="mb-1">
          Fire Extinguisher
        </h5>
      </b-col>
      <b-col cols="6">
        <!-- chart -->
        <vue-apex-charts
          type="donut"
          height="250"
          :options="fireExtinguisher.chartOptions"
          :series="fireExtinguisher.series"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <div class="font-small-2">
          Fire Equipments
        </div>
        <h5 class="mb-1">
          Status
        </h5>
      </b-col>
      <b-col cols="6">
        <!-- chart -->
        <vue-apex-charts
          type="donut"
          height="250"
          :options="statusEquipment.chartOptions"
          :series="statusEquipment.series"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BAvatar,
  BMedia,
  BMediaAside,
  BMediaBody,
  BCardTitle,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
    BMedia,
    BMediaAside,
    BMediaBody,
    BCardTitle,
    VueApexCharts,
  },
  props: {
    missionData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const missionChartData = ref(props.missionData)
    const categoryChart = ref({})
    const labelsCategories = ref({})
    const seriesCategories = ref({})
    const fireExtinguisherChart = ref({})
    const labelsFireExtinguisher = ref({})
    const seriesFireExtinguisher = ref({})
    const statusChart = ref({})
    const labelsStatus = ref({})
    const seriesStatus = ref({})

    const categoryEquipment = ref({
      series: [],
      chartOptions: {
        legend: {
          show: false,
          position: 'bottom',
          fontSize: '14px',
          fontFamily: 'Montserrat',
        },
        dataLabels: {
          enabled: true,
          formatter(val) {
            // eslint-disable-next-line radix
            return `${parseInt(val)}%`
          },
        },
        theme: {
          monochrome: {
            enabled: true,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  fontSize: '2rem',
                  fontFamily: 'Montserrat',
                },
                value: {
                  fontSize: '1rem',
                  fontFamily: 'Montserrat',
                  formatter(val) {
                    // eslint-disable-next-line radix
                    return `${parseInt(val)}`
                  },
                },
                total: {
                  show: true,
                  fontSize: '1.5rem',
                  label: 'Total',
                  formatter() {
                    return `${missionChartData.value.total_equipments_per_park}`
                  },
                },
              },
            },
          },
        },
        labels: [],
        responsive: [
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 380,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 576,
            options: {
              chart: {
                height: 320,
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        fontSize: '1.5rem',
                      },
                      value: {
                        fontSize: '1rem',
                      },
                      total: {
                        fontSize: '1.5rem',
                      },
                    },
                  },
                },
              },
              legend: {
                show: true,
              },
            },
          },
        ],
      },
    })
    const fireExtinguisher = ref({
      series: [],
      chartOptions: {
        legend: {
          show: false,
          position: 'bottom',
          fontSize: '14px',
          fontFamily: 'Montserrat',
        },
        dataLabels: {
          enabled: true,
          formatter(val) {
            // eslint-disable-next-line radix
            return `${parseInt(val)}%`
          },
        },
        theme: {
          monochrome: {
            enabled: true,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  fontSize: '2rem',
                  fontFamily: 'Montserrat',
                },
                value: {
                  fontSize: '1rem',
                  fontFamily: 'Montserrat',
                  formatter(val) {
                    // eslint-disable-next-line radix
                    return `${parseInt(val)}`
                  },
                },
                total: {
                  show: true,
                  fontSize: '1.5rem',
                  label: 'Total',
                  formatter() {
                    return `${missionChartData.value.total_fire_extinguisher_per_park}`
                  },
                },
              },
            },
          },
        },
        labels: [],
        responsive: [
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 380,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 576,
            options: {
              chart: {
                height: 320,
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        fontSize: '1.5rem',
                      },
                      value: {
                        fontSize: '1rem',
                      },
                      total: {
                        fontSize: '1.5rem',
                      },
                    },
                  },
                },
              },
              legend: {
                show: true,
              },
            },
          },
        ],
      },
    })
    const statusEquipment = ref({
      series: [],
      chartOptions: {
        legend: {
          show: false,
          position: 'bottom',
          fontSize: '14px',
          fontFamily: 'Montserrat',
        },
        dataLabels: {
          enabled: true,
          formatter(val) {
            // eslint-disable-next-line radix
            return `${parseInt(val)}%`
          },
        },
        theme: {
          monochrome: {
            enabled: true,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  fontSize: '2rem',
                  fontFamily: 'Montserrat',
                },
                value: {
                  fontSize: '1rem',
                  fontFamily: 'Montserrat',
                  formatter(val) {
                    // eslint-disable-next-line radix
                    return `${parseInt(val)}`
                  },
                },
                total: {
                  show: true,
                  fontSize: '1.5rem',
                  label: 'Status',
                  formatter() {
                    // return `${seriesCategories.value[0]}`
                  },
                },
              },
            },
          },
        },
        labels: [],
        responsive: [
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 380,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 576,
            options: {
              chart: {
                height: 320,
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        fontSize: '1.5rem',
                      },
                      value: {
                        fontSize: '1rem',
                      },
                      total: {
                        fontSize: '1.5rem',
                      },
                    },
                  },
                },
              },
              legend: {
                show: true,
              },
            },
          },
        ],
      },
    })
    categoryChart.value = missionChartData.value.statistics_categories_count
    const jsonStringA = categoryChart.value.replace(/\\/g, '')
    const objectA = JSON.parse(jsonStringA)
    labelsCategories.value = Object.keys(objectA)
    seriesCategories.value = Object.values(objectA)
    categoryEquipment.value.chartOptions.labels = labelsCategories.value
    categoryEquipment.value.series = seriesCategories.value

    fireExtinguisherChart.value = missionChartData.value.statistics_fire_extinguisher_count
    const jsonStringB = fireExtinguisherChart.value.replace(/\\/g, '')
    const objectB = JSON.parse(jsonStringB)
    labelsFireExtinguisher.value = Object.keys(objectB)
    seriesFireExtinguisher.value = Object.values(objectB)
    fireExtinguisher.value.chartOptions.labels = labelsFireExtinguisher.value
    fireExtinguisher.value.series = seriesFireExtinguisher.value

    statusChart.value = missionChartData.value.statistics_status_count
    const jsonStringC = statusChart.value.replace(/\\/g, '')
    const objectC = JSON.parse(jsonStringC)
    labelsStatus.value = Object.keys(objectC)
    seriesStatus.value = Object.values(objectC)
    statusEquipment.value.chartOptions.labels = labelsStatus.value
    statusEquipment.value.series = seriesStatus.value

    return {
      categoryEquipment,
      missionChartData,
      categoryChart,
      fireExtinguisher,
      statusEquipment,
    }
  },
}
</script>

<style lang="scss">
// @import '~@resources/scss/vue/pages/dashboard-ecommerce.scss';
@import '~@resources/scss/vue/libs/chart-apex.scss';
</style>
