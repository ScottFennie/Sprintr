<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-group">
      <label for="name" class="sr-only"></label>
      <input type="text"
             class="form-control bg-secondary"
             name="name..."
             placeholder="name"
             v-model="editable.name"
      >
      <label for="startDate" class="sr-only"></label>
      <input type="date"
             class="form-control bg-secondary"
             name="startDate"
             placeholder="startDate"
             v-model="editable.startDate"
      >
      <label for="endDate" class="sr-only"></label>
      <input type="date"
             class="form-control bg-secondary"
             name="endDate"
             placeholder="endDate"
             v-model="editable.endDate"
      >
    </div>
    <div class="button-group pt-3">
      <button type="submit" class="p-1 px-3 btn gradient-button gradient-button-1" title="Create a Sprint" data-bs-dismiss="modal" aria-label="Close">
        <i class="mdi mdi-plus f-16" title="Add Sprint" />
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { sprintsService } from '../services/SprintsService'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value) {
            await sprintsService.createSprint(editable.value, route.params.projectId)
            Pop.toast('Sprint is Created', 'success')
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
