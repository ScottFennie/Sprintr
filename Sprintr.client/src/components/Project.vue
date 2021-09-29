<template>
  <div class="mx-2">
    <router-link :to="{name: 'Project', params: { projectId: project.id }}">
      <div class="row my-3 py-3 rounded shadow-sm">
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
    </router-link>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account)
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
