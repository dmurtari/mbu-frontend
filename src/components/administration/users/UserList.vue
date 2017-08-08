<template>
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Email</th>
        <th>Details</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <user-row v-for="user in users"
                :key="user.id"
                :user="user"></user-row>
    </tbody>
  </table>
</template>


<script>
import UserRow from './UserRow.vue';

export default {
  props: {
    users: {
      required: true,
      type: Array
    }
  },
  components: {
    UserRow
  }
}
</script>
