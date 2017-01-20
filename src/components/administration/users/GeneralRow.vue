<template>
  <tr>
    <td>{{ user.fullname }}</td>
    <td>{{ user.role | titleCase }}</td>
    <td>{{ user.email }}</td>
    <td>
      <ul class="details-list">
        <li v-for="(value, key) in user.details">
          <b>{{ key | titleCase}}:</b> {{ value | titleCase}}
        </li>
      </ul>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass">
.details-list {
  list-style: none;
  padding-left: 0;
}
</style>