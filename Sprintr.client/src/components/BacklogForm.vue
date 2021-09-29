<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-group">
      <div class="btn-group d-flex justify-content-center" role="group" aria-label="Basic radio toggle button group">
        <input type="radio"
               class="btn-check"
               name="btnradio"
               id="btnradio1"
               autocomplete="off"
               @click="editable.status = 'pending'"
               checked
        >
        <label class="btn btn-outline-primary" for="btnradio1">Pending</label>

        <input type="radio"
               class="btn-check"
               name="btnradio"
               id="btnradio2"
               autocomplete="off"
               @click="editable.status = 'in-progress'"
        >
        <label class="btn btn-outline-primary" for="btnradio2">In-progress</label>

        <input type="radio"
               class="btn-check"
               name="btnradio"
               id="btnradio3"
               autocomplete="off"
               @click="editable.status = 'review'"
        >
        <label class="btn btn-outline-primary" for="btnradio3">Review</label>

        <input type="radio"
               class="btn-check"
               name="btnradio"
               id="btnradio4"
               autocomplete="off"
               @click="editable.status = 'done'"
        >
        <label class="btn btn-outline-primary" for="btnradio4">Done</label>
      </div>
      <label for="name" class="sr-only"></label>
      <input type="text"
             class="form-control bg-secondary"
             name="name..."
             placeholder="name"
             v-model="editable.name"
      >
      <label for="description" class="sr-only"></label>
      <input type="text"
             class="form-control bg-secondary"
             name="description"
             placeholder="description..."
             v-model="editable.description"
      >
    </div>
    <div class="button-group pt-3">
      <button type="submit" class="btn btn-info selectable">
        <i class="mdi mdi-plus f-16" title="Add Backlog" />
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { backlogsService } from '../services/BacklogsService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value) {
            await backlogsService.createBacklog(editable.value, route.params.projectId)
            Pop.toast('Backlog item edited', 'success')
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
