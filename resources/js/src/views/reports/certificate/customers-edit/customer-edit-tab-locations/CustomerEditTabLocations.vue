<template>

  <div>

    <customer-edit-add-new-location
      :is-add-new-customer-location-sidebar-active.sync="isAddNewCustomerLocationSidebarActive"
      :location-description-options="locationDescriptionOptions"
      :opening-options="openingOptions"
      :city-options="cityOptions"
      @refetch-data="refetchData"
    />
    <customer-edit-update-location
      :is-update-customer-location-sidebar-active.sync="isUpdateCustomerLocationSidebarActive"
      :customer-location-data="customerLocationData"
      :location-description-options="locationDescriptionOptions"
      :opening-options="openingOptions"
      :city-options="cityOptions"
      @refetch-data="refetchData"
      @submit="onSubmit"
    />
    <customer-edit-modal-location-view
      :customer-location-data="customerLocationData"
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
          />
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">

              <b-button
                variant="primary"
                @click="isAddNewCustomerLocationSidebarActive = true"
              >
                <span class="text-nowrap">Add Location</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refCustomerLocationsListTable"
        class="position-relative"
        :items="fetchCustomerLocations"
        responsive
        :fields="tableColumnsLocations"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: ID -->
        <template #cell(location_id)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                variant="primary"
                :to="{ name: 'contacts-customers-view', params: { id: data.item.id } }"
              >
                <feather-icon
                  icon="MapPinIcon"
                />
              </b-avatar>
            </template>
            <b-link
              :to="{ name: 'contacts-customers-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.location_description }}
            </b-link>
            <small class="text-muted">{{ data.item.location_id }}</small>
          </b-media>
        </template>
        <!-- Column: ID -->
        <template #cell(location_address)="data">
          <div>
            {{ data.item.location_address }}
          </div>
          <div>{{ data.item.location_postcode }} {{ data.item.location_city }} {{ data.item.location_country }}</div>
        </template>
        <!-- Column: contact -->
        <template #cell(location_contact)="data">
          <div>
            {{ data.item.location_phone }}
          </div>
          <div>
            {{ data.item.location_email }}
          </div>
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
            <b-dropdown-item
              v-b-modal.modal-location-view
              @click="fetchCustomerLocation(data.item.id)"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>
            <b-dropdown-item
              @click="isUpdateCustomerLocationSidebarActive = true,
                      fetchCustomerLocation(data.item.id)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeCustomerLocation(data.item.id)"
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
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BTable,
  BDropdown,
  BDropdownItem,
  BLink,
  BAvatar,
  BMedia,
} from 'bootstrap-vue'
import router from '@/router'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useCustomersEdit from '../useCustomersEdit'
import locationStoreModule from './locationStoreModule'
import useCustomersOptions from '../../useCustomersOptions'
import CustomerEditAddNewLocation from './CustomerEditAddNewLocation.vue'
import CustomerEditUpdateLocation from './CustomerEditUpdateLocation.vue'
import CustomerEditModalLocationView from './CustomerEditModalLocationView.vue'

export default {
  components: {
    CustomerEditAddNewLocation,
    CustomerEditUpdateLocation,
    CustomerEditModalLocationView,

    BCard,
    BRow,
    BCol,
    BButton,
    BTable,
    BDropdown,
    BDropdownItem,
    BLink,
    BAvatar,
    BMedia,
  },

  setup() {
    const LOCATION_APP_STORE_MODULE_NAME = 'app-location'

    // Register module
    if (!store.hasModule(LOCATION_APP_STORE_MODULE_NAME)) store.registerModule(LOCATION_APP_STORE_MODULE_NAME, locationStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(LOCATION_APP_STORE_MODULE_NAME)) store.unregisterModule(LOCATION_APP_STORE_MODULE_NAME)
    })
    const isAddNewCustomerLocationSidebarActive = ref(false)
    const isUpdateCustomerLocationSidebarActive = ref(false)

    const toast = useToast()
    const {
      openingOptions,
      locationDescriptionOptions,
      cityOptions,
    } = useCustomersOptions()

    const {
      customerLocationData,
      fetchCustomerLocations,
      fetchCustomerLocation,
      tableColumnsLocations,
      refCustomerLocationsListTable,
      refetchData,
      removeCustomerLocation,
    } = useCustomersEdit()

    const onSubmit = () => {
      store
        .dispatch('app-location/updateCustomerLocation', { customerLocationData: customerLocationData.value, id: router.currentRoute.params.id, idloc: customerLocationData.value.id })
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              text: 'Form successfully submitted!',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
    }
    return {
      // Sidebar
      isAddNewCustomerLocationSidebarActive,
      isUpdateCustomerLocationSidebarActive,

      fetchCustomerLocations,
      fetchCustomerLocation,
      tableColumnsLocations,
      refCustomerLocationsListTable,
      refetchData,
      removeCustomerLocation,
      customerLocationData,
      avatarText,
      onSubmit,

      //   options
      openingOptions,
      locationDescriptionOptions,
      cityOptions,

    }
  },
}
</script>

  <style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>
