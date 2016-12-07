<template>
<div class="container">
  <h3>Listing Users</h3>
  <div class="well user-list-filters">
    <div class="row">
      <div class="col-sm-6 form-inline">
        <div class="form-group">
          <label for="user-list-role-filter">Filter by Role:</label>
          <select class="form-control" 
                  id="user-list-role-filter"
                  v-model="selectedRole">
            <option v-for="option in roles" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-sm-6 form-inline">
        <div class="form-group">
          <label for="user-list-find">Find by Name:</label>
          <input class="form-control"
                 id="user-list-find"
                 v-model="search"></input>
        </div>
      </div>
    </div>
  </div>
  <general-table v-if="selectedRole === 'all' || selectedRole === 'admin'"
                 :users="usersToDisplay"></general-table>
  <coordinators-table v-if="selectedRole === 'coordinator'"
                      :coordinators="usersToDisplay"></coordinators-table>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import ListGeneral from './ListGeneral.vue';
import ListCoordinator from './ListCoordinator.vue';

export default {
  data() {
    return {
      selectedRole: 'all',
      search: '',
      roles: [
        { text: 'All Users', value: 'all' },
        { text: 'Admins', value: 'admin' },
        { text: 'Coordinators/Scoutmasters', value: 'coordinator' },
        { text: 'Teachers/Volunteers', value: 'teacher' },
        { text: 'Others', value: 'anonymous' }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'users',
    ]),
    usersInRole() {
      if (this.selectedRole === 'all') {
        return this.users;
      } else {
        return _.filter(this.users, (user) => {
          return user.role === this.selectedRole
        });
      }
    },
    usersToDisplay() {
      return _.filter(this.usersInRole, (user) => {
        return user.fullname.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
  },
  mounted() {
    this.$store.dispatch('getUsers');
  },
  components: {
    'general-table': ListGeneral,
    'coordinators-table': ListCoordinator
  }
}
</script>

<style lang="sass">
.user-list-filters {
  margin-top: 2em;
}
</style>