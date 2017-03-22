<template>
  <tr>
    <td>{{ firstname }}</td>
    <td>{{ lastname }}</td>
    <td>{{ troop }}</td>
    <td>{{ user.fullname }}</td>
    <td>
      <span class="is-pulled-right">
        <router-link to="/administration/scouts/">Details</router-link>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    troop: {
      type: Number,
      required: true
    },
    registrations: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      required: true
    }
  }
}
</script>