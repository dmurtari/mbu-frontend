<template>
  <div>
    <div class="is-pulled-right">
      <button class="button"
              @click="print()">
        <span class="fa fa-print" aria-label="Print"></span>
      </button>
    </div>
    <div id="printable">
      <h5 class="title is-5">
        Overview
      </h5>
      <troop-stats :event="this.event"
                  :registrations="this.registrations"></troop-stats>
      <div class="registration-table">
        <h5 class="title is-5">Attendance Details</h5>
        <registration-table :event="this.event"
                            :registrations="this.registrations"></registration-table>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationTable from './RegistrationTable.vue';
import TroopStats from './TroopStats.vue';

export default {
  props: {
    event: {
      type: Object
    },
    registrations: {
      type: Array,
      required: true
    }
  },
  methods: {
    print () {
      window.print();
      // document.getElementById('printable').print();
    }
  },
  components: {
    RegistrationTable,
    TroopStats
  }
}
</script>

<style lang="scss" scoped>
.registration-table {
  margin-top: 2rem;
}
</style>
