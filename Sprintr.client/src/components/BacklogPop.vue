<template>
  <div class="container-fluid">
    <div class="row card">
      <div class="col-12 text-center">
        <h3>{{ currentBacklog.name }}</h3>
      </div>
      <div class="col-12 text-center">
        <p>{{ currentBacklog.status }}</p>
      </div>
      <div class="center d-flex">
        <div class="col-6">
          <h5 class="mb-2">
            Tasks
          </h5>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button class="btn btn-primary">
            + Task
          </button>
        </div>
      </div>
      <div class="col-12">
        <div class="div card shadow">
          <Task :task="t" v-for="t in tasks" :key="t.id" />
        </div>
      </div>
      <div class="center d-flex">
        <div class="col-6">
          <h5 class="mb-2">
            Notes
          </h5>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button class="btn btn-primary">
            + Note
          </button>
        </div>
      </div>
      <div class="col-12">
        <div class="div card shadow">
          <Note :note="n" v-for="n in notes" :key="n.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      currentBacklog: computed(() => AppState.currentBacklog),
      tasks: computed(() => AppState.tasks),
      notes: computed(() => AppState.notes)
    }
  }
}
</script>

<style>

</style>
