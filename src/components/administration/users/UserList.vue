<template>
  <paginated-table :target="'users'"
                   :contents="users"
                   :per="20"
                   :showLinks="true">
    <thead slot="header">
      <tr>
        <th width="15%">Name</th>
        <th width="15%">Role</th>
        <th width="30%">Email</th>
        <th width="25%">Details</th>
        <th width="80px"></th>
      </tr>
    </thead>
    <template slot="row"
              scope="props">
      <user-row :user="props.item"></user-row>
    </template>
  </paginated-table>
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
