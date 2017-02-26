<template>
  <div class="attendance-row">
    <h5 class="title is-5">
      Attendance for {{ scout.fullname }} (Troop {{ scout.troop }})
    </h5>
    <div class="attendance-preferences attendance-section">
      <b>Merit Badge Preferences:</b>
      <ul class="attendance-section attendance-list">
        <li v-for="preference in preferences" v-if="preferences.length > 0">
          {{ preference.details.rank }}: {{ preference.badge.name }}
          <span v-if="preference.price !== '0.00'">
            ({{ preference.price | currency }})
          </span>
        </li>
        <div v-else class="notification">
          This scout does not have any preferences listed for this event.
        </div>
      </ul>
    </div>
    <div class="attendance-purchases attendance-section" v-if="purchases.length > 0">
      <b>Purchases:</b>
      <ul class="attendance-section attendance-list">
        <li v-for="purchase in purchases">
          ({{ purchase.details.quantity }}) {{ purchase.item }}
          <span v-if="purchase.details.size">
            (Size: {{ purchase.details.size | capitalize }})
          </span>
          {{ purchase.price | currency }} &times; {{ purchase.details.quantity }} =
          {{ purchase.price * purchase.details.quantity | currency }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    registration: {
      type: Object,
      required: true
    }
  },
  computed: {
    scout() { return this.registration.scout },
    preferences() {
      return _.orderBy(this.registration.preferences, ['details.rank']);
    },
    assignments() { return this.registration.assignments },
    purchases() { return this.registration.purchases }
  }
}
</script>

<style lang="sass" scoped>
  .attendance-row {
    padding: 2rem 1rem;
    border-bottom: 1px lightgray solid;
  }

  .attendance-section {
    margin-top: .5rem;
  }

  ul.attendance-list {
    padding-left: 1rem;
    columns: 2;
    column-gap: 3rem;
  }
</style>