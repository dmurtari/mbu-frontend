<template>
  <div class="attendance-row">
    <h5 class="title is-5">
      Attendance for {{ scout.fullname }} (Troop {{ scout.troop }})
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    registration: {
      type: Object,
      required: true
    }
  },
  computed: {
    scout() { return this.registration.scout },
    preferences() { return this.registration.preferences },
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
</style>