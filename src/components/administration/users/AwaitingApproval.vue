<template>
  <div>
    <h4 class="title is-4">
      Accounts Needing Approval
    </h4>
    <p>
      Users will be unable to use the full functionality of this website (such
      as registering their troop, or editing completion records) until their
      account has been approved. Approve user account below, or delete the
      account if you do not recognize the user.
    </p>
    <table class="table" v-if="unapprovedUsers.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Date Created</th>
          <th>Details</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in unapprovedUsers" :key="user.id">
          <td>{{ user.fullname }}</td>
          <td>{{ user.role | capitalize }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.created_at | shortDate }}</td>
          <td>
            <ul class="details-list">
              <li v-for="(value, key) in user.details" :key="value">
                <b>{{ key | titleCase}}:</b> {{ value | titleCase}}
              </li>
            </ul>
          </td>
          <td>
            <button class="button is-primary"
                    data-balloon="Approve User"
                    @click="approveUser(user.id)">
              <span class="fa fa-check" aria-label="Approve"></span>
            </button>
            <button class="button is-danger"
                    data-balloon="Delete User Account"
                    @click="deleteUser(user.id)">
              <span class="fa fa-trash" aria-label="Delete Account"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else
         class="notification">
      There are no users accounts awaiting approval at this time.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'unapprovedUsers'
    ])
  }
}
</script>

<style lang="sass" scoped>
  table {
    margin-top: 1rem;
  }

  .details-list {
    list-style: none;
    padding-left: 0;
  }
</style>