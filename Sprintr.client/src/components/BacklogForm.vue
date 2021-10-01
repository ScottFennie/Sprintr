<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-group">
      <div class="btn-group d-flex justify-content-center" role="group" aria-label="Basic radio toggle button group">
        <input type="radio"
               class="btn-check"
               name="btnradio4"
               id="btnradio4"
               value="pending"
               autocomplete="off"
               v-model="editable.status"
               checked
        >
        <label class="btn btn-outline-primary" for="btnradio4">Pending</label>

        <input type="radio"
               class="btn-check"
               name="btnradio3"
               id="btnradio3"
               value="in-progress"
               autocomplete="off"
               v-model="editable.status"
        >
        <label class="btn btn-outline-primary" for="btnradio3">In-progress</label>

        <input type="radio"
               class="btn-check"
               name="btnradio1"
               id="btnradio1"
               value="review"
               autocomplete="off"
               v-model="editable.status"
        >
        <label class="btn btn-outline-primary" for="btnradio1">Review</label>

        <input type="radio"
               class="btn-check"
               name="btnradio2"
               id="btnradio2"
               value="done"
               autocomplete="off"
               v-model="editable.status"
        >
        <label class="btn btn-outline-primary" for="btnradio2">Done</label>
      </div>
      <label for="name" class="sr-only"></label>
      <input type="text"
             class="form-control bg-secondary"
             name="name..."
             placeholder="name"
             v-model="editable.name"
      >
      <label for="description" class="sr-only"></label>
      <input type="text"
             class="form-control bg-secondary"
             name="description"
             placeholder="description..."
             v-model="editable.description"
      >
    </div>
    <div class="button-group pt-3">
      <button type="submit" class="p-1 px-3 btn gradient-button gradient-button-1" title="Create a Backlog">
        <i class="mdi mdi-plus f-16" title="Add Backlog" />
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { backlogsService } from '../services/BacklogsService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value) {
            await backlogsService.createBacklog(editable.value, route.params.projectId)
            Pop.toast('Backlog item edited', 'success')
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
