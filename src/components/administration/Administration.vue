<template>
  <div>
    <h3 class="title is-3">Site Administration</h3>
    <h5 class="subtitle is-5">
            Manage users, edit scouts and events, and view event details.
          </h5>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">Navigation</p>
          <ul class="menu-list">
            <router-link to="/administration/home"
                         active-class="is-active">Home</router-link>
          </ul>
          <p class="menu-label">Manage</p>
          <ul class="menu-list">
            <li>
              <a @click="toggleUserMenu()">
                      Users
                      <span class="toggle-icons is-pulled-right">
                        <span v-if="showUserMenu" class="fa fa-chevron-circle-up"></span>
                        <span v-else class="fa fa-chevron-circle-down"></span>
                      </span>
                    </a>
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
              <a @click="toggleScoutMenu()">
                  Scouts
                  <span class="toggle-icons is-pulled-right">
                    <span v-if="showScoutMenu" class="fa fa-chevron-circle-up"></span>
                    <span v-else class="fa fa-chevron-circle-down"></span>
                  </span>
                </a>
              <ul v-if="showScoutMenu">
                <router-link to="/administration/scouts/list/all"
                             active-class="is-active">All Scouts</router-link>
                <router-link to="/administration/scouts/assignments"
                             active-class="is-active">Assignments</router-link>
              </ul>
            </li>
          </ul>
          <ul class="menu-list">
            <li>
              <a @click="toggleEventMenu()">
                    Events
                    <span class="toggle-icons is-pulled-right">
                      <span v-if="showEventMenu" class="fa fa-chevron-circle-up"></span>
                      <span v-else class="fa fa-chevron-circle-down"></span>
                    </span>
                  </a>
              <ul v-if="showEventMenu">
                <router-link to="/administration/events/all"
                             active-class="is-active">All Events</router-link>
                <router-link to="/administration/events/offerings"
                             active-class="is-active">Offerings</router-link>
                <router-link to="/administration/events/purchasables"
                             active-class="is-active">Purchasables</router-link>
              </ul>
            </li>
          </ul>
          <p class="menu-label">View Details</p>
          <ul class="menu-list">
            <router-link to="/administration/classes"
                         active-class="is-active">Classes</router-link>
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
      showEventMenu: _.startsWith(this.$route.path, '/administration/events'),
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
    toggleEventMenu() {
      this.showEventMenu = !this.showEventMenu
    },
    toggleScoutMenu() {
      this.showScoutMenu = !this.showScoutMenu;
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    }
  },
  watch: {
    $route() {
      let path = this.$route.path;
      if (_.startsWith(path, '/administration/events')) {
        this.showEventMenu = true;
      } else if (_.startsWith(path, '/administration/scouts')) {
        this.showScoutMenu = true;
      } else if (_.startsWith(path, '/administration/users')) {
        this.showUserMenu = true;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  span.tag {
    margin-top: -2px;
  }

  a {
    position: relative;
    display: inline-block;
  }

  .toggle-icons {
    margin-top: 4px;
  }
</style>