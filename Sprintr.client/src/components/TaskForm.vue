<template>
  <form @submit.prevent="handleSubmit()" class="mb-3">
    <div class="row">
      <div class="col-12">
        <h5 class="mb-2 t-color">
          Tasks
        </h5>
        <input type="text"
               class="form-control bg-white mb-1"
               id="exampleFormControlInput1"
               placeholder="Type task here"
               v-model="editable.name"
               name="name"
        >
      </div>
      <div class="col-12">
        <div class="input-group mb-3">
          <input type="text"
                 class="form-control bg-white"
                 name="weight"
                 placeholder="Add weight"
                 aria-label="Recipient's username"
                 aria-describedby="button-addon2"
                 v-model="editable.weight"
          >
          <div class="col-md-2">
            <button type="submit" class="p-1 px-3 btn gradient-button gradient-button-1" title="Create a Task">
              <i class="mdi mdi-plus f-16" title="Add Task" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { tasksService } from '../services/TasksService'
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      currentBacklog: computed(() => AppState.currentBacklog),
      async handleSubmit() {
        try {
          if (editable.value) {
            editable.value.backlogItemId = this.currentBacklog.id
            await tasksService.createTask(editable.value, route.params.projectId)
            Pop.toast('Task is Created', 'success')
          }
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
