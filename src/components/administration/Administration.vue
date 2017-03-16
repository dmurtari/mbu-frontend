<template>
  <div class="container">
    <h3 class="title is-3">Site Administration</h3>
    <h5 class="subtitle is-5">
      Manage and make changes to all merit badge events, such as badges offered
      at events, as well as users of this website.
    </h5>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">Manage</p>
          <ul class="menu-list">
            <li>
              <a @click="toggleUserMenu()">Users</a>
              <ul v-if="showUserMenu">
                <router-link to="/administration/users/current"
                             active-class="is-active">Current Users</router-link>
                <router-link to="/administration/users/approval"
                             active-class="is-active">
                  Need Approval&nbsp;
                  <span class="tag is-pulled-right is-small"
                        :class="{ 'is-black': unapprovedUsers.length > 0 }">
                    {{ unapprovedUsers.length }}
                  </span>
                </router-link>
              </ul>
            </li>
          </ul>
          <ul class="menu-list">
            <li>
              <a @click="toggleScoutMenu()">Scouts</a>
              <ul v-if="showScoutMenu">
                <router-link to="/administration/scouts/assignments"
                             active-class="is-active">Assignments</router-link>
              </ul>
            </li>
          </ul>
          <p class="menu-label">Event Specific</p>
          <ul class="menu-list">
            <router-link to="/administration/offerings"
                         active-class="is-active">Offerings</router-link>
            <router-link to="/administration/purchasables"
                         active-class="is-active">Purchasables</router-link>
          </ul>
          </ul>
        </aside>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  data() {
    return {
      error: '',
      loading: false,
      showScoutMenu: _.startsWith(this.$route.path, '/administration/scouts'),
      showUserMenu: _.startsWith(this.$route.path, '/administration/users')
    };
  },
  computed: {
    ...mapGetters([
      'users',
      'unapprovedUsers'
    ])
  },
  methods: {
    toggleScoutMenu() {
      this.showScoutMenu = !this.showScoutMenu;
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    }
  }
}
</script>

<style lang="sass" scoped>
  span.tag {
    margin-top: -2px;
  }
</style>