<template>

  <div>

    <park-view-add-new-area
      :is-add-new-park-area-sidebar-active.sync="isAddNewParkAreaSidebarActive"
      :area-accessibility-options="areaAccessibilityOptions"
      :area-classification-options="areaClassificationOptions"
      @refetch-area-data="refetchAreaData"
    />
    <park-view-update-area
      :is-update-park-area-sidebar-active.sync="isUpdateParkAreaSidebarActive"
      :park-area-data="parkAreaData"
      :area-accessibility-options="areaAccessibilityOptions"
      :area-classification-options="areaClassificationOptions"
      @refetch-area-data="refetchAreaData"
      @submit="onSubmit"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <app-collapse accordion>
        <app-collapse-item title="Park Area">
          <b-card-header class="align-items-baseline">
            <div />
            <b-dropdown
              variant="link"
              no-caret
              right
              class="chart-dropdown"
              toggle-class="p-0"
            >
              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="18"
                  class="text-body cursor-pointer"
                />
              </template>
              <b-dropdown-item
                @click="isAddNewParkAreaSidebarActive = true"
              >
                Add Area
              </b-dropdown-item>
            </b-dropdown>
          </b-card-header>

          <!-- body -->
          <b-table
            ref="refParkAreasListTable"
            class="position-relative"
            :items="fetchParkAreas"
            responsive
            :fields="tableColumnsAreas"
            primary-key="id"
            sort-by="id"
            show-empty
            empty-text="No matching records found"
          >
            <!-- Column: Area Accessibility -->
            <template #cell(area_accessibility)="data">
              <b-badge
                pill
                :variant="`light-${resolveAreaAccessibilityVariant(data.item.area_accessibility)}`"
                class="text-capitalize"
              >
                {{ data.item.area_accessibility }}
              </b-badge>
            </template>
            <!-- Column: Area Accessibility -->
            <template #cell(area_classification)="data">
              <b-badge
                pill
                :variant="`light-${resolveAreaClassificationVariant(data.item.area_classification)}`"
                class="text-capitalize"
              >
                {{ data.item.area_classification }}
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
                <b-dropdown-item
                  @click="isUpdateParkAreaSidebarActive = true,
                          fetchParkArea(data.item.id)"
                >
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item>

                <b-dropdown-item
                  @click="removeParkArea(data.item.id)"
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
        </app-collapse-item>
      </app-collapse>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BTable,
  BDropdown,
  BDropdownItem,
  BBadge,
  BCardHeader,
} from 'bootstrap-vue'
import router from '@/router'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import useAreasView from './useAreasView'
import parkStoreModule from '../../parkStoreModule'
import useParksOptions from '../../useParksOptions'
import ParkViewAddNewArea from './ParkViewAddNewArea.vue'
import ParkViewUpdateArea from './ParkViewUpdateArea.vue'

export default {
  components: {
    ParkViewAddNewArea,
    ParkViewUpdateArea,

    BCard,
    BTable,
    BDropdown,
    BDropdownItem,
    BBadge,
    BCardHeader,
    AppCollapse,
    AppCollapseItem,
  },

  setup() {
    const PARK_APP_STORE_MODULE_NAME = 'app-park'

    // Register module
    if (!store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.registerModule(PARK_APP_STORE_MODULE_NAME, parkStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PARK_APP_STORE_MODULE_NAME)) store.unregisterModule(PARK_APP_STORE_MODULE_NAME)
    })
    const isAddNewParkAreaSidebarActive = ref(false)
    const isUpdateParkAreaSidebarActive = ref(false)

    const toast = useToast()
    const {
      areaAccessibilityOptions,
      areaClassificationOptions,
    } = useParksOptions()

    const {
      parkAreaData,
      fetchParkAreas,
      fetchParkArea,
      tableColumnsAreas,
      refParkAreasListTable,
      refetchAreaData,
      removeParkArea,
      // UI
      resolveAreaAccessibilityVariant,
      resolveAreaClassificationVariant,
    } = useAreasView()

    const onSubmit = () => {
      store
        .dispatch('app-park/updateParkArea', { parkAreaData: parkAreaData.value, id: router.currentRoute.params.id, idloc: parkAreaData.value.id })
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
      isAddNewParkAreaSidebarActive,
      isUpdateParkAreaSidebarActive,

      fetchParkAreas,
      fetchParkArea,
      tableColumnsAreas,
      refParkAreasListTable,
      refetchAreaData,
      removeParkArea,
      parkAreaData,
      avatarText,
      onSubmit,
      // UI
      resolveAreaAccessibilityVariant,
      resolveAreaClassificationVariant,
      //   options
      areaAccessibilityOptions,
      areaClassificationOptions,

    }
  },
}
</script>

      <style lang="scss" scoped>
      .per-page-selector {
        width: 90px;
      }
      </style>
