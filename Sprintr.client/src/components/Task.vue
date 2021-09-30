<template>
  <div class="mx-2">
    <div class="items container-fluid">
      <div class="row shadow">
        <div class="py-2 col-md-4">
          <h5>{{ task.name }}</h5>
        </div>
        <div class="py-2 col-md-4">
          <h5>{{ task.weight }}</h5>
        </div>
        <div class="py-2 col-2 d-flex justify-content-between">
          <div>
            <form>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              </div>
            </form>
          </div>
          <div class="icon on-hover d-flex justify-content-end align-content-start p-0" v-if="account.id == task.creatorId">
            <i class="mdi mdi-close text-danger f-20 selectable" title="Remove Task"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Task } from '../models/Task'
export default {
  props: {
    task: {
      type: Task,
      required: true
    }
  },

  setup() {
    return {
      account: computed(() => AppState.account)

    }
  }
}
</script>

<style lang="scss">
.creatorpic {
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
  height: 3rem;
  width: 3rem;
  border: 2px solid #CF40AE;
}
.hov:hover{
background-color: #faa4e6c2;
}
.no-border{
    border: none;
}
.p-border{
border: 1px solid #cf40ae48;
}
.gradient-button-1 {background-image: linear-gradient(to right, #121fcfad 0%,#CF40AE 51%, #121fcfad )}
.gradient-button-1:hover { background-position: right center; }
.button-color{
  background-color: #CF40AE;
}
</style>
