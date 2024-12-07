<template>

  <div>

    <certificate-list-add-new
      :is-add-new-certificate-sidebar-active.sync="isAddNewCertificateSidebarActive"
      @refetch-data="refetchData"
    />
    <certificate-edit-modal-view
      :certificate-data="certificateData"
    />
    <!-- Filters -->
    <!-- <certificates-list-filters
      :type-filter.sync="typeFilter"
      :activity-filter.sync="activityFilter"
      :status-filter.sync="statusFilter"
      :type-options="typeOptions"
      :activity-options="activityOptions"
      :status-options="statusOptions"
    /> -->

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
                @click="isAddNewCertificateSidebarActive = true"
              >
                <span class="text-nowrap">Add Certificate</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refCertificateListTable"
        class="position-relative"
        :items="fetchCertificates"
        :fields="tableColumns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: Certificate_id -->
        <template #cell(certificate_id)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.certificate_id)"
              />
            </template>
            <b-link
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.certificate_id }}
            </b-link>
          </b-media>
        </template>
        <!-- Column: Customer -->
        <template #cell(customer_name)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.customer_name)"
              />
            </template>
            <b-link
              :to="{ name: 'contacts-customers-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.customer_name }}
            </b-link>
            <small class="text-muted">{{ data.item.customer_id }}</small>
          </b-media>
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
              v-b-modal.modal-certificate-view
              @click="fetchCertificate(data.item.id)"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'reports-certificates-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="removeCertificate(data.item.id)"
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
              :total-rows="totalCertificates"
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
  //   BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import useCertificatesList from './useCertificatesList'
import useCertificatesOptions from '../useCertificatesOptions'
import certificateStoreModule from '../certificateStoreModule'
import CertificateListAddNew from './CertificateListAddNew.vue'
import CertificateEditModalView from './CertificateEditModalView.vue'
// import CertificatesListFilters from './CertificatesListFilters.vue'

export default {
  components: {
    CertificateListAddNew,
    CertificateEditModalView,
    // CertificatesListFilters,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    // BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
  },

  setup() {
    const CERTIFICATE_APP_STORE_MODULE_NAME = 'app-certificate'

    // Register module
    if (!store.hasModule(CERTIFICATE_APP_STORE_MODULE_NAME)) store.registerModule(CERTIFICATE_APP_STORE_MODULE_NAME, certificateStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CERTIFICATE_APP_STORE_MODULE_NAME)) store.unregisterModule(CERTIFICATE_APP_STORE_MODULE_NAME)
    })

    const isAddNewCertificateSidebarActive = ref(false)

    const {
      fetchCertificate,
      fetchCertificates,
      tableColumns,
      certificateData,
      perPage,
      currentPage,
      totalCertificates,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refCertificateListTable,
      refetchData,
      removeCertificate,

      // UI
      resolveCertificateTypeVariant,
      resolveCertificateTypeIcon,
      resolveCertificateStatusVariant,

      // Extra Filters
    //   typeFilter,
    //   activityFilter,
    //   statusFilter,
    } = useCertificatesList()

    const {
      typeOptions,
      activityOptions,
      statusOptions,
      cityOptions,
    } = useCertificatesOptions()

    return {
      // Sidebar
      isAddNewCertificateSidebarActive,
      certificateData,
      fetchCertificate,
      fetchCertificates,
      tableColumns,
      perPage,
      currentPage,
      totalCertificates,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refCertificateListTable,
      refetchData,
      removeCertificate,

      // Filter
      avatarText,

      // UI
      resolveCertificateTypeVariant,
      resolveCertificateTypeIcon,
      resolveCertificateStatusVariant,
      // Extra Options
      typeOptions,
      activityOptions,
      statusOptions,
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

<style lang="scss">
@import '~@resources/scss/vue/libs/vue-select.scss';
</style>
