<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h3>{{ currentBacklog.name }}</h3>
      </div>
      <div class="col-12 text-center">
        <p>{{ currentBacklog.status }}</p>
      </div>
      <div class="center d-flex">
        <div class="col-6">
        </div>
        <div class="col-6 d-flex justify-content-end">
        </div>
      </div>
      <div class="col-12">
        <div class="div">
          <TaskForm />
          <Task :task="t" v-for="t in tasks" :key="t.id" />
        </div>
      </div>
      <div class="center d-flex">
        <div class="col-6">
        </div>
        <div class="col-6 d-flex justify-content-end">
        </div>
      </div>
      <div class="col-12">
        <div class="div">
          <NoteForm />
          <Note :note="n" v-for="n in notes" :key="n.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { backlogsService } from '../services/BacklogsService'
export default {
  setup() {
    return {
      currentBacklog: computed(() => AppState.currentBacklog),
      notes: computed(() => AppState.currentNotes),
      tasks: computed(() => AppState.currentTasks),
      async getNotesByBacklog() {
        try {
          await backlogsService.getNotesByBacklog(this.currentBacklog.id, this.backlogsService.projectId)
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.button-height{
height: 3rem;
background-color: pink;
color: white;
}
.gradient-button {
    margin: 10px;
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 12px;
    padding: 15px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: #FFF;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    cursor: pointer;
    display: inline-block;
    border-radius: 25px;
}
.gradient-button-1 {background-image: linear-gradient(to right, #121fcfad 0%,#CF40AE 51%, #121fcfad )}
.gradient-button-1:hover { background-position: right center; }
</style>
