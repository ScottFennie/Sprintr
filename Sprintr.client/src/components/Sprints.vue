<template>
  <div class="mx-2">
    <div class="row my-3 py-3 rounded p-border shadow-sm">
      <div class="col-12">
        <div class="accordion bg-white" id="accordionFlushExample">
          <div class="no-border accordion-item bg-white">
            <h2 class="accordion-header" id="flush-headingOne">
              <div class="accordion collapsed"
                   type="button"
                   data-bs-toggle="collapse"
                   :data-bs-target="'#backlogAccord' + sprint.id"
                   aria-expanded="false"
                   aria-controls="flush-collapseOne"
              >
                <div class="itemscontainer-fluid">
                  <div class="row">
                    <div class="py-2 col-4">
                      <h5>{{ sprint.name }}</h5>
                    </div>
                    <div class="py-2 col-4">
                      <h5>Weight - 5</h5>
                    </div>
                    <div class="py-2 col-2">
                      <h5>Sprint 2</h5>
                    </div>
                    <div class="py-2 col-2 d-flex justify-content-between">
                      <div class="morinfo">
                        <button class="px-3 py-0 btn button-color text-white" :data-bs-target="'#sprint-modal-' + sprint.id" data-bs-toggle="modal">
                          Info
                        </button>
                      </div>
                      <div class="icon on-hover d-flex justify-content-end align-content-start p-0" v-if="account.id == sprint.creatorId">
                        <i class="mdi mdi-close text-danger f-20 selectable" @click="removeSprint()" title="Remove Sprint"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </h2>
            <div :id="'backlogAccord' + sprint.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :id="'sprint-modal-' + sprint.id">
    <template #modal-title>
      {{ sprint.name }}
    </template>
    <template #modal-body>
      <SprintForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Sprint } from '../models/Sprint'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { sprintsService } from '../services/SprintsService'
export default {
  props: {
    sprint: {
      type: Sprint,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async removeSprint() {
        try {
          const yes = await Pop.confirm('are you sure <b>you</b> want to remove this <em>Sprint</em>?')
          if (!yes) { return }
          await sprintsService.removeSprint(props.sprint.id, route.params.projectId)
          Pop.toast('Sprint has been removed', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
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
