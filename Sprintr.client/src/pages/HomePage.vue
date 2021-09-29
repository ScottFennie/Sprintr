<template>
  <header>
    <Navbar />
  </header>
  <div class="container">
    <div class="row pt-5">
      <div class="col-6">
        <h2>Projects</h2>
        <p>Here are where all your Projects will go.</p>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button class="btn btn-light">
          Create Project
        </button>
      </div>
    </div>
    <!-- here is the card below -->
    <div class="mt-3 row card shadow-sm">
      <div class="col-12 pt-3 d-flex justify-content-between border-bottom border-2 border-light">
        <div>
          <h5 class="ms-3">
            Name
          </h5>
        </div>
        <div>
          <h5>Members</h5>
        </div>
        <div>
          <h5 class="me-3">
            Started
          </h5>
        </div>
      </div>
      <div class="col-12">
        <Project :project="p" v-for="p in projects" :key="p.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { projectService } from '../services/ProjectService'
export default {
  setup() {
    onMounted(async() => {
      try {
        await projectService.getProjects()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
