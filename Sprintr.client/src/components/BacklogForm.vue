<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-group">
      <label for="status" class="">Status:</label>
      <select
        v-model="editable.status"
        name="status"
        id="status"
        required
        class="form-control bg-secondary"
      >
        <option disabled selected value="" />
        <option>pending</option>
        <option>in-progress</option>
        <option>review</option>
        <option>done</option>
      </select>
      <label for="name" class="sr-only"></label>
      <input type="text"
             class="form-control bg-secondary"
             name="name..."
             placeholder="name"
             id="name"
             v-model="editable.name"
      >
      <label for="description" class="sr-only"></label>
      <input type="text"
             class="form-control bg-secondary"
             name="description"
             placeholder="description..."
             id="description"
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
import { Backlog } from '../models/Backlog'
import { watchEffect } from '@vue/runtime-core'
export default {
  props: {
    backlog: { type: Backlog }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.backlog }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await backlogsService.editBacklog(editable.value, route.params.projectId)
            Pop.toast('Backlog item edited', 'success')
          } else {
            await backlogsService.createBacklog(editable.value, route.params.projectId)
            editable.value = {}
            Pop.toast('Backlog item Created', 'success')
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
