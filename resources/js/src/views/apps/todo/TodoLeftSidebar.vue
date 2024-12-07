<template>
  <div class="sidebar-left">
    <div class="sidebar">
      <div class="sidebar-content todo-sidebar">
        <div class="todo-app-menu">
          <div class="add-task">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              block
              @click="$emit('update:is-task-handler-sidebar-active', true); $emit('close-left-sidebar')"
            >
              Add Task
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'
// import { isDynamicRouteActive } from '@core/utils/utils'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BButton,
  },
//   props: {
//     taskTags: {
//       type: Array,
//       required: true,
//     },
//   },
//   setup() {
//     return {
//       isDynamicRouteActive,
//     }
//   },
}
</script>

<style>

</style>
