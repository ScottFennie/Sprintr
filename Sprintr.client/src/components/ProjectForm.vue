<template>
  <div class="py-1">
  </div>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="createProject()">
        <div class="form-group">
          <label for="name">Project Name</label>
          <input type="text"
                 class="form-control bg-light"
                 name="name"
                 placeholder=""
                 v-model="editable.name"
                 required
          >
        </div>
        <div class="form-group">
          <label for="title">Project Description</label>
          <input type="text"
                 class="form-control bg-light"
                 name="description"
                 placeholder=""
                 v-model="editable.description"
                 required
          >
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary text-white mt-2" data-bs-dismiss="modal" aria-label="Close">
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { projectService } from '../services/ProjectService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createProject() {
        try {
          await projectService.createProject(editable.value)
          editable.value = ({})
          Pop.toast('very Nice', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style>
</style>
