<template>

  <div>

    <intervention-list-add-new
      :is-add-new-intervention-sidebar-active.sync="isAddNewInterventionSidebarActive"
      :status-options="statusOptions"
      :customers-data="customersData"
      @refetch-data="refetchData"
    />
    <section id="card-style-variation">
      <h5 class="mt-3 mb-2">
        New Intervention
      </h5>
      <hr>
      <b-row class="match-height">
        <!-- Pending Intervention -->
        <b-col
          v-for="(data,index) in pendingIntervention"
          :key="index"
          cols="12"
          md="6"
          xl="4"
        >
          <b-card
            border-variant="warning"
            bg-variant="transparent"
            no-body
            class="card-developer-meetup cursor-pointer"
            @click="() => $router.push({ name: 'missions-intervention-view', params: { id: data.id } })"
          >
            <b-card-body>
              <div class="meetup-header d-flex align-items-center">
                <div class="meetup-day">
                  <h6 class="mb-0">
                    {{ data.intervention_id }}
                  </h6>
                </div>
                <div class="my-auto">
                  <b-card-text class="mb-0">
                    {{ data.mission_customer_id }} {{ data.customer_name }}
                  </b-card-text>
                </div>
              </div>
              <b-media
                no-body
              >
                <b-media-aside class="mr-1">
                  <b-avatar
                    rounded
                    variant="light-warning"
                    size="34"
                  >
                    <feather-icon
                      icon="CalendarIcon"
                      size="18"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body>
                  <h6 class="mb-0">
                    {{ data.intervention_date }}
                  </h6>
                  <small>Intervention Date</small>
                </b-media-body>
              </b-media>

              <!-- Location  -->
              <b-media
                no-body
              >
                <b-media-aside class="mr-1">
                  <b-avatar
                    rounded
                    variant="light-warning"
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
                    {{ data.mission_location_id }} | {{ data.location_description }}
                  </h6>
                  <small>{{ data.location_address }} {{ data.location_postcode }} {{ data.location_city }} {{ data.location_country }}</small>
                </b-media-body>
              </b-media>

              <!-- Team Leader  -->
              <b-media
                no-body
              >
                <b-media-aside class="mr-1">
                  <b-avatar
                    rounded
                    variant="light-warning"
                    size="34"
                  >
                    <feather-icon
                      icon="UserIcon"
                      size="18"
                    />
                  </b-avatar>
                </b-media-aside>
                <b-media-body>
                  <h6 class="mb-0">
                    {{ data.team_leader }}
                  </h6>
                  <small>Team Leader</small>
                </b-media-body>
              </b-media>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </section>
    <h5 class="mt-3 mb-2">
      All Interventions
    </h5>
    <hr>
    <!-- Filters -->
    <interventions-list-filters
      :status-filter.sync="statusFilter"
      :status-options="statusOptions"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <b-button
                variant="primary"
                @click="isAddNewInterventionSidebarActive = true"
              >
                <span class="text-nowrap">Work Shop</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refInterventionListTable"
        class="position-relative"
        :items="fetchInterventions"
        :fields="tableColumns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: intervention_id -->
        <template #cell(intervention_id)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'missions-intervention-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              #{{ data.value }}
            </b-link>
          </b-media>
        </template>
        <!-- Column: Customer -->
        <template #cell(customer)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.customer_name)"
                :to="{ name: 'missions-intervention-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'missions-intervention-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.customer_name }}
            </b-link>
            <small class="text-muted">{{ data.item.mission_customer_id }}</small>
          </b-media>
        </template>
        <!-- Column: Location -->
        <template #cell(location)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                variant="primary"
              >
                <feather-icon
                  icon="MapPinIcon"
                />
              </b-avatar>
            </template>
            <b-link
              :to="{ name: 'interventions-intervention-plan-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.location_address }} {{ data.item.location_postcode }} {{ data.item.location_city }} {{ data.item.location_country }}
            </b-link>
            <small class="text-muted">{{ data.item.mission_location_id }} | {{ data.item.location_description }}</small>
          </b-media>
        </template>
        <!-- Column: intervention_date -->
        <template #cell(intervention_date)="data">
          <b-badge variant="light-primary">
            <feather-icon
              icon="CalendarIcon"
              class="mr-25"
            />
            {{ data.value }}
          </b-badge>
        </template>
        <!-- Column: intervention_status -->
        <template #cell(intervention_status)="data">
          <b-badge
            pill
            :variant="`light-${resolveInterventionStatusVariant(data.item.intervention_status)}`"
            class="text-capitalize"
          >
            {{ data.item.intervention_status }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'interventions-intervention-plan-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'interventions-intervention-plan-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeIntervention(data.item.id)"
            >
              <feather-icon
                icon="TrashIcon"
                class="cursor-pointer"
              />
              <span class="align-middle ml-50 ">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalInterventions"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BCardBody,
  BMediaBody,
  BCardText,
  //   BCardHeader,
  BMediaAside,
  //   BMediaBody,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useInterventionsList from './useInterventionsList'
import useInterventionsOptions from '../useInterventionsOptions'
import interventionStoreModule from '../interventionStoreModule'
import InterventionListAddNew from './InterventionListAddNew.vue'
import InterventionsListFilters from './InterventionsListFilters.vue'

export default {
  components: {
    InterventionListAddNew,
    InterventionsListFilters,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BCardBody,
    BMediaBody,
    // BCardHeader,
    BCardText,
    BMediaAside,
    // BMediaBody,

    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      solidColor: [
        { bg: 'warning', title: 'Intervention IN230001' },
        { bg: 'warning', title: 'Intervention IN230002' },
        { bg: 'warning', title: 'Intervention IN230003' },
      ],
      mediaData: [
        { avatar: 'CalendarIcon', title: 'Sat, May 25, 2020', subtitle: 'Intervention Date' },
        { avatar: 'MapPinIcon', title: 'LO230001|Shop', subtitle: 'Road Kaid Mohamed Km10 3000 SFAX TUNISA' },
        { avatar: 'UserIcon', title: 'Team Leader', subtitle: 'Amin DOUZI' },
      ],
    }
  },

  setup() {
    const INTERVENTION_APP_STORE_MODULE_NAME = 'app-intervention'

    // Register module
    if (!store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.registerModule(INTERVENTION_APP_STORE_MODULE_NAME, interventionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INTERVENTION_APP_STORE_MODULE_NAME)) store.unregisterModule(INTERVENTION_APP_STORE_MODULE_NAME)
    })

    const isAddNewInterventionSidebarActive = ref(false)

    const {
      customersData,
      fetchInterventions,
      pendingIntervention,
      tableColumns,
      perPage,
      currentPage,
      totalInterventions,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInterventionListTable,
      refetchData,
      removeIntervention,

      // UI
      resolveInterventionTypeVariant,
      resolveInterventionTypeIcon,
      resolveInterventionStatusVariant,

      // Extra Filters
      statusFilter,
    } = useInterventionsList()

    const {
      statusOptions,
    } = useInterventionsOptions()

    return {
      // Sidebar
      isAddNewInterventionSidebarActive,

      customersData,
      fetchInterventions,
      pendingIntervention,
      tableColumns,
      perPage,
      currentPage,
      totalInterventions,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInterventionListTable,
      refetchData,
      removeIntervention,

      // Filter
      avatarText,

      // UI
      resolveInterventionTypeVariant,
      resolveInterventionTypeIcon,
      resolveInterventionStatusVariant,
      // Extra Options
      statusOptions,

      // Extra Filters
      statusFilter,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '~@resources/scss/vue/libs/vue-select.scss';
@import '~@resources/scss/vue/pages/dashboard-ecommerce.scss';
</style>

<style>
.card-developer-meetup {
  transition: transform 0.2s ease-in-out;
}

.card-developer-meetup:hover {
  transform: scale(1.05);
}
</style>
