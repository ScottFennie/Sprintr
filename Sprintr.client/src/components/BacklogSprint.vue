<template>
  <div class="col-12">
    <button @click="addToSprint()">
      {{ backlog.name }}
    </button>
  </div>
</template>

<script>
import { Backlog } from '../models/Backlog'
import { backlogsService } from '../services/BacklogsService'
export default {
  props: {
    backlog: {
      type: Backlog,
      required: true
    }
  },
  setup(props) {
    return {
      async addToSprint(backlogId) {
        await backlogsService.addToSprint(props.backlog.id)
      }

    }
  }

}
</script>

<style>

</style>
