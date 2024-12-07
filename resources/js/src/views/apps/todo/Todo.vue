<template>
  <div style="height: inherit">
    <div class="todo-app-list">
      <div class="app-fixed-search d-flex align-items-center">
        <div class="add-task">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            block
            @click="isTaskHandlerSidebarActive = true"
          >
            Add Task
          </b-button>
        </div>
      </div>
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="todo-task-list-wrapper list-group scroll-area"
      >
        <b-card>
          <draggable
            v-model="tasks"
            handle=".draggable-task-handle"
            tag="ul"
            class="todo-task-list media-list"
          >
            <li
              v-for="task in tasks"
              :key="task.id"
              class="todo-item"
              :class="{ 'completed': task.isCompleted }"
              @click="handleTaskClick(task)"
            >
              <feather-icon
                icon="MoreVerticalIcon"
                class="draggable-task-handle d-inline"
              />
              <!-- <div class="todo-title-wrapper">
                <div class="todo-title-area">
                  <div class="title-wrapper">
                    <span class="todo-title">{{ task.title }}</span>
                  </div>
                </div>
              </div> -->
            </li>
          </draggable>
          <div
            class="no-results"
            :class="{'show': !tasks.length}"
          >
            <h5>No Items Found</h5>
          </div>
        </b-card>
      </vue-perfect-scrollbar>
    </div>
    <!-- Task Handler -->
    <todo-task-handler-sidebar
      v-model="isTaskHandlerSidebarActive"
      :task="task"
      :clear-task-data="clearTaskData"
      @remove-task="removeTask"
      @add-task="addTask"
      @update-task="updateTask"
    />
  </div>
</template>

<script>
import store from '@/store'
import {
  ref, onUnmounted,
} from '@vue/composition-api'
import {
  BButton, BCard,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import draggable from 'vuedraggable'
import Ripple from 'vue-ripple-directive'
import todoStoreModule from './todoStoreModule'
import TodoTaskHandlerSidebar from './TodoTaskHandlerSidebar.vue'

export default {
  components: {
    BButton,
    BCard,
    draggable,
    VuePerfectScrollbar,
    TodoTaskHandlerSidebar,
  },
  directives: {
    Ripple,
  },
  setup() {
    const TODO_APP_STORE_MODULE_NAME = 'app-todo'

    // Register module
    if (!store.hasModule(TODO_APP_STORE_MODULE_NAME)) store.registerModule(TODO_APP_STORE_MODULE_NAME, todoStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TODO_APP_STORE_MODULE_NAME)) store.unregisterModule(TODO_APP_STORE_MODULE_NAME)
    })

    const tasks = ref([])

    const blankTask = {
      id: null,
      title: '',
      dueDate: new Date(),
      description: '',
      assignee: null,
      tags: [],
    }
    const task = ref(JSON.parse(JSON.stringify(blankTask)))
    const clearTaskData = () => {
      task.value = JSON.parse(JSON.stringify(blankTask))
    }

    const addTask = val => {
      store.dispatch('app-todo/addTask', val)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchTasks()
        })
    }
    const removeTask = () => {
      store.dispatch('app-todo/removeTask', { id: task.value.id })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchTasks()
        })
    }
    const updateTask = taskData => {
      store.dispatch('app-todo/updateTask', { task: taskData })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          fetchTasks()
        })
    }

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const isTaskHandlerSidebarActive = ref(false)

    const taskTags = [
      { title: 'Team', color: 'primary', route: { name: 'apps-todo-tag', params: { tag: 'team' } } },
      { title: 'Low', color: 'success', route: { name: 'apps-todo-tag', params: { tag: 'low' } } },
      { title: 'Medium', color: 'warning', route: { name: 'apps-todo-tag', params: { tag: 'medium' } } },
      { title: 'High', color: 'danger', route: { name: 'apps-todo-tag', params: { tag: 'high' } } },
      { title: 'Update', color: 'info', route: { name: 'apps-todo-tag', params: { tag: 'update' } } },
    ]

    const resolveTagVariant = tag => {
      if (tag === 'team') return 'primary'
      if (tag === 'low') return 'success'
      if (tag === 'medium') return 'warning'
      if (tag === 'high') return 'danger'
      if (tag === 'update') return 'info'
      return 'primary'
    }

    const resolveAvatarVariant = tags => {
      if (tags.includes('high')) return 'primary'
      if (tags.includes('medium')) return 'warning'
      if (tags.includes('low')) return 'success'
      if (tags.includes('update')) return 'danger'
      if (tags.includes('team')) return 'info'
      return 'primary'
    }
    const fetchTasks = () => {
      store.dispatch('app-todo/fetchTasks', {
      })
        .then(response => {
          tasks.value = response.data
        })
    }

    fetchTasks()

    const handleTaskClick = taskData => {
      task.value = taskData
      isTaskHandlerSidebarActive.value = true
    }

    // Single Task isCompleted update
    const updateTaskIsCompleted = taskData => {
      // eslint-disable-next-line no-param-reassign
      taskData.isCompleted = !taskData.isCompleted
      updateTask(taskData)
    }

    return {
      task,
      tasks,
      removeTask,
      addTask,
      updateTask,
      clearTaskData,
      taskTags,
      fetchTasks,
      perfectScrollbarSettings,

      // UI
      resolveTagVariant,
      resolveAvatarVariant,
      isTaskHandlerSidebarActive,

      handleTaskClick,
      // Single Task isCompleted update
      updateTaskIsCompleted,
    }
  },
}
</script>

<style lang="scss" scoped>
.draggable-task-handle {
position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
    cursor: move;

    .todo-task-list .todo-item:hover & {
      visibility: visible;
    }
}
</style>
