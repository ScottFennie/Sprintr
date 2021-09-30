<template>
  <div class="row card">
    <div class="col-12">
      <div class="imagename">
        <img :src="note.creator.picture" alt="">
      </div>
      <div class="">
        <h5>{{ note.creator.name }}</h5>
      </div>
    </div>
    <div class="col-12">
      <p>{{ note.body }}</p>
    </div>
  </div>
</template>

<script>
import { Note } from '../models/Note'
export default {
  props: {
    note: {
      type: Note,
      required: true
    }
  },
  setup() {
    return {

    }
  }

}
</script>

<style>

</style>
