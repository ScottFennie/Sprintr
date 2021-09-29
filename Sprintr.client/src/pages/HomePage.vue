<template>
  <header>
    <Navbar />
  </header>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-6">
        <h2 class="t-color">
          Projects
        </h2>
        <p>Here are where all your Projects will go.</p>
      </div>
      <div class="col-md-6 d-flex align-items-center justify-content-end">
        <button class=" btn button-height gradient-button gradient-button-1" data-bs-target="#project-modal" data-bs-toggle="modal">
          Create Project
        </button>
      </div>
    </div>
    <!-- here is the card below -->
    <div class="mt-3 row card shadow-sm">
      <div class="col-12 pt-3 d-flex justify-content-between border-bottom border-2 border-light">
        <div>
          <h5 class="ms-3">
            Name
          </h5>
        </div>
        <div>
          <h5>Members</h5>
        </div>
        <div>
          <h5 class="me-3">
            Started
          </h5>
        </div>
      </div>
      <div class="col-12">
        <Project :project="p" v-for="p in projects" :key="p.id" />
      </div>
    </div>
    <Modal id="project-modal">
      <template #modal-title>
        Add A Project
      </template>
      <template #modal-body>
        <ProjectForm />
      </template>
      <Modal />
    </modal>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { projectService } from '../services/ProjectService'
import Modal from '../components/Modal.vue'
export default {
  components: { Modal },
  setup() {
    const editable = ref({})
    onMounted(async() => {
      try {
        await projectService.getProjects()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      editable,
      projects: computed(() => AppState.projects),
      async createProject() {
        try {
          await projectService.createProject(editable.value)
          editable.value = ({})
          Pop.toast('very Nice', 'success')
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
