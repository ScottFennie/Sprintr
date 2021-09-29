<template>
  <div class="mx-2">
    <div class="row my-3 py-3 rounded shadow-sm selectable" @click="goToProjectPage(project.id)">
      <div class="col-4 d-flex align-items-center">
        <h6 class="ps-1">
          {{ project.name }}
        </h6>
      </div>
      <div class="col-4 d-flex justify-content-center">
        <img :src="account.picture" alt="" class="creatorpic">
      </div>
      <div class="col-4 d-flex align-items-center justify-content-end">
        <h6 class="pe-1">
          {{ new Date(project.createdAt).toDateString() }}
        </h6>
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
      async goToProjectPage(projectId) {
        try {
          await projectService.goToProjectPage(projectId)
          router.push({ name: 'Projects', params: { projectId: projectId } })
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
}

</style>
