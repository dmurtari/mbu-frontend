<template>
  <tr>
    <td>{{ badge.name }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    badge: {
      type: Object,
      required: true
    }
  }
}
</script>