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
                   :data-bs-target="'#backlogAccord' + backlog.id"
                   aria-expanded="false"
                   aria-controls="flush-collapseOne"
              >
                <div class="itemscontainer-fluid">
                  <div class="row">
                    <div class="py-2 col-4">
                      <h5>{{ backlog.name }}</h5>
                    </div>
                    <div class="py-2 col-4">
                      <h5><i class="t-color mdi mdi-weight f-16"></i> {{ backlog.totalWeight }}</h5>
                    </div>
                    <div class="py-2 col-2">
                      <h5>{{ backlog.sprint }}</h5>
                    </div>
                    <div class="py-2 col-2 d-flex justify-content-between">
                      <div class="morinfo">
                        <button class="px-3 py-0 btn button-color text-white" :data-bs-target="'#project-modal-' + backlog.id" data-bs-toggle="modal" @click="getCurrentBacklog()">
                          Info
                        </button>
                      </div>
                      <div class="icon on-hover d-flex justify-content-end align-content-start p-0" v-if="account.id == backlog.creatorId">
                        <i class="mdi mdi-pencil text-info f-20 selectable" data-bs-toggle="modal" :data-bs-target="'#backlog-modal-' + backlog.id" title="Edit Backlog"></i>
                      </div>
                      <div class="icon on-hover d-flex justify-content-end align-content-start p-0" v-if="account.id == backlog.creatorId">
                        <i class="mdi mdi-close text-danger f-20 selectable" @click="removeBacklog()" title="Remove Backlog"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </h2>
            <div :id="'backlogAccord' + backlog.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <p>Tasks go here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :id="'project-modal-' + backlog.id">
    <template #modal-title>
      {{ backlog.name }}
    </template>
    <template #modal-body>
      <BacklogPop />
    </template>
  </Modal>

  <Modal :id="'backlog-modal-' + backlog.id">
    <template #modal-title>
      <h3>Backlog</h3>
    </template>
    <template #modal-body>
      <BacklogForm />
    </template>
  </Modal>
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
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { backlogsService } from '../services/BacklogsService'
import { Backlog } from '../models/Backlog'
import { useRoute } from 'vue-router'
export default {
  props: {
    backlog: {
      type: Backlog,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),

      async getCurrentBacklog() {
        try {
          await backlogsService.getCurrentBacklog(props.backlog.id)
          this.getNotes()
          this.getTasks()
        } catch (error) {
          Pop.toast(error)
        }
      },
      async removeBacklog() {
        try {
          const yes = await Pop.confirm('are you sure <b>you</b> want to remove this <em>Backlog</em>?')
          if (!yes) { return }
          await backlogsService.removeBacklog(props.backlog.id, route.params.projectId)
          Pop.toast('Backlog has been removed', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async getNotes() {
        try {
          await backlogsService.getNotes(props.backlog.id, props.backlog.projectId)
        } catch (error) {
          Pop.toast(error)
        }
      },
      async getTasks() {
        try {
          await backlogsService.getTasks(props.backlog.id, props.backlog.projectId)
        } catch (error) {
          Pop.toast(error)
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
