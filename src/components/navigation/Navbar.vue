<template>
  <div class="container">
    <nav class="nav has-shadow">
      <div class="nav-left">
        <router-link class="nav-item brand" to="/">MBU Online</router-link>
        <router-link class="nav-item" to="/about">About</router-link>
        <router-link class="nav-item" to="/badges">Badges</router-link>
        <router-link class="nav-item" to="/events">Events</router-link>
        <router-link class="nav-item" 
                     v-if="isCoordinator"
                     to="/scouts">Manage Scouts</router-link>
        <router-link class="nav-item" 
                     v-if="isAdmin" 
                     to="/administration">Administration</router-link>
      </div>
      <div class="nav-right" v-if="!isAuthenticated">
        <span class="nav-item">
          <router-link class="button" to="/signup">Sign Up</router-link>
          <router-link class="button is-primary" to="/login">Login</router-link>
        </span>
      </div>
      <div class="nav-right" v-if="isAuthenticated">
        <a href="#" class="nav-item" @click.prevent="logout()">Logout</a>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Login from '../authentication/Login.vue';

export default {
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
      this.closeDropdown();
    },
    closeDropdown() {
      $('#login-dropdown').dropdown('toggle');
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