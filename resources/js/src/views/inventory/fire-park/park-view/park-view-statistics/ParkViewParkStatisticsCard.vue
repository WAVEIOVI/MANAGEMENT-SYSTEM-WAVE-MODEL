<template>
  <b-card
    no-body
    class="card-statistics"
  >
    <app-collapse accordion>
      <app-collapse-item title="Statistics">
        <!-- <b-card-header class="align-items-baseline">
          <div />
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="outline-primary"
            class="btn-icon"
            @click="onSubmit"
          >
            <feather-icon icon="RefreshCcwIcon" />
          </b-button>
        </b-card-header> -->
        <b-card-body class="statistics-body">
          <b-row>
            <b-col
              xl="3"
              sm="6"
              class="mb-2 mb-xl-0"
            >
              <b-media no-body>
                <b-media-aside

                  class="mr-2"
                >
                  <b-avatar
                    size="48"
                    variant="light-primary"
                  >
                    <feather-icon
                      size="24"
                      icon="MapPinIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <h4
                    class="font-weight-bolder mb-0"
                    v-text="Object.values(areaData.areas_per_park)[0]"
                  />
                  <b-card-text class="font-small-3 mb-0">
                    Areas
                  </b-card-text>
                </b-media-body>
              </b-media>
            </b-col>
            <b-col
              xl="3"
              sm="6"
              class="mb-2 mb-xl-0"
            >
              <b-media no-body>
                <b-media-aside

                  class="mr-2"
                >
                  <b-avatar
                    size="48"
                    variant="light-info"
                  >
                    <feather-icon
                      size="24"
                      icon="DatabaseIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <h4
                    class="font-weight-bolder mb-0"
                    v-text="Object.values(equipmentData.equipment_per_park)[0]"
                  />
                  <b-card-text class="font-small-3 mb-0">
                    Fire Equipments
                  </b-card-text>
                </b-media-body>
              </b-media>
            </b-col>
            <b-col
              xl="3"
              sm="6"
              class="mb-2 mb-xl-0"
            >
              <b-media no-body>
                <b-media-aside

                  class="mr-2"
                >
                  <b-avatar
                    size="48"
                    variant="light-danger"
                  >
                    <feather-icon
                      size="24"
                      icon="BoxIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <h4
                    class="font-weight-bolder mb-0"
                    v-text="Object.values(equipmentData.fire_extinguisher_per_park)[0]"
                  />
                  <b-card-text class="font-small-3 mb-0">
                    Fire Extinguisher
                  </b-card-text>
                </b-media-body>
              </b-media>
            </b-col>
            <b-col
              xl="3"
              sm="6"
              class="mb-2 mb-xl-0"
            >
              <b-media no-body>
                <b-media-aside

                  class="mr-2"
                >
                  <b-avatar
                    size="48"
                    variant="light-success"
                  >
                    <feather-icon
                      size="24"
                      icon="PackageIcon"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <h4
                    class="font-weight-bolder mb-0"
                    v-text="Object.values(equipmentData.others_equipments_per_park)[0]"
                  />
                  <b-card-text class="font-small-3 mb-0">
                    Others Equipments
                  </b-card-text>
                </b-media-body>
              </b-media>
            </b-col>
          </b-row>
          <hr>
          <b-card-title>
            Fire Equipments
          </b-card-title>
          <b-row>
            <b-col
              cols="12"
              xl="4"
              class="mb-2 mb-xl-0"
            >
              <b-card-sub-title class="text-center">
                Categories
              </b-card-sub-title>
              <vue-apex-charts
                type="donut"
                height="250"
                :options="categoryEquipment.chartOptions"
                :series="categoryEquipment.series"
              />
            </b-col>
            <b-col
              cols="12"
              xl="4"
              class="mb-2 mb-xl-0"
            >
              <b-card-sub-title class="text-center">
                Fire Extinguisher
              </b-card-sub-title>
              <vue-apex-charts
                type="donut"
                height="250"
                :options="fireExtinguisher.chartOptions"
                :series="fireExtinguisher.series"
              />
            </b-col>
            <b-col
              cols="12"
              xl="4"
              class="mb-2 mb-xl-0"
            >
              <b-card-sub-title class="text-center">
                Status
              </b-card-sub-title>
              <vue-apex-charts
                type="donut"
                height="250"
                :options="statusEquipment.chartOptions"
                :series="statusEquipment.series"
              />
            </b-col>
          </b-row>
        </b-card-body>
      </app-collapse-item>
    </app-collapse>
  </b-card>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BCard, BCardBody, BCardText, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
// import { useToast } from 'vue-toastification/composition'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import VueApexCharts from 'vue-apexcharts'
import metaStoreModule from './metaParkStoreModule'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    // BCardHeader,
    // BButton,
    BCardText,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    AppCollapse,
    AppCollapseItem,
    BCardTitle,
    BCardSubTitle,
    VueApexCharts,
  },
  setup() {
    const META_APP_STORE_MODULE_NAME = 'app-meta'

    // Register module
    if (!store.hasModule(META_APP_STORE_MODULE_NAME)) store.registerModule(META_APP_STORE_MODULE_NAME, metaStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(META_APP_STORE_MODULE_NAME)) store.unregisterModule(META_APP_STORE_MODULE_NAME)
    })
    // const toast = useToast()
    const equipmentData = ref({})
    const areaData = ref({})
    const parkEquipment = ref({})
    const equipmentChartTotal = ref({})
    const fireExtinguisherCount = ref({})
    const fireExtinguisherChartTotal = ref({})
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
                    return `${equipmentChartTotal.value[0]}`
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
                    return `${fireExtinguisherChartTotal.value[0]}`
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
    store
      .dispatch('app-meta/fetchParkEquipment', { id: router.currentRoute.params.id })
      .then(response => {
        equipmentData.value = response.data.count

        parkEquipment.value = equipmentData.value.equipment_per_park
        equipmentChartTotal.value = Object.values(parkEquipment.value)
        console.log(equipmentChartTotal.value)

        fireExtinguisherCount.value = equipmentData.value.fire_extinguisher_per_park
        fireExtinguisherChartTotal.value = Object.values(fireExtinguisherCount.value)
        console.log(fireExtinguisherChartTotal.value)

        categoryChart.value = equipmentData.value.equipment_category_count
        labelsCategories.value = Object.keys(categoryChart.value)
        seriesCategories.value = Object.values(categoryChart.value)
        categoryEquipment.value.chartOptions.labels = labelsCategories.value
        categoryEquipment.value.series = seriesCategories.value

        fireExtinguisherChart.value = equipmentData.value.equipment_model_count
        labelsFireExtinguisher.value = Object.keys(fireExtinguisherChart.value)
        seriesFireExtinguisher.value = Object.values(fireExtinguisherChart.value)
        fireExtinguisher.value.chartOptions.labels = labelsFireExtinguisher.value
        fireExtinguisher.value.series = seriesFireExtinguisher.value

        statusChart.value = equipmentData.value.equipment_status_count
        labelsStatus.value = Object.keys(statusChart.value)
        seriesStatus.value = Object.values(statusChart.value)
        statusEquipment.value.chartOptions.labels = labelsStatus.value
        statusEquipment.value.series = seriesStatus.value
      })
    store
      .dispatch('app-meta/fetchParkArea', { id: router.currentRoute.params.id })
      .then(response => {
        areaData.value = response.data.count
        console.log(areaData.value)
      })

    // const onSubmit = () => {
    //   store.dispatch('app-meta/updatePark',
    //     {
    //       id: router.currentRoute.params.id,
    //     })
    //     .then(response => {
    //       console.log(response.data)
    //       console.log('data updated')
    //     })
    //     .then(() => {
    //       toast({
    //         component: ToastificationContent,
    //         props: {
    //           title: 'Notification',
    //           text: 'Data successfully updated!',
    //           icon: 'CheckIcon',
    //           variant: 'success',
    //         },
    //       })
    //     })
    // }
    return {
      equipmentData,
      areaData,
      categoryEquipment,
      categoryChart,
      fireExtinguisher,
      fireExtinguisherChart,
      statusEquipment,
      statusChart,
      //   statistics,
    //   onSubmit,
    }
  },
}
</script>

<style lang="scss">
@import '~@resources/scss/vue/pages/dashboard-ecommerce.scss';
@import '~@resources/scss/vue/libs/chart-apex.scss';
</style>
