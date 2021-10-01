<template>
  <header>
    <Navbar />
  </header>
  <div class=" container-fluid backlog">
    <div class="row">
      <div class="col-md-2 bg-white viewport shadow">
        <div class="space pt-5">
          <h1 class="text-center">
            Project
          </h1>
          <div class=" on-hover d-flex justify-content-center align-content-start p-0" v-if="account.id == project?.creatorId">
            <i class="mdi mdi-close text-danger f-20 selectable" @click="removeProject()" title="Remove Project"></i>
          </div>
          <div class="backlogs">
            <div class="text-center t-color">
              <router-link :to="{name:'Projects.Backlog'}" class="t-color">
                <h5 class="nav-link t-color">
                  BackLogs
                </h5>
              </router-link>
            </div>
            <div class="text-center">
              <router-link :to="{name:'Projects.Sprints'}" class="text-success lighten-30">
                <h5 class="nav-link t-color">
                  Sprints
                </h5>
              </router-link>
            </div>
          </div>
        <!-- navigation icons go here -->
        </div>
      </div>
      <div class="col-md-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { projectService } from '../services/ProjectService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await projectService.getCurrentProjectById(route.params.projectId)
    })
    return {
      account: computed(() => AppState.account),
      project: computed(() => AppState.project),
      async removeProject() {
        try {
          const yes = await Pop.confirm('are you sure <b>you</b> want to remove this <em>Project</em>?')
          if (!yes) { return }
          await projectService.removeProject(route.params.projectId)
          Pop.toast('Project has been removed', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }

    }
  }
}
</script>

<style>
.viewport{
  height: 100vh;
}
.t-color{
  color: #CF40AE;
}
.gradient-button-1 {background-image: linear-gradient(to right, #121fcfad 0%,#CF40AE 51%, #121fcfad )}
.gradient-button-1:hover { background-position: right center; }

</style>
