<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">MBU Online</router-link>
      </div>
      <ul class="nav navbar-nav">
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/badges">Badges</router-link></li>
        <li><router-link to="/events">Events</router-link></li>
        <li><router-link v-if="isCoordinator" to="/scouts">Manage Scouts</router-link></li>
        <li v-if="isAdmin"
            class="dropdown">
          <a href="#"
             class="dropdown-toggle"
             id="login-dropdown"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false">Administration <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><router-link to="/users">View/Edit Users</router-link></li>
            <li><router-link to="/offerings">Manage Badge Offerings</router-link></li>
          </ul>
        </li>
      </ul>        
      <ul class="nav navbar-nav navbar-right">
        <li v-if="isAuthenticated"
            class="dropdown">
          <a href="#"
             class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false">
            {{ profile.firstname }} <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><router-link to="/profile">My Profile</router-link></li>
            <li role="separator" class="divider"></li>
            <li><a href="#" @click="logout()">Logout</a></li>
          </ul>
        </li>
        <li v-if="!isAuthenticated"
            class="dropdown">
          <a href="#"
             class="dropdown-toggle"
             id="login-dropdown"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false">Login/Signup <span class="caret"></span></a>
          <ul @click.stop
              class="dropdown-menu">
            <div class="container dropdown-form">
              <li><login @close="closeDropdown()"></login></li>
            </div>
          </ul>
        </li>          
      </ul>
    </div>
  </nav>
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
</style>