<template>
  <div>
    <h4 class="title is-4">
      Scouts Attending {{ badge }}
      <button class="button is-light titlebar-button is-pulled-right"
              data-balloon="Toggle Details"
              @click="emitCollapse()"
              :disabled="assignees.length < 1">
        <span class="icon is-small">
          <i class="fa fa-minus"></i>
        </span>
      </button>
    </h4>
    <attendees v-for="n in 3"
               :key="n"
               :period="n"
               :scouts="scoutsForPeriod(n)"></attendees>
  </div>
</template>

<script>
import GenericRow from './GenericRow.vue';
import Attendees from './Attendees.vue';

export default {
  extends: GenericRow,
  methods: {
    emitCollapse() {
      this.$emit('collapse')
    }
  },
  components: {
    Attendees
  }
}
</script>