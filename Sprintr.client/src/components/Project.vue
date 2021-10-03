<template>
  <div class="mx-2">
    <div class="row my-3 py-3 rounded shadow-sm hov">
      <div class="col-md-4 d-flex align-items-center" @click="goToProjectPage(project.id)">
        <h6 class="ps-1">
          {{ project.name }}
        </h6>
      </div>
      <div class="col-md-4 d-flex justify-content-center" @click="goToProjectPage(project.id)">
        <img :src="project.creator?.picture" alt="" class="creatorpic">
      </div>
      <div class="col-md-3 d-flex align-items-center justify-content-end" @click="goToProjectPage(project.id)">
        <h6 class="pe-1">
          {{ new Date(project.createdAt).toDateString() }}
        </h6>
      </div>
      <div class="col-md-1 on-hover d-flex justify-content-end align-content-start p-0" v-if="account.id == project.creatorId">
        <i class="mdi mdi-close text-danger f-20 selectable" @click="removeProject()" title="Remove Project"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectService } from '../services/ProjectService'
import { router } from '../router'
import Pop from '../utils/Pop'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removeProject() {
        try {
          const yes = await Pop.confirm('are you sure <b>you</b> want to remove this <em>Project</em>?')
          if (!yes) { return }
          await projectService.removeProject(props.project.id)
          Pop.toast('Project has been removed', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async goToProjectPage(projectId) {
        try {
          await projectService.goToProjectPage(projectId)
          router.push({ name: 'Projects.Backlog', params: { projectId: projectId } })
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

</style>
