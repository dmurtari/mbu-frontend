<template>
  <div class="attendance-row">
    <h5 class="title is-5">
      Attendance for {{ scout.fullname }} (Troop {{ scout.troop }})
    </h5>
    <div class="attendance-preferences">
      <b>Merit Badge Preferences</b>:
      <ul class="attendance-preference-list">
        <li v-for="preference in preferences">
          {{ preference.details.rank }}: {{ preference.badge.name }}
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

  .attendance-preference-list {
    margin-top: .5rem;
    padding-left: 1rem;
    columns: 2;
    column-gap: 3rem;
  }
</style>