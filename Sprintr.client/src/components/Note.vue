<template>
  <div class="container-fluid p-0 m-0">
    <div class="row my-2 card p-0 m-0">
      <div class="col-6 d-flex align-items-center m-0">
        <div class="imagename">
          <img :src="note.creator.picture" class="size rounded-circle py-2" alt="">
        </div>
        <div class="px-3">
          <h5>{{ note.creator.name }}</h5>
        </div>
      </div>
      <div class="col-6 d-flex align-items-center pt-1 m-0">
        <p>{{ note.body }}</p>
      </div>
      <div class="icon on-hover d-flex justify-content-end align-content-start p-0" v-if="account.id == note.creatorId">
        <i class="mdi mdi-close text-danger f-20 selectable" @click="removeNote()" title="Remove Note"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Note } from '../models/Note'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { backlogsService } from '../services/BacklogsService'
export default {
  props: {
    note: {
      type: Note,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async removeNote() {
        try {
          const yes = await Pop.confirm('are you sure <b>you</b> want to remove this <em>Note</em>?')
          if (!yes) { return }
          await backlogsService.removeNote(props.note.id, route.params.projectId)
          Pop.toast('Note has been removed', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }

    }
  }

}
</script>

<style>
.size{
  max-height: 64px;
  max-width: 64px;
}
</style>
