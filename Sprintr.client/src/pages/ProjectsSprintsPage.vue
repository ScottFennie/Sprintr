<template>
  <div class="container sprint">
    <div class="row pt-5">
      <div class="col-md-6">
        <h2 class="t-color">
          Sprint
        </h2>
        <p>your lists of Sprints</p>
      </div>
      <div class="col-md-6 d-flex align-items-center justify-content-end">
        <button class="p-1 px-3 btn gradient-button gradient-button-1" data-bs-toggle="modal" data-bs-target="#sprint-modal" title="Create a Sprint">
          <i class="mdi mdi-plus f-16"></i>
        </button>
      </div>
    </div>
    <div class="row mt-3 card shadow-sm">
      <div class="col pt-3 d-flex justify-content-between border-bottom border-2 border-light">
        <div>
          <h5 class="ms-2">
            Name
          </h5>
        </div>
        <div>
          <h5>
            Time Frame
          </h5>
        </div>
        <div>
          <h5 class="ms-3">
            Task
          </h5>
        </div>
      </div>
      <div class="col">
        <Sprint :sprint="s" v-for="s in sprints" :key="s.id" />
      </div>
    </div>
  </div>

  <Modal id="sprint-modal">
    <template #modal-title>
      <h3>Sprint</h3>
    </template>
    <template #modal-body>
      <SprintForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await sprintsService.getSprints(route.params.projectId)
      } catch (error) {
        Pop.error(error.message, 'error')
      }
    })
    return {
      sprints: computed(() => AppState.sprints)
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
