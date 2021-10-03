<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h3>{{ currentBacklog.name }}</h3>
      </div>
      <div class="col-12 text-center">
        <p>{{ currentBacklog.status }}</p>
      </div>
      <div class="col-12" v-if="account.id === currentBacklog.creatorId">
        <form @submit.prevent="handleSubmit()">
          <div class="form-group">
            <label for="status" class="">Status:</label>
            <select
              v-model="editable.status"
              name="status"
              placeholder="Change Status"
              id="status"
              required
              class="form-control bg-white"
            >
              <option disabled selected value="" />
              <option>pending</option>
              <option>in-progress</option>
              <option>review</option>
              <option>done</option>
            </select>
            <label for="name" class="sr-only"></label>
            <input type="text"
                   class="form-control bg-white"
                   name="name..."
                   placeholder="Edit Name"
                   id="name"
                   v-model="editable.name"
            >
            <label for="description" class="sr-only"></label>
            <input type="text"
                   class="form-control bg-white"
                   name="description"
                   placeholder="Edit Description"
                   id="description"
                   v-model="editable.description"
            >
          </div>
          <div class="button-group pt-3">
            <button type="submit" class="p-1 px-3 btn gradient-button gradient-button-1" title="Create a Backlog">
              Edit
            </button>
          </div>
        </form>
      </div>
      <div class="center d-flex">
        <div class="col-6">
        </div>
        <div class="col-6 d-flex justify-content-end">
        </div>
      </div>
      <div class="col-12 text-center">
        <h5><i class="t-color mdi mdi-weight f-20"></i> {{ currentBacklog.totalWeight }}</h5>
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
      <div class="col-12mt-3">
        <div class="div">
          <NoteForm />
          <Note :note="n" v-for="n in notes" :key="n.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { backlogsService } from '../services/BacklogsService'
import Backlog from './Backlog.vue'
import { useRoute } from 'vue-router'
export default {
  components: { Backlog },
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      currentBacklog: computed(() => AppState.currentBacklog),
      notes: computed(() => AppState.currentNotes),
      tasks: computed(() => AppState.currentTasks),
      account: computed(() => AppState.account),
      async getNotesByBacklog() {
        try {
          await backlogsService.getNotesByBacklog(this.currentBacklog.id, this.backlogsService.projectId)
        } catch (error) {
          Pop.toast(error)
        }
      },
      async handleSubmit() {
        try {
          await backlogsService.editBacklog(editable.value, route.params.projectId, this.currentBacklog.id)
          Pop.toast('Backlog item edited', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
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
