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
                <div class="items  d-flex justify-content-between">
                  <div class="py-2 ms-3">
                    <h5>{{ backlog.name }}</h5>
                  </div>
                  <div class="py-2 ms-3">
                    <h5>Weight - 5</h5>
                  </div>
                  <div class="py-2 ms-3">
                    <h5>Sprint 2</h5>
                  </div>
                </div>
              </div>
            </h2>
            <div :id="'backlogAccord' + backlog.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    backlog: {
      type: Object,
      required: true
    }
  },
  setup(props) {
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

</style>
