<template>
  <div class=" container backlog">
    <div class="row pt-5">
      <div class="col-md-6">
        <h2>Backlog</h2>
        <p> your lists of backlogs </p>
      </div>
      <div class="col-md-6 d-flex align-items-center justify-content-end">
        <Button class="button height gradient-button gradient-button-1" data-bs-toggle="modal" data-bs-target="#backlog-modal" title="Create a Backlog">
          <i class="mdi mdi-plus f-16"></i>
        </Button>
      </div>
    </div>
    <!-- backlog card goes here -->
    <div class="row mt-3 card shadow-sm">
      <div class="col pt-3 d-flex justify-content-between border-bottom border-2 border-light">
        <div>
          <h5 class="ms-2">
            Name
          </h5>
        </div>
        <div>
          <h5>
            Weight
          </h5>
        </div>
        <div>
          <h5 class="ms-3">
            Sprint
          </h5>
        </div>
      </div>
      <div class="col">
        <Backlog :backlogs="b" v-for="b in backlogs" :key="b.id" />
      </div>
    </div>
  </div>

  <Modal id="backlog-modal">
    <template #modal-title>
      <h3>Backlog</h3>
    </template>
    <template #modal-body>
      <BacklogForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { backlogsService } from '../services/BacklogsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await backlogsService.getBacklog(route.params.projectId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      backlogs: computed(() => AppState.backlogs)
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
.gradient-button-1 {background-image: linear-gradient(to right, #DD5E89 0%, #F7BB97 51%, #DD5E89 100%)}
.gradient-button-1:hover { background-position: right center; }
</style>
