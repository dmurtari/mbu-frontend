<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <router-link class="nav-item brand" to="/">MBU Online</router-link>
        <router-link class="nav-item is-hidden-mobile is-tab"
                     active-class="is-active" to="/badges">Badges</router-link>
        <router-link class="nav-item is-hidden-mobile is-tab"
                     active-class="is-active" to="/events">Events</router-link>
        <router-link class="nav-item is-hidden-mobile is-tab"
                     v-if="isCoordinator"
                     to="/coordinator">Manage Troop</router-link>
        <router-link class="nav-item is-hidden-mobile is-tab"
                     v-if="isAdmin"
                     to="/administration">Administration</router-link>
      </div>
      <span class="nav-toggle" @click.prevent="toggleDropdown()">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu"
           :class="{ 'is-active': dropdownActive }">
        <router-link class="nav-item is-hidden-tablet"
                     active-class="is-active" to="/badges">Badges</router-link>
        <router-link class="nav-item is-hidden-tablet"
                     active-class="is-active" to="/events">Events</router-link>
        <router-link class="nav-item is-hidden-tablet"
                     v-if="isCoordinator"
                     to="/coordinator">Manage Troop</router-link>
        <router-link class="nav-item is-hidden-tablet"
                     v-if="isAdmin"
                     to="/administration">Administration</router-link>
        <span class="nav-item" v-if="!isAuthenticated">
          <router-link class="button is-primary" to="/login">Login</router-link>
          <router-link class="button is-info is-outlined" to="/signup">Sign Up</router-link>
        </span>
        <router-link class="nav-item" v-if="isAuthenticated" to="/profile">
          Profile
        </router-link>
        <span class="nav-item" v-if="isAuthenticated">
          <a href="#" class="button" @click.prevent="logout()">Logout</a>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

import Login from '../authentication/Login.vue';

export default {
  data() {
    return {
      dropdownActive: false
    };
  },
  computed: {
    ...mapGetters([
      'profile',
      'isAdmin',
      'isAuthenticated',
      'isCoordinator'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    toggleDropdown() {
      this.dropdownActive = !this.dropdownActive;
    }
  },
  components: {
    'login': Login
  }
}
</script>

<style scoped lang="sass">
.container .dropdown-form {
  max-width: 400px;
  padding-bottom: .5em;
  padding-top: .5em;
}

.brand {

}
</style>