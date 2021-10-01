<template>
  <div class="mx-2">
    <div class="items container-fluid">
      <div class="row">
        <div class="py-2 col-4">
          <h6>{{ task.name }}</h6>
        </div>
        <div class="py-2 col-4">
          <h6><i class="t-color mdi mdi-weight f-16"></i> {{ task.weight }}</h6>
        </div>
        <div class="py-2 col-4 d-flex justify-content-between">
          <div>
            <div class="form-check">
              <input class="form-check-input"
                     type="checkbox"
                     value=""
                     id="flexCheckDefault"
                     @click="checkBox()"
                     :checked="task.isComplete"
              >
            </div>
          </div>
          <div class="icon on-hover d-flex justify-content-end align-content-start p-0" v-if="account.id == task.creatorId">
            <i class="mdi mdi-close text-danger f-20 selectable" @click="removeTask()" title="Remove Task"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Task } from '../models/Task'
import Pop from '../utils/Pop'
import { backlogsService } from '../services/BacklogsService'
import { useRoute } from 'vue-router'
export default {
  props: {
    task: {
      type: Task,
      required: true
    }
  },

  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async removeTask() {
        try {
          const yes = await Pop.confirm('are you sure <b>you</b> want to remove this <em>Task</em>?')
          if (!yes) { return }
          await backlogsService.removeTask(props.task.id, route.params.projectId)
          Pop.toast('Task has been removed', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async checkBox() {
        try {
          const task = props.task
          task.isComplete = !task.isComplete
          await backlogsService.checkBox(props.task.id, props.task.projectId, task)
        } catch (error) {
          Pop.toast(error)
        }
      }

    }
  }
}
</script>

<style lang="scss">
.creatorpic {
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
  height: 3rem;
  width: 3rem;
  border: 2px solid #CF40AE;
}
.hov:hover{
background-color: #faa4e6c2;
}
.no-border{
    border: none;
}
.p-border{
border: 1px solid #cf40ae48;
}
.gradient-button-1 {background-image: linear-gradient(to right, #121fcfad 0%,#CF40AE 51%, #121fcfad )}
.gradient-button-1:hover { background-position: right center; }
.button-color{
  background-color: #CF40AE;
}
</style>
