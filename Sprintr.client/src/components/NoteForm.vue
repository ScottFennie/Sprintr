<template>
  <form @submit.prevent="createNote(currentBacklog.id, currentBacklog.projectId)">
    <div class="mb-3">
      <h5 class="mb-2 t-color">
        Notes
      </h5>
      <input v-model="editable.body" type="text" class="form-control bg-white mb-1" id="exampleFormControlInput1" placeholder="Type task here">
    </div>
  </form>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { backlogsService } from '../services/BacklogsService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      currentBacklog: computed(() => AppState.currentBacklog),
      async createNote() {
        try {
          editable.value.backlogItemId = this.currentBacklog.id
          await backlogsService.createNote(this.currentBacklog.id, this.currentBacklog.projectId, editable.value)
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }

}
</script>

<style>

</style>
