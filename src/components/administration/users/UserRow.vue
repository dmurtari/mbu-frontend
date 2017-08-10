<template>
  <tr>
    <template v-if="!confirmDelete">
      <td>{{ user.fullname }}</td>
      <td>{{ user.role | titleCase }}</td>
      <td>{{ user.email }}</td>
      <td>
        <ul class="details-list">
          <li v-for="(value, key) in user.details"
              :key="value">
            <b>{{ key | titleCase}}:</b> {{ value | titleCase}}
          </li>
        </ul>
      </td>
      <td>
        <button class="button is-danger is-outlined"
                :class="{ 'is-loading': deleting }"
                :disabled="deleting || user.id === profile.id"
                @click="toggleConfirm()">
          <span class="fa fa-trash"
                aria-label="Delete Account"></span>
        </button>
      </td>
    </template>
    <template v-if="confirmDelete">
      <td colspan="5">
        <confirm-delete :match-text="this.user.fullname"
                        :placeholder="'Full Name'"
                        @deleteSuccess="deleteUser()"
                        @close="toggleConfirm()">
          <span slot="header">
            Are you sure you want to delete {{ user.fullname }}'s account? This cannot be undone,
            and will remove all data (such as scouts) associated with
            {{ user.fullname }}'s account.
          </span>
          <span slot="help-text">
            Enter the full name of this user with correct capitalization to confirm that you
            wish to delete this user.
            <strong>This action cannot be undone, and will remove all associated data.</strong>
          </span>
        </confirm-delete>
      </td>
    </template>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      deleting: false,
      confirmDelete: false
    };
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    clearError () {
      this.error = '';
    },
    deleteUser () {
      this.deleting = true;
      this.confirmDelete = false;

      this.$store.dispatch('deleteUser', this.user.id)
        .then(() => {
          this.deleting = false;
          this.error = '';
        })
        .catch(() => {
          this.deleting = false;
          this.error = 'Failed to delete user. Please try again later.';
        });
    },
    toggleConfirm () {
      this.confirmDelete = !this.confirmDelete;
    }
  }
}
</script>

<style lang="scss" scoped>
.details-list {
  list-style: none;
  padding-left: 0;
}
</style>