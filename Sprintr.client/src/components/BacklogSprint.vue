<template>
  <div class="col-12 d-flex flex-column">
    <button class="btn button-color my-2 text-white" @click="addToSprint()">
      {{ backlog.name }}
    </button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { Backlog } from '../models/Backlog'
import { backlogsService } from '../services/BacklogsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
export default {
  props: {
    backlog: {
      type: Backlog,
      required: true
    }
  },
  setup(props) {
    const editable = ref({})
    return {
      editable,
      sprint: computed(() => AppState.currentSprint),
      async addToSprint(backlogId) {
        try {
          editable.value.sprintId = this.sprint.id
          await backlogsService.addToSprint(props.backlog.id, props.backlog.projectId, editable.value)
          Pop.toast('Added to sprint', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  }

}
</script>

<style lang="scss">
.button-color{
  background-color: #CF40AE;
}

</style>
