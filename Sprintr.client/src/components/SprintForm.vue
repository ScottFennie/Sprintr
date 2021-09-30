<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-group">
      <label for="name" class="sr-only"></label>
      <input type="text"
             class="form-control bg-secondary"
             name="name..."
             placeholder="name"
             v-model="editable.name"
      >
      <label for="startDate" class="sr-only"></label>
      <input type="date"
             class="form-control bg-secondary"
             name="startDate"
             placeholder="startDate"
             v-model="editable.startDate"
      >
      <label for="endDate" class="sr-only"></label>
      <input type="date"
             class="form-control bg-secondary"
             name="endDate"
             placeholder="endDate"
             v-model="editable.endDate"
      >
    </div>
    <div class="button-group pt-3">
      <button type="submit" class="btn btn-info selectable">
        <i class="mdi mdi-plus f-16" title="Add Sprint" />
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { sprintsService } from '../services/SprintsService'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value) {
            await sprintsService.createSprint(editable.value, route.params.projectId)
            Pop.toast('Sprint is Created', 'success')
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
