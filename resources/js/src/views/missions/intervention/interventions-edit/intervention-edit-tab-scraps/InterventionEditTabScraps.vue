<template>

  <div>

    <intervention-edit-add-new-scrap
      :is-add-new-intervention-scrap-sidebar-active.sync="isAddNewInterventionScrapSidebarActive"
      :scrap-description-options="scrapDescriptionOptions"
      :opening-options="openingOptions"
      :city-options="cityOptions"
      @refetch-data="refetchData"
    />
    <intervention-edit-update-scrap
      :is-update-intervention-scrap-sidebar-active.sync="isUpdateInterventionScrapSidebarActive"
      :intervention-scrap-data="interventionScrapData"
      :scrap-description-options="scrapDescriptionOptions"
      :opening-options="openingOptions"
      :city-options="cityOptions"
      @refetch-data="refetchData"
      @submit="onSubmit"
    />
    <intervention-edit-modal-scrap-view
      :intervention-scrap-data="interventionScrapData"
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
                @click="isAddNewInterventionScrapSidebarActive = true"
              >
                <span class="text-nowrap">Add Scrap</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refInterventionScrapsListTable"
        class="position-relative"
        :items="fetchInterventionScraps"
        responsive
        :fields="tableColumnsScraps"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- A virtual column -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <!-- Column: equipment_status -->
        <template #cell(equipment_status)="data">
          <b-form-rating
            v-model="data.item.equipment_status"
            size="sm"
            readonly
            no-border
            disabled
          />
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
              v-b-modal.modal-scrap-view
              @click="fetchInterventionScrap(data.item.id)"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>
            <b-dropdown-item
              @click="isUpdateInterventionScrapSidebarActive = true,
                      fetchInterventionScrap(data.item.id)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeInterventionScrap(data.item.id)"
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
  BFormRating,
} from 'bootstrap-vue'
import router from '@/router'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useInterventionsEdit from '../useInterventionsEdit'
import scrapStoreModule from './scrapStoreModule'
import useInterventionsOptions from '../../useInterventionsOptions'
import InterventionEditAddNewScrap from './InterventionEditAddNewScrap.vue'
import InterventionEditUpdateScrap from './InterventionEditUpdateScrap.vue'
import InterventionEditModalScrapView from './InterventionEditModalScrapView.vue'

export default {
  components: {
    InterventionEditAddNewScrap,
    InterventionEditUpdateScrap,
    InterventionEditModalScrapView,

    BCard,
    BRow,
    BCol,
    BButton,
    BTable,
    BDropdown,
    BDropdownItem,
    BFormRating,
  },

  setup() {
    const SCRAP_APP_STORE_MODULE_NAME = 'app-scrap'

    // Register module
    if (!store.hasModule(SCRAP_APP_STORE_MODULE_NAME)) store.registerModule(SCRAP_APP_STORE_MODULE_NAME, scrapStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SCRAP_APP_STORE_MODULE_NAME)) store.unregisterModule(SCRAP_APP_STORE_MODULE_NAME)
    })
    const isAddNewInterventionScrapSidebarActive = ref(false)
    const isUpdateInterventionScrapSidebarActive = ref(false)

    const toast = useToast()
    const {
      openingOptions,
      scrapDescriptionOptions,
      cityOptions,
    } = useInterventionsOptions()

    const {
      interventionScrapData,
      fetchInterventionScraps,
      fetchInterventionScrap,
      tableColumnsScraps,
      refInterventionScrapsListTable,
      refetchData,
      removeInterventionScrap,
    } = useInterventionsEdit()

    const onSubmit = () => {
      store
        .dispatch('app-scrap/updateInterventionScrap', { interventionScrapData: interventionScrapData.value, id: router.currentRoute.params.id, idloc: interventionScrapData.value.id })
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
      isAddNewInterventionScrapSidebarActive,
      isUpdateInterventionScrapSidebarActive,

      fetchInterventionScraps,
      fetchInterventionScrap,
      tableColumnsScraps,
      refInterventionScrapsListTable,
      refetchData,
      removeInterventionScrap,
      interventionScrapData,
      avatarText,
      onSubmit,

      //   options
      openingOptions,
      scrapDescriptionOptions,
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
