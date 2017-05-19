<template>
  <table class="table is-striped">
    <thead>
      <tr>
        <th>Scout</th>
        <th>Troop</th>
        <th>Period 1</th>
        <th>Period 2</th>
        <th>Period 3</th>
        <th>Purchases</th>
      </tr>
    </thead>

  </table>
</template>

<script>
export default {
  props: {
    registrations: {
      type: Array,
      required: true
    }
  }
}
</script>
