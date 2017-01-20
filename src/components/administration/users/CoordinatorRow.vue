<template>
  <tr>
    <td>{{ coordinator.fullname }}</td>
    <td>{{ coordinator.email }}</td>
    <td>{{ coordinator.details.troop }}</td>
    <td>{{ coordinator.details.district }}</td>
    <td>{{ coordinator.details.council }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    coordinator: {
      type: Object,
      required: true
    }
  }
}
</script>