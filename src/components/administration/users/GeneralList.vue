<template>
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Email</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <general-row v-for="user in users"
                  :key="user.id"
                  :user="user"></general-row>
    </tbody>
  </table>
</template>


<script>
import GeneralRow from './GeneralRow.vue';

export default {
  props: {
    users: {
      required: true,
      type: Array
    }
  },
  components: {
    'general-row': GeneralRow
  }
}
</script>